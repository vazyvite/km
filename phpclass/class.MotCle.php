<?php
class MotCle {
	private $_id;
	private $_idArticle;
	private $_mot_cle;

	// setters
	function setId($id){ $this->_id = $id; }
	function setIdArticle($id){ $this->_idArticle = $id; }
	function setMotCle($motcle){ $this->_mot_cle = $motcle; }

	// getters
	function getId(){ return $this->_id; }
	function getIdArticle(){ return $this->_idArticle; }
	function getMotCle(){ return $this->_mot_cle; }

	// Constructor
	function MotCle($id = 0, $idArticle = 0, $motcle = null){
		$this->setId($id);
		$this->setIdArticle($idArticle);
		$this->setMotCle($motcle);
	}

	// méthodes
	function UpdateMotCle($idMotCle, $motcle){
		$lvl = "10";
		$dbq = new DBQuery();
		$mysqli = new DB();
		$user = new User();

		if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
			$res = $mysqli->Update($dbq->updateMotCles($idMotCle, htmlentities($motcle, ENT_QUOTES)));
		}
	}

	function CreateMotCle($idArticle, $motcle){
		$lvl = "10";
		$dbq = new DBQuery();
		$mysqli = new DB();
		$user = new User();

		if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
			$res = $mysqli->Create($dbq->createMotCles($idArticle, htmlentities($motcle, ENT_QUOTES)));
		}
	}

	function DeleteAllMotClesForArticleId($id_article){
		$lvl = "10";
		$dbq = new DBQuery();
		$mysqli = new DB();
		$user = new User();

		if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
			$res = $mysqli->Delete($dbq->deleteAllMotClesForArticle($id_article));
		}
	}
}
?>