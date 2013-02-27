<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.User.php");

	if(isset($_POST['idUser']) && isset($_POST['fstName']) && isset($_POST['lstName']) && isset($_POST['email']) && isset($_POST['role']) && isset($_POST['login']) && isset($_POST['pass'])){
		$idUser = $_POST['idUser'];
		$fstName = $_POST['fstName'];
		$lstName = $_POST['lstName'];
		$email = $_POST['email'];
		$role = $_POST['role'];
		$login = $_POST['login'];
		$pass = $_POST['pass'];

		$user = new User();
		$res = $user->UpdateUser($idUser, $fstName, $lstName, $email, $role, $login, $pass);

	}else{
		echo "données manquantes";
	}
?>