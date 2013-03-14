<?php
	class Favoris {

		private $_idFavoris;
		private $_idUser;
		private $_idArticle;
		private $_isForced;
		private $_nb_views;

		// setters
		function setIdFavoris($id){ $this->_idFavoris = $id; }
		function setIdUser($id){ $this->_idUser = $id; }
		function setIdArticle($id){ $this->_idArticle = $id; }
		function setIsForced($isForced){ $this->_isForced = $isForced; }
		function setNbViews($nb_views){ $this->_nb_views = $nb_views; }

		// getters
		function getIdFavoris(){ return $this->_idFavoris; }
		function getIdUser(){ return $this->_idUser; }
		function getIdArticle(){ return $this->_idArticle; }
		function getIsForced(){ return $this->_isForced; }
		function getNbViews(){ return $this->_nb_views; }

		// constructor
		function Favoris($idFavoris = 0, $idUser = 0, $idArticle = 0, $isForced = false, $nb_views = 0){
			$this->setIdFavoris($idFavoris);
			$this->setIdUser($idUser);
			$this->setIdArticle($idArticle);
			$this->setIsForced($isForced);
			$this->setNbViews($nb_views);
		}

		// méthodes
		/**
		 * Méthode FormatFavorisData
		 * Formate un favoris à partir des résultats d'une requête
		 * @param results:Int 			résultats de la requête
		 * @return Favoris 				Favoris formaté
		 */
		function FormatFavorisData($results){
			return new Favoris($results['idFavoris'],$results['idUser'], $results['idArticle'], $results['isForced'], $results['nbViews']);
		}

		/**
		 * Méthode GetAllFavorisForUser
		 * Récupère tous les favoris pour un utilisateur
		 * @param idUser:Int 			Identifiant de l'utilisateur
		 * @return list:Array[Favoris] 	Ensemble des Favoris sous forme de tableau contenant l'élément recherché
		 */
		function GetAllFavorisForUser($idUser){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Query($dbq->getFavorisForUser($idUser));
			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = $this->FormatFavorisData($f);

					$article = new Article();

					array_push($list, $article->GetArticleById($a->getIdArticle()));
				}
				return $list;
			}
		}

		/**
		 * Méthode GetAllFavorisForArticle
		 * Récupère tous les favoris pour un article
		 * @param idArticle:Int 		Identifiant de l'article
		 * @return list:Array[Favoris] 	Ensemble des Favoris sous forme de tableau contenant l'élément recherché
		 */
		function GetAllFavorisForArticle($idArticle){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Query($dbq->getFavorisForArticle($idArticle));
			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = $this->FormatFavorisData($f);
					array_push($list, $a);
				}
				return count($list);
			}
		}


		/**
		 * Méthode GetFavorisById
		 * Récupère un favoris par son identifiant
		 * @package DB, DBQuery, Article
		 * @param idFavoris:Int 		Identifiant du favoris
		 * @return article:Article 		Articles
		 */
		function GetFavorisById($idFavoris){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getFavorisById($idFavoris));
			$list = array();

			if($res != false){
				$f = $res->fetch_assoc();
				$favoris = $this->FormatFavorisData($f);
			}else{
				$favoris = null;
			}

			return $favoris;
		}

		/**
		 * Méthode GetFavorisById
		 * Récupère un favoris par son identifiant
		 * @package DB, DBQuery, Article
		 * @param idFavoris:Int 		Identifiant du favoris
		 * @return article:Article 		Articles
		 */
		function FavorisIsExists($idUser, $idArticle){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getFavoris($idUser, $idArticle));

			return ($res->num_rows > 0) ? true : false;
		}

		/**
		 * Méthode IncrementNbView
		 * Incrémente le nombre de vues sur un article par un utilisateur
		 * @package DB, DBQuery, Article
		 * @param idUser:Int 			Identifiant de l'utilisateur
		 * @param idArticle:Int 		Identifiant de l'article
		 * @return article:Article 		Articles
		 */
		function IncrementNbView($idUser, $idArticle){
			$dbq = new DBQuery();
			$mysqli = new DB();

			if(!$this->FavorisIsExists($idUser, $idArticle)){
				$this->CreateFavoris($idUser, $idArticle, false);
			}

			$res = $mysqli->Update($dbq->incrementFavorisView($idUser, $idArticle));
		}

		/**
		 * Méthode CreateFavoris
		 * Créé un favoris pour un utilisateur et un article
		 * @param idUser:Int 			Identifiant de l'utilisateur
		 * @param idArticle:Int 		Identifiant de l'article
		 * @param forced:Boolean 		Indique si le favoris est forcé ou non
		 * @return article:Article 		Articles
		 */
		function CreateFavoris($idUser, $idArticle, $forced = false){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Create($dbq->createFavoris($idUser, $idArticle, $forced));
		}

		/**
		 * Méthode DeleteFavoris
		 * Supprime un favoris pour un utilisateur et un article
		 * @param idUser:Int 			Identifiant de l'utilisateur
		 * @param idArticle:Int 		Identifiant de l'article
		 * @return article:Article 		Articles
		 */
		function DeleteFavoris($idUser, $idArticle){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Delete($dbq->deleteFavoris($idUser, $idArticle));

			/*if($res != false){
				while($f = $res->fetch_assoc()){
					$a = $this->FormatFavorisData($f);
					array_push($list, $a);
				}
				return $list;
			}*/
		}

		/**
		 * Méthode ForceFavoris
		 * Force un fovoris
		 * @param idArticle:Int 			Identifiant de l'article
		 * @param idUser:Int 				Identifiant de l'utilisateur
		 */
		function ForceFavoris($idUser, $idArticle, $forced){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Update($dbq->forceFavoris($idUser, $idArticle, $forced));
		}

		/**
		 * Méthode GetMostViewed
		 * Retourne les articles les plus vus par un utilisateur
		 * @param idUser:Int 				Identifiant de l'utilisateur
		 */
		function GetMostViewed($idUser){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Update($dbq->getMostViewed($idUser));
			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = $this->FormatFavorisData($f);
					array_push($list, $a);
				}
				return $list;
			}
		}
	}
?>