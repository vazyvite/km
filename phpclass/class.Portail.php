<?php
	class Portail {
		private $_id;
		private $_portail;

		// getters 
		function getId(){ return $this->_id; }
		function getPortail(){ return $this->_portail; }

		// setters
		function setId($id){ $this->_id = $id; }
		function setPortail($portail){ $this->_portail = $portail; }

		// constructor
		function Portail($id = 0, $portail = ""){
			$this->setId($id);
			$this->setPortail($portail);
		}

		// méthodes

		/**
		 * Méthode GetAllPortails
		 * Récupère la liste de tous les portails
		 * @package DB, DBQuery
		 * @return $list:Array[Portail] 		liste des portails
		 */
		function GetAllPortails(){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query($dbq->getPortailList());
			$list = array();

			if($res != false){
				while($f = $res->fetch_assoc()){
					$p = new Portail($f['idPortail'], $f['portail']);
					array_push($list, $p);
				}
				return $list;
			}
		}

		/**
		 * Méthode GetAllPortailsForJS
		 * Renvoie la liste des portails au format JSON
		 * @param $list_portail:Array[Portail]			liste des portails
		 * @return $:JSON 								liste des portails au format JSON
		 */
		function GetAllPortailsForJS($list_portail){
			$json = array();
			$portail = array();

			if(count($list_portail) > 0){
				for($i = 0; $i < count($list_portail); $i++){
					$portail = array('id' => $list_portail[$i]->getId(), 'portail' => $list_portail[$i]->getPortail());
					array_push($json, $portail);
				}
			}
			echo json_encode($json);
		}

		/**
		 * Méthode GetPortailById
		 * Renvoie l'objet Portail correspondant à l'id indiqué
		 * @package DB, DBQuery
		 * @param $idPortail:Int			identifiant du portail
		 * @return $portail:Portail 		Objet Portail correspondant à l'id indiqué
		 */
		function GetPortailById($idPortail){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$res = $mysqli->Query(str_replace(array("{{ID}}"), array($idPortail), $dbq->getPortailById()));

			$f = $res->fetch_assoc();
			$portail = new Portail($f['idPortail'], $f['portail']);
			return $portail;
		}

		function CreatePortail(){ return null; }
		function EditPortail(){ return null; }
		function DeletePortail(){ return null; }
	}
?>