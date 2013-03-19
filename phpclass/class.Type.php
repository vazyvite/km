<?php
class Type {
	private $_id;
	private $_type;
	private $_list;

	// setters
	function setId($id){ $this->_id = $id; }
	function setType($type){ $this->_type = $type; }
	function setList($list){ $this->_list = $list; }

	// getters
	function getId(){ return $this->_id; }
	function getType(){ return $this->_type; }
	function getList(){ return $this->_list; }

	// constructor
	function Type($id = 0, $type = "", $list = array()){
		$this->setId($id);
		$this->setType($type);
		$this->setList(array(
			array( 'idType' => 1, 'type' => "Article" ),
			array( 'idType' => 2, 'type' => "Cours" )
		));
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
		// $dbq = new DBQuery();
		// $mysqli = new DB();

		// $res = $mysqli->Query($dbq->getTypeById($idType));

		//if(isset($this->getList()){
			$f = $this->getList();
			$f = $f[$idType];
			$type = new Type($f['idType'], $f['type']);
		/*}else{
			$type = null;
		}*/

		// if($res != false){
		// 	$f = $res->fetch_assoc();
		// 	$type = new Type($f['idType'],$f['type']);
		// }else{
		// 	$type = null;
		// }

		return $type;
	}
}
?>