<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.User.php");
	require_once("../phpclass/class.MotCle.php");
	require_once("../phpclass/class.ListMotCles.php");


	if(isset($_POST['titre']) && isset($_POST['idType']) && isset($_POST['idUser']) && isset($_POST['idCategorie']) && isset($_POST['article']) && isset($_POST['motcles'])){
		$titre = $_POST['titre'];
		$idtype = $_POST['idType'];
		$iduser = $_POST['idUser'];
		$idcategorie = $_POST['idCategorie'];
		$a = $_POST['article'];
		$motcles = $_POST['motcles'];

		$article = new Article();
		$res = $article->CreateArticle($titre, $idtype, $iduser, $idcategorie, $a, $motcles);
	}else{
		echo "données manquantes :: ";
		echo "titre : " . $_POST['titre'] . " :: ";
		echo "idType : " . $_POST['idType'] . " :: ";
		echo "idUser : " . $_POST['idUser'] . " :: ";
		echo "idCategorie : " . $_POST['idCategorie'] . " :: ";
		echo "article : " . $_POST['article'] . " :: ";
		echo "motcles : " . $_POST['motcles'] . " :: ";
	}
?>