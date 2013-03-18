<?php
	class Install {

		private $_table_list;
		private $_tables;

		function Install(){
			//$this->setTableList(array("article", "categorie", "commentaire", "favoris", "motcle", "portail", "type", "user"));
			$this->setTables(
				array(
					array(	'table' => "article", 'champs' => array(
						array( 'champ' => "idArticle", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "idType", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "idUser", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "idCategorie", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "dt_creation", 'type' => "TIMESTAMP", 'length' => null, 'defaut' => "CURRENT_TIMESTAMP", 'ai' => false, 'cle' => false ),
						array( 'champ' => "titre", 'type' => "VARCHAR", 'length' => 150, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "article", 'type' => "TEXT", 'length' => null, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "categorie", 'champs' => array(
						array( 'champ' => "idCategorie", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "idPortail", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "categorie", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "description", 'type' => "VARCHAR", 'length' => 256, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "commentaire", 'champs' => array(
						array( 'champ' => "idCommentaire", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "idArticle", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "idUser", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "idType", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "date_creation", 'type' => "TIMESTAMP", 'length' => null, 'defaut' => "CURRENT_TIMESTAMP", 'ai' => false, 'cle' => false ),
						array( 'champ' => "titre", 'type' => "VARCHAR", 'length' => 150, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "commentaire", 'type' => "TEXT", 'length' => null, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "favoris", 'champs' => array(
						array( 'champ' => "idFavoris", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "idUser", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai'	=> false, 'cle' => false ),
						array( 'champ' => "idArticle", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "nbViews", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "isForced", 'type' => "TINYINT", 'length' => 1, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "motcle", 'champs' => array(
						array( 'champ' => "idMotCle", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "idArticle", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai'	=> false, 'cle' => false ),
						array( 'champ' => "motcle", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "portail", 'champs' => array(
						array( 'champ' => "idPortail", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "portail", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "type", 'champs' => array(
						array( 'champ' => "idType", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "type", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ))
					),
					array(	'table' => "user", 'champs' => array(
						array( 'champ' => "idUser", 'type' => "INT", 'length' => 11, 'defaut' => null, 'ai' => true, 'cle' => true ),
						array( 'champ' => "lstName", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "fstName", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "email", 'type' => "VARCHAR", 'length' => 100, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "role", 'type' => "VARCHAR", 'length' => 3, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "login", 'type' => "VARCHAR", 'length' => 25, 'defaut' => null, 'ai' => false, 'cle' => false ),
						array( 'champ' => "password", 'type' => "VARCHAR", 'length' => 100, 'defaut' => null, 'ai' => false, 'cle' => false ))
					)
				)
			);
		}

		// function setTableList($list){ $this->_table_list = $list; }
		function setTables($tables){ $this->_tables = $tables; }
		
		// function getTableList(){ return $this->_table_list; }
		function getTables(){ return $this->_tables; }

		function TestDBConnexion(){
			$dbq = new DBQuery();
			$mysqli = new DB();

			if($mysqli->Connect() === false) {
				echo "0";
			}else{
				echo "";
			}
		}

		function TestDBTables(){
			$dbq = new DBQuery();
			$mysqli = new DB();
			$list = $this->getTables();

			for($i = 0; $i < count($list); $i++){
				$res = $mysqli->TableIsExists($dbq->tableIsExists($mysqli->getDB(), $list[$i]['table']));

				if($res == 0){

					$query = "CREATE TABLE " . $mysqli->getDB() . "." . $list[$i]['table'] . "(";

					for($c = 0; $c < count($list[$i]["champs"]); $c++){
						$champ = $list[$i]["champs"][$c];
						$query .= "`" . $champ["champ"] . "` ";

						if($champ["type"] != "VARCHAR" && $champ["length"] != null){
							$query .= $champ["type"] . " NOT NULL ";
						}else{
							$query .= $champ["type"] . "(" . $champ["length"] . ") NOT NULL ";
						}

						if($champ["defaut"] != null){
							$query .= " DEFAULT " . $champ["defaut"] . " ";
						}

						if($champ["ai"] == true){
							$query .= " AUTO_INCREMENT ";
						}

						if($champ["cle"] == true){
							$query .= " PRIMARY KEY";
						}

						if($c < count($list[$i]["champs"]) - 1){
							$query .= ",";
						}
					}

					$query .= ") ENGINE = INNODB";

					$r = $mysqli->Query($query);
				}else{
					echo "";
				}
			}
		}

		function InstallDB(){
			$dbq = new DBQuery();
			$mysqli = new DB();

			$res = $mysqli->CreateDB($dbq->createDB($mysqli->getDB()));
			$this->TestDBTables();
		}
	}	
?>