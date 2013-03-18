<?php
	
	if(isset($_POST['action'])){
		$action = $_POST['action'];

		require_once("../phpclass/class.DB.php");
		require_once("../phpclass/class.DBQuery.php");
		require_once("../phpclass/class.Install.php");

		$install = new Install();

		switch( $action ) {

			case "testDBConnexion": 
				$install->TestDBConnexion();
				break;

			case "testDBTables": 
				$install->TestDBTables();
				break;

			case "installDB": 
				$install->InstallDB();
				break;

			default: break;
		}

	}else{
		echo "manque ACTION";
	}
?>