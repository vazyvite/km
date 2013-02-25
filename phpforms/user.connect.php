<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.User.php");

	$dbq = new DBQuery();
	$user = new User();

	if(isset($_POST['login']) && isset($_POST['pass'])) {
		$login = $_POST['login'];
		$password = md5($_POST['pass']);
		$user->GetCurrentUser($dbq->getUserCheck($login, $password));

	}elseif(isset($_POST['id']) && isset($_POST['pass'])){
		$id = $_POST['id'];
		$password = $_POST['pass'];		
		$user->GetCurrentUser($dbq->getUserCheckId($id, $password));

	}else{
		// erreur de connexion, les identifiants sont manquants
	}
?>