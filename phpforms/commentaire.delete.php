<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Commentaire.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idCommentaire'])){
		$idCommentaire = $_POST['idCommentaire'];

		$c = new Commentaire();
		
		$res = $c->DeleteCommentaire($idCommentaire);
		// $c->BuildResultsForJS($res);
	}else{
		// l'idUser n'est pas défini
	}
?>