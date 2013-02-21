<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Navigation.php");
	require_once("../phpclass/class.Portail.php");
	require_once("../phpclass/class.Categorie.php");
	require_once("../phpclass/class.CategorieContent.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.MotCle.php");
	require_once("../phpclass/class.ListMotCles.php");

	if(isset($_POST['idPortail'])){
		$idPortail = $_POST['idPortail'];

		$navigation = new Navigation();
		$nav = $navigation->BuildNavigation($idPortail);
		$navigation->BuildNavigationForJS($nav);
	}else{
		// l'idPortail n'est pas défini
	}
?>