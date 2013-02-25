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

	/**
	 * Méthode GetMotClesForArticle
	 * Récupère la liste des mots clés pour un article
	 * @param terms:Int 			Terme recherché
	 * @return list:ListMotCles 	Liste des mots clés
	 */
	function GetMotClesByTerm($terms){
		$dbq = new DBQuery();
		$mysqli = new DB();
		$res = $mysqli->Query($dbq->getMotCleByTerms($terms));
		$list = array();

		if($res != false){
			while($f = $res->fetch_assoc()){
				$m = new MotCle($f['idMotCle'],$f['idArticle'], $f['motcle']);
				array_push($list, $m);
			}
			return $list;
		}
	}

	/**
	 * Méthode BuildAutocompleteMotClesForJS
	 * Retourne les données correspondant aux mots clés sous forme de JSON
	 * @param list:Int 		Identifiant de l'article
	 * @return list:ListMotCles 	Liste des mots clés
	 */
	function BuildAutocompleteMotClesForJS($list){
		if($list != null){
			$arr_mc = array();
			$json = array();

			foreach ($list as $motcle) {
				$m = array('id' => $motcle->getId(), 'name' => $motcle->getMotCle());
				array_push($arr_mc, $m);
			}

			array_push($json, $arr_mc);
		}

		echo json_encode($json);
	}
}
?>