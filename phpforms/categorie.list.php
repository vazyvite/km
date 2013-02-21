<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Categorie.php");

	$categorie = new Categorie();
	$list = $categorie->GetAllCategoriesForPortail();
	$categorie->GetAllCategoriesForJS($list);
?>