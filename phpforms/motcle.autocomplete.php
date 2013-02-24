<?php
	session_start();
	require_once("../phpclass/class.DB.php");
	require_once("../phpclass/class.DBQuery.php");
	require_once("../phpclass/class.Article.php");
	require_once("../phpclass/class.MotCle.php");
	require_once("../phpclass/class.ListMotCles.php");

	if(isset($_POST['q'])){
		$terms = $_POST['q'];

		$motcle = new ListMotCles();
		$res = $motcle->GetMotClesByTerm($terms);
		$motcle->BuildAutocompleteMotClesForJS($res);
	}else{
		// l'idArticle n'est pas défini
		echo "non défini";
	}
?>