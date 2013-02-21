<?php
	class CategorieContent {
		private $_categorie;
		private $_listArticles;

		// setters
		function setCategorie($categorie){ $this->_categorie = $categorie; }
		function setListArticles($listArticles){ $this->_listArticles = $listArticles; }

		// getters
		function getCategorie(){ return $this->_categorie; }
		function getListArticles(){ return $this->_listArticles; }

		// constructor
		function CategorieContent($categorie = null, $listArticles = null){
			$this->setCategorie($categorie);
			$this->setListArticles($listArticles);
		}
	}
?>