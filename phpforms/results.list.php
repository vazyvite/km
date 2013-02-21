<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Recherche.php");
	require_once("../phpclass/class.Portail.php");
	require_once("../phpclass/class.ResultList.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.MotCle.php");
	require_once("../phpclass/class.ListMotCles.php");

	if(isset($_POST['idPortail']) && isset($_POST['terms'])){
		$idPortail = $_POST['idPortail'];
		$terms = $_POST['terms'];

		$results = new Recherche();
		$res = $results->GetSearchResults($idPortail, $terms);
		$results->BuildResultsForJS($res);
	}else{
		// l'idPortail n'est pas défini
	}
?>