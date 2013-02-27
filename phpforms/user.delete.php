<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idUser'])){
		$idUser = $_POST['idUser'];

		$user = new User();
		$res = $user->DeleteUser($idUser);

	}else{
		echo "données manquantes";
	}
?>



