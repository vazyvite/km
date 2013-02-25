<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Portail.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['id'])){
		$id = $_POST['id'];

		$portail = new Portail();
		$portail->DeletePortail($id);
	}
?>