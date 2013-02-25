<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Portail.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['id']) && isset($_POST['portail'])){
		$id = $_POST['id'];
		$p = $_POST['portail'];

		$portail = new Portail();
		$portail->UpdatePortail($id, $p);
	}
?>