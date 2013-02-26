<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Portail.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['portail'])){
		$p = $_POST['portail'];

		$portail = new Portail();
		$portail->CreatePortail($p);
	}else{
		echo "non défini";
	}
?>