<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Categorie.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idCategorie'])){
		$idCategorie = $_POST['idCategorie'];

		$categorie = new Categorie();
		$categorie->DeleteCategorie($idCategorie);
	}else{
		// données manquantes
	}
?>