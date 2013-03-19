<?php
	class User {
		private $_id;
		private $_lstName;
		private $_fstName;
		private $_email;
		private $_role; // 00:Aucun , 01: Lecture, 10: Ecriture: 11: Administration
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
			$this->setPassword($password);
			$this->setLogin($login);
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
				$json = array(
					'idUser'	=> $f['idUser'],
					'lstName'	=> html_entity_decode($f['lstName'], ENT_QUOTES),
					'fstName' 	=> html_entity_decode($f['fstName'], ENT_QUOTES),
					'email' 	=> $f['email'],
					'role' 		=> $f['role'],
					'login' 	=> html_entity_decode($f['login'], ENT_QUOTES),
					'pass' 		=> $f['password']
				);
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
			$_SESSION['lstName'] = html_entity_decode($data['lstName'], ENT_QUOTES);
			$_SESSION['fstName'] = html_entity_decode($data['fstName'], ENT_QUOTES);
			$_SESSION['email'] = $data['email'];
			$_SESSION['role'] = $data['role'];
			$_SESSION['login'] = html_entity_decode($data['login'], ENT_QUOTES);
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
			$res = $mysqli->Query($dbq->getUserById($idUser));
			
			if($res != false){
				$f = $res->fetch_assoc();
				$user = new User($f['idUser'], $f['lstName'], $f['fstName'], $f['email'], $f['role'], $f['login'], $f['password']);
			}else{
				$user = null;
			}
			return $user;
		}

		/**
		 * Méthode GetAllUsers
		 * Permet de récupérer tous les utilisateurs
		 * @package DB, DBQuery
		 * @param idUser:Int 				identifiant de l'utilisateur
		 * @return user:User 				utilisateur
		 */
		function GetAllUsers(){
			$mysqli = new DB();
			$dbq = new DBQuery();
			$list = array();

			$res = $mysqli->Query($dbq->getAllUsers());

			if($res != false){
				while($f = $res->fetch_assoc()){
					$u = new User($f['idUser'], $f['lstName'], $f['fstName'], $f['email'], $f['role'], $f['login'], $f['password']);
					array_push($list, $u);
				}
				return $list;
			}else{
				return null;
			}
		}

		/**
		 * Méthode GetAllUsersForJS
		 * Renvoie la liste des utilisateurs au format JSON
		 * @param $list_portail:Array[Portail]			liste des utilisateurs
		 * @return $:JSON 								liste des utilisateurs au format JSON
		 */
		function GetAllUsersForJS($list_users){
			$json = array();
			$users = array();

			if(count($list_users) > 0){
				for($i = 0; $i < count($list_users); $i++){
					$users = array(
						'idUser' => $list_users[$i]->getId(),
						'lstName' => html_entity_decode($list_users[$i]->getLastName(), ENT_QUOTES),
						'fstName' => html_entity_decode($list_users[$i]->getFirstName(), ENT_QUOTES),
						'email' => $list_users[$i]->getMail(),
						'role' => $list_users[$i]->getRole(),
						'login' => html_entity_decode($list_users[$i]->getLogin(), ENT_QUOTES),
						'pass' => $list_users[$i]->getPassword()
					);
					array_push($json, $users);
				}
			}else{
				echo "pas assez d&apos;utilisateurs";
			}
			echo json_encode($json);
		}

		/**
		 * Méthode CheckUserRights
		 * Valide l'action en fonction des droits de l'utilisateur
		 * @param lvl:String 			Niveau de sécurité de l'action
		 * @param userRights:String 	Niveau de droits de l'utilisateur
		 * @return Boolean 			 	true si l'utilisateur a les droits suffisants, false dans le cas contraire
		 */
		function CheckUserRights($lvl, $userRights){
			$lvl = intval($lvl);
			$userRights = intval($userRights);

			if($userRights >= $lvl){
				return true;
			}else{
				return false;
			}
		}

		/**
		 * Méthode UpdateUser
		 * Met à jour l'utilisateur
		 * @package DB, DBQuery
		 * @param idUser:Int		identifiant de l'utilisateur
		 * @param fstName:String	Prénom de l'utilisateur
		 * @param lstName:String	Nom de l'utilisateur
		 * @param email:String		Email de l'utilisateur
		 * @param role:String		Role de l'utilisateur
		 * @param login:String		Login de l'utilisateur
		 * @param pass:String		Pass de l'utilisateur
		 */
		function UpdateUser($idUser, $fstName, $lstName, $email, $role, $login, $pass){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			$u = $user->GetUserById($idUser);

			if(md5($pass) == $u->getPassword() || $pass == $u->getPassword()){
				$password = $pass;
			}else{
				$password = md5($pass);
			}

			if((isset($_SESSION['role']) && $this->CheckUserRights($lvl, $_SESSION['role'])) || ($_SESSION['idUser'] && $idUser == $_SESSION['idUser'])){
				$res = $mysqli->Update( $dbq->updateUser($idUser, htmlentities($lstName, ENT_QUOTES), htmlentities($fstName, ENT_QUOTES), $email, $role, htmlentities($login, ENT_QUOTES), $password));
			}
		}

		/**
		 * Méthode DeleteUser
		 * Supprime l'utilisateur
		 * @package DB, DBQuery
		 * @param $idUser:Int		identifiant de l'utilisateur
		 */
		function DeleteUser($idUser){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role']) && $_SESSION['idUser'] && $_SESSION['idUser'] != $idUser){
				$res = $mysqli->Delete( $dbq->deleteUser($idUser));
			}
		}

		/**
		 * Méthode CreateUser
		 * Supprime l'utilisateur
		 * @package DB, DBQuery
		 * @param fstName:String 	Prénom de l'utlisateur
		 * @param lstName:String 	Nom de l'utlisateur
		 * @param email:String 		Email de l'utlisateur
		 * @param role:String 		Role de l'utlisateur
		 * @param login:String 		Login de l'utlisateur
		 * @param pass:String 		Mot de passe de l'utlisateur
		 */

		function CreateUser($fstName, $lstName, $email, $role, $login, $pass){
			$lvl = "11";
			$dbq = new DBQuery();
			$mysqli = new DB();
			$user = new User();

			if(isset($_SESSION['role']) && $user->CheckUserRights($lvl, $_SESSION['role'])){
				$res = $mysqli->Create( $dbq->createUser(htmlentities($lstName, ENT_QUOTES), htmlentities($fstName, ENT_QUOTES), $email, $role, htmlentities($login, ENT_QUOTES), md5($pass)));
			}else{
				echo "droits insuffisants";
			}
		}
	}
?>