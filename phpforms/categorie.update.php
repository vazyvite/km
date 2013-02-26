<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Categorie.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idCategorie']) && isset($_POST['idPortail']) && isset($_POST['categorie']) && isset($_POST['description'])){
		$idCategorie = $_POST['idCategorie'];
		$idPortail = $_POST['idPortail'];
		$c = $_POST['categorie'];
		$description = $_POST['description'];

		$categorie = new Categorie();
		$categorie->UpdateCategorie($idCategorie, $idPortail, $c, $description);
	}else{
		// données manquantes
		echo "données manquantes";
	}
	
?>