<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Portail.php");

	$portail = new Portail();
	$list = $portail->GetAllPortails();
	$portail->GetAllPortailsForJS($list);
?>