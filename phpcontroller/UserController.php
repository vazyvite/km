<?php
	@session_start();
	require_once("../phpclass/class.User.php");
	require_once("../phpcontroller/DBController.php");

	define("BD_CHECK_USER", "SELECT * FROM user WHERE login = '{{LOGIN}}' && pass = '{{PASS}}'");

	function getUserById($id){
		$user
		$user->GetUserById($id);
	}

	function getCurrentUser(){
		if(isset($_SESSION["user.id"]) && $_SESSION["user.id"] != ""){
			getUserById($_SESSION["user.id"]);
		}else{
			// TODO : appeler l'interface de connexion
		}
	}

	function getUserByMail($mail){

	}

	function createUser(){

	}

	function deleteUser(){

	}

	function editUser(){

	}

	function connectUser(){
		echo "ok";
		/*if(isset($_POST['login']) && isset($_POST['pass'])){
			$login = $_POST['login'];
			$password = $_POST['pass'];
			
			$mysqli = new DB();
			$mysqli->Query(str_replace(array("{{LOGIN}}", "{{PASS}}"), array($login, $password), BD_CHECK_USER));

			echo "ok";
			// tester la présence des logins et password
			// récupérer les informations USER
		}else{
			alert("no");
			// erreur de connexion, les identifiants sont manquants
		}*/
	}

	function disconnectUser(){

	}
	function htmlDataUser(){

	}
	function drawUIConnect(){
		include("../phpforms/user.show.php");
	}

	if(isset($_POST["action"])){
		$action = $_POST["action"];
		$user = new User();
		getCurrentUser();

		switch($action){

			case "getCurrentUser":
				getCurrentUser();
				break;

			case "getUserById":
				getUserById($id);
				break;

			case "getUserByMail":
				getUserByMail($mail);
				break;			

			case "createUser":
				createUser($id, $nom, $prenom, $mail, $role, $password, $login);
				break;

			case "deleteUser":
				deleteUser($id);
				break;

			case "editUser":
				editUser($id, $nom, $prenom, $mail, $role, $password, $login);
				break;

			case "connectUser":
				connectUser($id);
				break;

			case "disconnectUser":
				disconnectUser($id);
				break;

			case "UIConnect":
				drawUIConnect();
				break;

			default:
				break;
		}
	}else{
		// variable action non définie
	}
?>