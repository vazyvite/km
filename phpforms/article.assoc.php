<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.User.php");
	require_once("../phpclass/class.MotCle.php");


	if(isset($_POST['idCategorie']) && isset($_POST['motcles'])){
		$idCategorie = $_POST['idCategorie'];
		$motcles = $_POST['motcles'];

		$article = new Article();
		$res = $article->GetAssociatedArticles($idCategorie, $motcles);
	}else{
		echo "données manquantes :: ";
	}
?>