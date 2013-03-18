<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Commentaire.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idArticle']) && isset($_POST['idUser']) && isset($_POST['idType']) && isset($_POST['titre']) && isset($_POST['commentaire'])){
		$idArticle = $_POST['idArticle'];
		$idUser = $_POST['idUser'];
		$idType = $_POST['idType'];
		$titre = $_POST['titre'];
		$commentaire = $_POST['commentaire'];

		$c = new Commentaire();
		
		$res = $c->CreateCommentaire($idArticle, $idUser, $idType, $titre, $commentaire);
		// $c->BuildResultsForJS($res);
	}else{
		echo "error";// l'idUser n'est pas défini
	}
?>