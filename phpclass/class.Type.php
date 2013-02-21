<?php
class Type {
	private $_id;
	private $_type;

	// setters
	function setId($id){ $this->_id = $id; }
	function setType($type){ $this->_type = $type; }

	// getters
	function getId(){ return $this->_id; }
	function getType(){ return $this->_type; }

	// constructor
	function Type($id = 0, $type = ""){
		$this->setId($id);
		$this->setType($type);
	}

	// méthodes

	/**
	 * Méthode GetTypeById
	 * Récupère le type pour un identifiant donné
	 * @package DB, DBQuery
	 * @param idType:Int 			Identifiant du type
	 * @return type:Type 			Type
	 */
	function GetTypeById($idType){
		$dbq = new DBQuery();
		$mysqli = new DB();
		$res = $mysqli->Query(str_replace(array("{{IDTYPE}}"), array($idType), $dbq->getTypeById()));

		if($res != false){
			$f = $res->fetch_assoc();
			$type = new Type($f['idType'],$f['type']);
		}else{
			$type = null;
		}

		return $type;
	}
}
?>