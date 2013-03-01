<?php
	class Categorie {
		private $_idCategorie;
		private $_idPortail;
		private $_categorie;
		private $_description;

		// setters
		function setIdCategorie($id){ $this->_idCategorie = $id; }
		function setIdPortail($id){ $this->_idPortail = $id; }
		function setCategorie($categorie){ $this->_categorie = $categorie; }
		function setDescription($description){ $this->_description = $description; }

		// getters
		function getIdCategorie(){ return $this->_idCategorie; }
		function getIdPortail(){ return $this->_idPortail; }
		function getCategorie(){ return $this->_categorie; }
		function getDescription(){ return $this->_description; }

		// constructor
		function Categorie($idCategorie = 0, $idPortail = 0, $categorie = "", $description = ""){
			$this->setIdCategorie($idCategorie);
			$this->setIdPortail($idPortail);
			$this->setCategorie($categorie);
			$this->setDescription($description);
		}

		// méthodes

		/**
		 * Méthode GetAllCategoriesForPortail
		 * Retourne toutes les catégories disponibles pour un portail
		 * @package DB, DBQuery
		 * @param $idPortail:Int 				identifiant du portail pour lequel on désir la liste des catégories
		 * @return $list:Array[Categorie]		La liste des catégories disponibles pour le portail
		 */
		function GetAllCategoriesForPortail($idPortail){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getListCategorie($idPortail));

			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$p = new Categorie($f['idCategorie'], $f['idPortail'], $f['categorie'], $f['description']);
					array_push($list, $p);
				}
				return $list;
			}
		}

		/**
		 * Méthode GetAllCategoriesForJS
		 * Renvoie la liste des catégories au format JSON
		 * @param $list_categories:Array[Categorie]		liste des catégories
		 * @return $:JSON 								liste des catégories au format JSON
		 */
		function GetAllCategoriesForJS($list_categories){
			$json = array();
			$categorie = array();

			if(count($list_categories) > 0){
				for($i = 0; $i < count($list_categories); $i++){
					$categorie = array('idCategorie' => $list_categories[$i]->getIdCategorie(), 'idPortail' => $list_categories[$i]->getIdPortail(), 'categorie' => $list_categories[$i]->getCategorie(), 'description' => $list_categories[$i]->getDescription());
					array_push($json, $categorie);
				}
			}
			echo json_encode($json);
		}

		function GetCategorieById($id_categorie){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Query($dbq->getCategorieById($id_categorie));

			if($res != false){
				while($f = $res->fetch_assoc()){
					$p = new Categorie($f['idCategorie'], $f['idPortail'], $f['categorie'], $f['description']);
				}
				return $p;
			}else{
				return null;
			}
		}

		/**
		 * Méthode GetAllArticlesForCategorie
		 * Renvoie la liste des articles pour une catégorie
		 * @package DB, DBQuery, Article
		 * @param $idCategorie:Int		id de la catégorie
		 * @return $list 				liste des articles de la catégorie
		 */
		function GetAllArticlesForCategorie($idCategorie){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getListArticle($idCategorie));

			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = new Article($f['idArticle'], $f['idType'], $f['idUser'], $f['idCategorie'], $f['dt_creation'], $f['titre'], $f['article']);
					array_push($list, $a);
				}
				return $list;
			}
		}

		/**
		 * Méthode UpdateCategorie
		 * Met à jour la catégorie
		 * @package DB, DBQuery
		 * @param $idPortail:Int		identifiant de la catégorie
		 * @param $portail:String 		Nom du portail
		 */
		function UpdateCategorie($idCategorie, $idPortail, $categorie, $description){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
				$res = $mysqli->Update( $dbq->updateCategorie($idCategorie, $idPortail, htmlentities($categorie, ENT_QUOTES), htmlentities($description, ENT_QUOTES)));
			}else{
				echo "droits insuffisants";
			}
		}

		/**
		 * Méthode DeleteCategorie
		 * Supprime la catégorie
		 * @package DB, DBQuery
		 * @param $idPortail:Int		identifiant de la catégorie
		 */
		function DeleteCategorie($idCategorie){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
				$res = $mysqli->Delete( $dbq->deleteCategorie($idCategorie) );
			}
		}

		/**
		 * Méthode CreateCategorie
		 * Créé la catégorie
		 * @package DB, DBQuery
		 * @param $categorie:String		nom de la catégorie
		 * @param $idPortail:Int		Identifiant du portail auquel appartient la catégorie
		 * @param $description:String	description de la catégorie
		 */
		function CreateCategorie($categorie, $idPortail, $description){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
				$res = $mysqli->Delete( $dbq->createCategorie($idPortail, $categorie, $description) );
			}else{
				echo "droits insuffisants";
			}
		}
	}
?>