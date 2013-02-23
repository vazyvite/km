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
				$json = array('idArticle' => $article->getIdArticle(), 'idType' => $article->getIdType(), 'motcles' => $arr_mc, 'type' => $typeLibelle, 'idUser' => $article->getIdUser(), 'user' => $userName, 'dateCreation' => $article->getDtCreation(), 'titre' => $article->getTitre(), 'article' => $article->getArticle());
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
		 * @param id:Int 				Identifiant de l'article
		 * @param titre:String 			Titre de l'article
		 * @param content:String 		Contenu de l'article
		 * @param motcles:String 		Mots clés liés à l'article
		 */
		/*function UpdateArticle($id, $titre; $content, $motcles){
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
		}*/
	}
?>