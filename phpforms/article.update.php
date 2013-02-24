<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.User.php");
	require_once("../phpclass/class.MotCle.php");
	require_once("../phpclass/class.ListMotCles.php");

	$_POST['motcles'] = "ok";

	if(isset($_POST['idArticle']) && isset($_POST['titre']) && isset($_POST['content']) && isset($_POST['motcles'])){
		$idArticle = $_POST['idArticle'];
		$titre = $_POST['titre'];
		$content = $_POST['content'];
		$motcles = $_POST['motcles'];

		$article = new Article();
		$res = $article->UpdateArticle($idArticle, $titre, $content, $motcles);

	}else{

	}
?>