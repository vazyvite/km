<?php
	class DB(){
		private $_user;
		private $_host;
		private $_pass;
		private $_db;

		function setUser($user){ $this->_user = $user; }
		function setHost($host){ $this->_host = $host; }
		function setPass($pass){ $this->_pass = $pass; }
		function setDB($db){ $this->_db = $db; }

		function getUser(){ return $this->_user; }
		function getHost(){ return $this->_host; }
		function getPass(){ return $this->_pass; }
		function getDB(){ return $this->_db; }

		function DB(){
			$this->setUser("root");
			$this->setHost("localhost");
			$this->setPass("");
			$this->setDB("km");

		function Connect(){
			$mysqli = new mysqli($this->getHost(), $this->getUser(), $this->getPass(), $this->getDB());
			if ($mysqli->connect_errno) {
			    echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
			}

			return $mysqli;
		}

		function Query(query){
			$mysqli = $this->Connect();
			$res = $mysqli->query(query);
			
			if($res->num_rows > 0){
				return $res;
			}else{
				return null;
			}
		}
	}
?>