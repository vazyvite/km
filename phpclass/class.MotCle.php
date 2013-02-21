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
	function MotCle($id, $idArticle, $motcle){
		$this->setId($id);
		$this->setIdArticle($idArticle);
		$this->setMotCle($motcle);
	}

	// méthodes
	
}
?>