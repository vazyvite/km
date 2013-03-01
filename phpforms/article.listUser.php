<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.User.php");
	require_once("../phpclass/class.Type.php");
	require_once("../phpclass/class.MotCle.php");
	require_once("../phpclass/class.Recherche.php");
	require_once("../phpclass/class.ResultList.php");
	require_once("../phpclass/class.ListMotCles.php");

	if(isset($_POST['idUser'])){
		$idUser = $_POST['idUser'];

		// $article = new Article();
		$recherche = new Recherche();
		
		$res = $recherche->GetSearchResultsForIdUser($idUser);
		$recherche->BuildResultsForJS($res);
	}else{
		// l'idUser n'est pas défini
	}
?>