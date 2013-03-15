<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Commentaire.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idArticle'])){
		$idArticle = $_POST['idArticle'];

		$c = new Commentaire();
		
		$list = $c->GetCommentaireForArticle($idArticle);
		$c->FormatListOfCommentsForJS($list);
	}else{
		// l'idUser n'est pas défini
	}
?>