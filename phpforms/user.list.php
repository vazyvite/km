<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.User.php");

	$user = new User();
	$list = $user->GetAllUsers();
	$user->GetAllUsersForJS($list);
?>