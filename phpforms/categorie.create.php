<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Categorie.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['categorie']) && isset($_POST['idPortail']) && isset($_POST['description'])){
		$c = $_POST['categorie'];
		$idPortail = $_POST['idPortail'];
		$description = $_POST['description'];

		$categorie = new Categorie();
		$categorie->CreateCategorie($c, $idPortail, $description);
	}else{
		// données manquantes
		echo "données manquantes";
	}
?>