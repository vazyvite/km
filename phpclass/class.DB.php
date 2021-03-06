<?php
	class DB {
		private $_user;
		private $_host;
		private $_pass;
		private $_db;

		// setters
		function setUser($user){ $this->_user = $user; }
		function setHost($host){ $this->_host = $host; }
		function setPass($pass){ $this->_pass = $pass; }
		function setDB($db){ $this->_db = $db; }

		// getters
		function getUser(){ return $this->_user; }
		function getHost(){ return $this->_host; }
		function getPass(){ return $this->_pass; }
		function getDB(){ return $this->_db; }

		// constructor
		function DB($host = "localhost", $user = "root", $pass = "root", $db = "km"){
			$this->setHost($host);
			$this->setUser($user);
			$this->setPass($pass);
			$this->setDB($db);
		}

		// méthodes

		/**
		 * Méthode Connect
		 * Permet d'établir une connexion à partir de MySQLi à la base de donnée
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return mysqliObject			dans le cas d'une connexion réussie, retourne un objet résultat mysqli
		 */
		function Connect(){
			$mysqli = new mysqli($this->getHost(), $this->getUser(), $this->getPass(), $this->getDB());
			$mysqli->set_charset("utf8");

			if ($mysqli->connect_errno) {
			    return false;
			}else{
				return $mysqli;
			}
		}

		/**
		 * Méthode ConnectOutDB
		 * Permet d'établir une connexion à partir de MySQLi à la base de donnée
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return mysqliObject			dans le cas d'une connexion réussie, retourne un objet résultat mysqli
		 */
		function ConnectOutDB(){
			$mysqli = new mysqli($this->getHost(), $this->getUser(), $this->getPass());
			$mysqli->set_charset("utf8");

			if ($mysqli->connect_errno) {
			    return false;
			}else{
				return $mysqli;
			}
		}

		/**
		 * Méthode Query
		 * Permet de lancer une requête SQL
		 * @param $query:String 		la requête SQL
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return mysqliResultObject	dans le cas d'une connexion réussie, retourne un objet résultat mysqli contenant les résultats de la requête SQL
		 */
		function Query($query){

			$mysqli = $this->Connect();

			if($mysqli != false){
				$res = $mysqli->query($query);
				return ($res->num_rows > 0) ? $res : false;
			}else{
				return false;
			}
		}

		/**
		 * Méthode SimpleQuery
		 * Permet de lancer une requête SQL
		 * @param $query:String 		la requête SQL
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return mysqliResultObject	dans le cas d'une connexion réussie, retourne un objet résultat mysqli contenant les résultats de la requête SQL
		 */
		function SimpleQuery($query){

			$mysqli = $this->Connect();

			if($mysqli != false){
				$res = $mysqli->query($query);
				return true;
			}else{
				return false;
			}
		}

		/**
		 * Méthode Update
		 * Permet de lancer une requête SQL d'update 
		 * @param $query:String 		la requête SQL
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return Boolean::true		dans le cas d'une connexion réussie, retourne un objet résultat mysqli contenant les résultats de la requête SQL
		 */
		function Update($query){

			$mysqli = $this->Connect();

			if($mysqli != false){
				$res = $mysqli->query($query);
				return ($mysqli->errno == 0) ? true : false;
			}else{
				return false;
			}
		}

		/**
		 * Méthode Create
		 * Permet de lancer une requête SQL de création 
		 * @param $query:String 		la requête SQL
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return Boolean::true 		dans le cas d'une connexion réussie, retourne un objet résultat mysqli contenant les résultats de la requête SQL
		 */
		function Create($query){

			$mysqli = $this->Connect();

			if($mysqli != false){
				$res = $mysqli->query($query);
				echo $mysqli->error;
				return $mysqli->insert_id;
			}else{
				echo "error";
				return false;
			}
		}

		/**
		 * Méthode Delete
		 * Permet de lancer une requête SQL de suppression 
		 * @param $query:String 		la requête SQL
		 * @return Boolean::false 		dans le cas d'une erreur de connexion
		 * @return Boolean::true 		dans le cas d'une connexion réussie, retourne un objet résultat mysqli contenant les résultats de la requête SQL
		 */
		function Delete($query){

			$mysqli = $this->Connect();

			if($mysqli != false){
				$res = $mysqli->query($query);
				return ($mysqli->errno == 0) ? true : false;
			}else{
				return false;
			}
		}

		/** 
		 * Méthode TableIsExists
		 * Permet de tester si une table est présente dans la base
		 * @param query:String 			la table à tester
		 * @return :Boolean 			true si la table existe, false si la table n'existe pas
		 */
		function TableIsExists($query){
			$mysqli = $this->Connect();

			if($mysqli != false){
				$res = $mysqli->query($query);
				return $res->num_rows;
			}else{
				return 0;
			}
		}

		/** 
		 * Méthode CreateDB
		 * Permet de tester si une table est présente dans la base
		 * @param query:String 			la table à tester
		 * @return :Boolean 			true si la table existe, false si la table n'existe pas
		 */
		function CreateDB($query){
			$mysqli = $this->ConnectOutDB();

			if($mysqli != false){
				$res = $mysqli->query($query);
				return ($res) ? true : false;
			}else{
				return false;
			}
		}
	}
?>