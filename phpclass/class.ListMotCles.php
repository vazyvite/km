<?php
class ListMotCles {
	private $_listeMotCles;

	// setters
	function setListMotCle($liste){ $this->_listeMotCles = $liste; }

	// getters
	function getListMotCle(){ return $this->_listeMotCles; }

	// Constructor
	function ListMotCles($liste = null){
		$this->setListMotCle($liste);
	}

	// méthodes

	/**
	 * Méthode GetMotClesForArticle
	 * Récupère la liste des mots clés pour un article
	 * @param idArticle:Int 		Identifiant de l'article
	 * @return list:ListMotCles 	Liste des mots clés
	 */
	function GetMotClesForArticle($idArticle){
		$dbq = new DBQuery();
		$mysqli = new DB();
		$res = $mysqli->Query($dbq->getListMotClesForArticle($idArticle));
		$list = array();

		if($res != false){
			while($f = $res->fetch_assoc()){
				$m = new MotCle($f['idMotCle'],$f['idArticle'], $f['motcle']);
				array_push($list, $m);
			}
			return $list;
		}
	}
}
?>