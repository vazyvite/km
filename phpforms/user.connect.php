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
		$user->GetCurrentUser(str_replace(array("{{LOGIN}}", "{{PASS}}"), array($login, $password), $dbq->getUserCheck()));

	}elseif(isset($_POST['id']) && isset($_POST['pass'])){
		$id = $_POST['id'];
		$password = $_POST['pass'];		
		$user->GetCurrentUser(str_replace(array("{{ID}}", "{{PASS}}"), array($id, $password), $dbq->getUserCheckId()));

	}else{
		// erreur de connexion, les identifiants sont manquants
	}
?>