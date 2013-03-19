<?php
	class Commentaire {
		private $_idCommentaire;
		private $_idArticle;
		private $_idUser;
		private $_idType;
		private $_date_creation;
		private $_titre;
		private $_commentaire;


// setters
		function setIdCommentaire($idCommentaire){ $this->_idCommentaire = $idCommentaire; }
		function setidArticle($idArticle){ $this->_idArticle = $idArticle; }
		function setidUser($idUser){ $this->_idUser = $idUser; }
		function setidType($idType){ $this->_idType = $idType; }
		function setDateCreation($date_creation){ $this->_date_creation = $date_creation; }
		function setTitre($titre){ $this->_titre = $titre; }
		function setCommentaire($commentaire){ $this->_commentaire = $commentaire; }

// getters
		function getIdCommentaire(){ return $this->_idCommentaire; }
		function getidArticle(){ return $this->_idArticle; }
		function getidUser(){ return $this->_idUser; }
		function getidType(){ return $this->_idType; }
		function getDateCreation(){ return $this->_date_creation; }
		function getTitre(){ return $this->_titre; }
		function getCommentaire(){ return $this->_commentaire; }

// constructor
		function Commentaire($idCommentaire = 0, $idArticle = 0, $idUser = 0, $idType = 0, $date_creation = "", $titre = "", $commentaire = ""){
			$this->setIdCommentaire($idCommentaire);
			$this->setidArticle($idArticle);
			$this->setidUser($idUser);
			$this->setidType($idType);
			$this->setDateCreation(date('d/m/Y', strtotime($date_creation)));
			$this->setTitre($titre);
			$this->setCommentaire($commentaire);
		}

// méthodes
		/**
		 * Méthode FormatCommentaireData
		 * Formate un commentaire à partir des résultats d'une requête
		 * @param results:Object		résultats de la requête
		 * @return Commentaire			Favoris formaté
		 */
		function FormatCommentaireData($results){
			return new Commentaire($results['idCommentaire'],$results['idArticle'], $results['idUser'], $results['idType'], $results['date_creation'], $results['titre'], $results['commentaire']);
		}
		

		/**
		 * Méthode GetCommentaireForArticle
		 * récupération des commentaires associés à un article
		 * @param idArticle:Int 		identifiant de l'article
		 * @return 
		 */
		function GetCommentaireForArticle($idArticle){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Query($dbq->getCommentsForArticle($idArticle));
			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$a = $this->FormatCommentaireData($f);
					array_push($list, $a);
				}
				return $list;
			}
		}


		/**
		 * Méthode FormatListOfCommentsForJS
		 * Formate en JSON les commentaires pour l'interprétation JS des résultats
		 * @param list:Array 		liste de commentaires
		 * @return 
		 */
		function FormatListOfCommentsForJS($list){
			$json = array();
			$user = new User();

			if(count($list) > 0){

				foreach ($list as $commentaire) {
					
					$u = $user->GetUserById($commentaire->getIdUser());

					$comment = array(	
						'idCommentaire' => $commentaire->getIdCommentaire(), 
						'idArticle' 	=> $commentaire->getIdArticle(),
						'idUser' 		=> $commentaire->getIdUser(),
						'idType' 		=> $commentaire->getIdType(),
						'UserFstName'	=> html_entity_decode($u->getFirstName(), ENT_QUOTES),
						'UserLstName'	=> html_entity_decode($u->getLastName(), ENT_QUOTES),
						'dateCreation'	=> $commentaire->getDateCreation(),
						'titre'			=> html_entity_decode($commentaire->getTitre(), ENT_QUOTES),
						'commentaire'	=> html_entity_decode($commentaire->getCommentaire(), ENT_QUOTES)
					);

					array_push($json, $comment);
				}

				echo json_encode($json);
			}else{
				echo "";
			}
		}


		/**
		 * Méthode CreateCommentaire
		 * Création du commentaire en base
		 * @param idArticle:Int 		identifiant de l'article
		 * @param idUser:Int 			identifiant de l'utilisateur
		 * @param idType:Int 			identifiant du type
		 * @param titre:String 			titre du commentaire
		 * @param commentaire:String 	contenu du commentaire
		 * @return 
		 */
		function CreateCommentaire($idArticle, $idUser, $idType, $titre, $commentaire){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Create($dbq->createComment($idArticle, $idUser, $idType, htmlentities($titre, ENT_QUOTES), htmlentities($commentaire, ENT_QUOTES)));
		}


		/**
		 * Méthode DeleteCommentaire
		 * Suppression du commentaire en base
		 * @param idCommentaire:Int 	identifiant du commentaire
		 * @return 
		 */
		function DeleteCommentaire($idCommentaire){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Delete($dbq->deleteComment($idCommentaire));
		}


		/**
		 * Méthode UpdateCommentaire
		 * Modification du commentaire en base
		 * @param idCommentaire:Int 	identifiant du commentaire
		 * @param idType:Int 			identifiant du type
		 * @param titre:String 			titre du commentaire
		 * @param commentaire:String 	contenu du commentaire
		 * @return 
		 */
		function UpdateCommentaire($idCommentaire, $idType, $titre, $commentaire){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->Update($dbq->updateComment($idCommentaire, $idType, htmlentities($titre, ENT_QUOTES), htmlentities($commentaire, ENT_QUOTES)));
		}
	}
?>