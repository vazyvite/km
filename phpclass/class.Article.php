<?php
	class Article {
		private $_idArticle;
		private $_idType;
		private $_idUser;
		private $_idCategorie;
		private $_dt_creation;
		private $_titre;
		private $_article;
		private $_mot_cles;

		// setters
		function setIdArticle($id){ $this->_idArticle = $id; }
		function setIdType($id){ $this->_idType = $id; }
		function setIdUser($id){ $this->_idUser = $id; }
		function setIdCategorie($id){ $this->_idCategorie = $id; }
		function setDtCreation($date){ $this->_dt_creation = $date; }
		function setTitre($titre){ $this->_titre = $titre; }
		function setArticle($article){ $this->_article = $article; }
		function setMotCles($motcles){ $this->_mot_cles = $motcles; }

		// getters
		function getIdArticle(){ return $this->_idArticle; }
		function getIdType(){ return $this->_idType; }
		function getIdUser(){ return $this->_idUser; }
		function getIdCategorie(){ return $this->_idCategorie; }
		function getDtCreation(){ return $this->_dt_creation; }
		function getTitre(){ return $this->_titre; }
		function getArticle(){ return $this->_article; }
		function getMotCles(){ return $this->_mot_cles; }

		// constructor
		function Article($idArticle = 0, $idType = 0, $idUser = 0, $idCategorie = 0, $date_creation = "", $titre = "", $article = "", $motcles = null){
			$this->setIdArticle($idArticle);
			$this->setIdType($idType);
			$this->setIdUser($idUser);
			$this->setIdCategorie($idCategorie);
			$this->setDtCreation($date_creation);
			$this->setTitre($titre);
			$this->setArticle($article);
			$this->setMotCles($motcles);
		}

		// méthodes
		/**
		 * Méthode GetAllArticlesForTerms
		 * Récupère tous les articles contenant le pattern "terms"
		 * @param idPortail:Int 		Identifiant du portail courant
		 * @param terms:String 			Chaine de caractères correspondant à l'élément recherché
		 * @return list:Array[Article] 	Ensemble des Articles sous forme de tableau contenant l'élément recherché
		 */
		function GetAllArticlesForTerms($idPortail, $terms){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getListArticleByTerms($idPortail, $terms));
			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = $this->FormatArticleData($f);
					array_push($list, $a);
				}
				return $list;
			}
		}

		/**
		 * Méthode GetArticleById
		 * Récupère l'article pour un identifiant donné
		 * @package DB, DBQuery, Article
		 * @param idArticle:Int 		Identifiant de l'article
		 * @return article:Article 		Articles
		 */
		function GetArticleById($idArticle){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getArticleById($idArticle));

			if($res != false){
				$f = $res->fetch_assoc();
				$article = $this->FormatArticleData($f);
			}else{
				$article = null;
			}

			return $article;
		}

		/**
		 * Méthode BuildArticlesForJS
		 * Retourne les données correspondant à un Article sous forme de JSON
		 * @param idArticle:Int 		Identifiant de l'article
		 * @return article:Article 		Articles
		 */
		function BuildArticlesForJS($article){
			if($article != null){
				$user = new User();
				$u = $user->GetUserById($article->getIdUser());
				$userName = $u->getFirstName() . " " . $u->getLastName();
				$type = new Type();
				$t = $type->GetTypeById($article->getIdType());
				$typeLibelle = $t->getType();
				$arr_mc = array();

				if($article->getMotCles() != null){
					foreach ($article->getMotCles() as $motcle) {
						$m = array('idMotCle' => $motcle->getId(), 'idArticle' => $motcle->getIdArticle(), 'motcle' => $motcle->getMotCle());
						array_push($arr_mc, $m);
					}
				}
				$json = array('idArticle' => $article->getIdArticle(), 'idCategorie' => $article->getIdCategorie() , 'idType' => $article->getIdType(), 'motcles' => $arr_mc, 'type' => html_entity_decode($typeLibelle, ENT_QUOTES), 'idUser' => $article->getIdUser(), 'user' => html_entity_decode($userName, ENT_QUOTES), 'dateCreation' => $article->getDtCreation(), 'titre' => html_entity_decode($article->getTitre(), ENT_QUOTES), 'article' => html_entity_decode($article->getArticle(), ENT_QUOTES));
			}else{
				$json = "";
			}

			echo json_encode($json);
		}

		/**
		 * Méthode FormatArticleData
		 * Formate les données d'un article
		 * @param f:Article 	données de l'article
		 */
		function FormatArticleData($f){
			$m = new ListMotCles();
			return new Article($f['idArticle'],$f['idType'], $f['idUser'], $f['idCategorie'], $f['dt_creation'], $f['titre'], $f['article'], $m->GetMotClesForArticle($f['idArticle']));
		}

		/**
		 * Méthode UpdateArticle
		 * Sauve les modifications effectuées sur un article en base
		 * @param id:Int 					Identifiant de l'article
		 * @param titre:String 				Titre de l'article
		 * @param content:String 			Contenu de l'article
		 * @param motcles:Array[String]		Mots clés liés à l'article
		 * @param idmotcles:Array[String]	Identifiants des mots clés liés à l'article
		 */
		function UpdateArticle($id, $titre, $content, $motcles, $idmotcles){
			$lvl = "10";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			$arr_motcles = explode(";", $motcles);
			$arr_idMotcles = explode(";", $idmotcles);

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
				$res = $mysqli->Update($dbq->updateArticle($id, htmlentities($titre, ENT_QUOTES), htmlentities($content, ENT_QUOTES)));

				$motcle = new MotCle();
				$motcle->DeleteAllMotClesForArticleId($id);

				if(count($arr_motcles) > 0){
					for($i = 0; $i < count($arr_motcles); $i++){
						$motcle->CreateMotCle($id, $arr_motcles[$i]);
					}
				}
			}else{

			}
		}

		/**
		 * Méthode DeleteArticle
		 * supprime un article en base
		 * @param idArticle:Int 			Identifiant de l'article
		 */
		function DeleteArticle($idArticle){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
				$res = $mysqli->Delete($dbq->deleteArticle($idArticle));

				$motcle = new MotCle();
				$motcle->DeleteAllMotClesForArticleId($idArticle);

			}else{
				
			}
		}

		/**
		 * Méthode CreateArticle
		 * Création d'un article en base
		 * @param titre:String 			Titre de l'article
		 * @param idType:Int 			Identifiant du type d'article
		 * @param idUser:Int 			Identifiant de l'autreur de l'article
		 * @param idCategorie:Int 		Identifiant de la catégorie de l'article
		 * @param article:String		Contenu de l'article
		 * @param motcles:String		Mots clés associés à l'article
		 */
		function CreateArticle($titre, $idtype, $iduser, $idcategorie, $article, $motcles){
			$lvl = "10";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			$arr_motcles = explode(";", $motcles);

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){

				$res = $mysqli->Create($dbq->createArticle($idtype, $iduser, $idcategorie, htmlentities($titre, ENT_QUOTES), htmlentities($article, ENT_QUOTES) ) );

				$idArticle = $res;

				if($idArticle > 0 && count($arr_motcles) > 0){
					$mc = new MotCle();

					for($i = 0; $i < count($arr_motcles); $i++){
						$mc->CreateMotCle($idArticle, $arr_motcles[$i]);
					}
				}else{
					// echo "erreur dans la création";
				}

				echo $idArticle;

			}else{
				//echo "pas les droits";
			}
		}

		function GetAssociatedArticles($idCategorie, $motcles){
			$lvl = "01";
			$user = new User();
			$motcle = new MotCle();
			$json = array();

			$arr_motcles = explode(";", $motcles);

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){

				for($i = 0; $i < count($arr_motcles); $i++){
					array_push($json, $this->GetMatchingArticles($idCategorie, $arr_motcles[$i]));
				}

				echo json_encode(array_unique($json));
			}else{

			}
		}

		function GetMatchingArticles($idCategorie, $motcle){
			$list = array();
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getMatchingArticles($idCategorie, $motcle));

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = array('id' => $f['idArticle'], 'titre' => $f['titre']);
					array_push($list, $a);
				}
			}
			return $list;
		}
	}
?>