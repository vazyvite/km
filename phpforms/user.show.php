<?php
	@session_start();

	if($_SESSION["user_id"] != ""){ // connecté
		?>
		<div>
			<div><?php echo $_SESSION["user_name"]; ?></div>
		</div>
		<?php
	}else{	// non connecté
		
		if(isset($_POST['action'])){
			$action = $_POST['action'];

			if($action == "dialogConnexion"){
				DrawDialogConnexion();
			}else{
				DrawConnexion();
			}
		}else{
			DrawConnexion();
		}
	}

	function DrawConnexion(){
	?>
		<div class="bloc_content">
			<button class="action_user_connexion">Connexion</button>
		</div>
	<?php
	}
?>