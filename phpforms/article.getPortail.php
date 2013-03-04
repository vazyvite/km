<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.Categorie.php");
	require_once("../phpclass/class.Portail.php");
	require_once("../phpclass/class.User.php");


	if(isset($_POST['idArticle'])){
		$idArticle = $_POST['idArticle'];

		$article = new Article();
		echo $article->GetPortail($idArticle);
	}else{
		echo "données manquantes :: ";
	}
?>