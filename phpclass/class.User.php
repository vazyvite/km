<?php
	class User {
		private $_id;
		private $_lstName;
		private $_fstName;
		private $_email;
		private $_role;
		private $_password;
		private $_login;

		// setters
		function setId($id){ $this->_id = $id; }
		function setLastName($lstName){ $this->_lstName = $lstName; }
		function setFirstName($fstName){ $this->_fstName = $fstName; }
		function setMail($mail){ $this->_email = $mail; }
		function setRole($role){ $this->_role = $role; }
		function setPassword($password){ $this->_password = $password; }
		function setLogin($login){ $this->_login = $login; }

		// getters
		function getId(){ return $this->_id; }
		function getLastName(){ return $this->_lstName; }
		function getFirstName(){ return $this->_fstName; }
		function getMail(){ return $this->_email; }
		function getRole(){ return $this->_role; }
		function getPassword(){ return $this->_password; }
		function getLogin(){ return $this->_login; }


		// constructor
		function User($id = 0, $lstName = null, $fstName = null, $mail = null, $role = null, $login = null, $password = null){
			$this->setId($id);
			$this->setLastName($lstName);
			$this->setFirstName($fstName);
			$this->setMail($mail);
			$this->setRole($role);
			$this->setPassword($login);
			$this->setLogin($password);
		}

		// méthodes
		
		/**
		 * Méthode GetCurrentUser
		 * Permet de récupérer l'utilisateur courant
		 * @package DB, DBQuery
		 * @param $query:String 		requête SQL
		 * @return $:JSON 				informations de l'utilisateur
		 */
		function GetCurrentUser($query){
			$mysqli = new DB();
			$res = $mysqli->Query($query);

			if($res != false){
				$f = $res->fetch_assoc();
				$this->ConnectUser($f);
				$json = array('idUser' => $f['idUser'], 'lstName' => $f['lstName'], 'fstName' => $f['fstName'], 'email' => $f['email'], 'role' => $f['role'], 'login' => $f['login'], 'pass' => $f['password']);
				echo json_encode($json);
			}
		}

		/**
		 * Méthode ConnectUser
		 * Permet d'inscrire les informations de l'utilisateur en session
		 * @param $data:mysqliResultObject 		objet de résultats mysqli retourné par une requête SQL
		 */
		function ConnectUser($data){ 
			$_SESSION['idUser'] = $data['idUser'];
			$_SESSION['lstName'] = $data['lstName'];
			$_SESSION['fstName'] = $data['fstName'];
			$_SESSION['email'] = $data['email'];
			$_SESSION['role'] = $data['role'];
			$_SESSION['login'] = $data['login'];
			$_SESSION['password'] = $data['password'];
		}

		/**
		 * Méthode DisconnectUser
		 * Permet de déconnecter l'utilisateur de la session
		 */
		function DisconnectUser(){
			$_SESSION['idUser'] = 0;
			$_SESSION['lstName'] = "";
			$_SESSION['fstName'] = "";
			$_SESSION['email'] = "";
			$_SESSION['role'] = "";
			$_SESSION['login'] = "";
			$_SESSION['password'] = "";
			session_destroy();
		}

		/**
		 * Méthode GetUserById
		 * Permet de récupérer un utilisateur à partir de son identifiant
		 * @package DB, DBQuery
		 * @param idUser:Int 				identifiant de l'utilisateur
		 * @return user:User 				utilisateur
		 */
		function GetUserById($idUser){
			$mysqli = new DB();
			$dbq = new DBQuery();
			$res = $mysqli->Query(str_replace(array("{{IDUSER}}"), array($idUser), $dbq->getUserById()));
			
			if($res != false){
				$f = $res->fetch_assoc();
				$user = new User($f['idUser'], $f['lstName'], $f['fstName'], $f['email'], $f['role'], $f['login'], $f['password']);
			}else{
				$user = null;
			}
			return $user;
		}

		function CreateUser(){ return null; }
		function EditUser(){ return null; }
		function DeleteUser(){ return null; }
	}
?>