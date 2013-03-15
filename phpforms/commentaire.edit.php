<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Commentaire.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idCommentaire']) && isset($_POST['idType']) && isset($_POST['titre']) && isset($_POST['commentaire'])){
		$idCommentaire = $_POST['idCommentaire'];
		$idUser = $_POST['idUser'];
		$idType = $_POST['idType'];
		$titre = $_POST['titre'];
		$commentaire = $_POST['commentaire'];

		$c = new Commentaire();
		
		$res = $c->UpdateCommentaire($idCommentaire, $idType, $titre, $commentaire);
		// $c->BuildResultsForJS($res);
	}else{
		// l'idUser n'est pas défini
	}
?>