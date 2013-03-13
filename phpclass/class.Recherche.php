<?php
	class Recherche {
		private $_portail;
		private $_listResults;

		// setters
		function setPortail($portail){ $this->_portail = $portail; }
		function setListResults($list){ $this->_listResults = $list; }

		// getters
		function getPortail(){ return $this->_portail; }
		function getListResults(){ return $this->_listResults; }

		// constructor
		function Navigation($portail = null, $listResults = array()){
			$this->setPortail($portail);
			$this->setListResults($listResults);
		}

		// méthodes

		/**
		 * Méthodes GetSearchResults
		 * Permet de lancer une recherche
		 * @package DB, DBQuery, Portail, ResultsList, Article
		 * @param $idPortail:Int 			correspond à l'identifiant de l'objet Portail pour lequel on souhaite construire l'arborescence
		 * @param $terms:String 			correspond à aux termes utilisés par la recherche
		 * @return $recherche:Recherche 	objet Recherche rempli
		 */
		function GetSearchResults($idPortail, $terms){
			$portail = new Portail();
			$article = new Article();
			$listArt = array();
			$recherche = new Recherche();

			$recherche->setPortail($portail->GetPortailById($idPortail));
			$listArt = $article->GetAllArticlesForTerms($idPortail, $terms);
			$recherche->setListResults($listArt);

			return $recherche;
		}

		/**
		 * Méthodes GetSearchResultsForIdUser
		 * Permet de lancer une recherche d'articles à partir des idUsers
		 * @package DB, DBQuery, Portail, ResultsList, Article
		 * @param $idPortail:Int 			correspond à l'identifiant de l'objet Portail pour lequel on souhaite construire l'arborescence
		 * @param $terms:String 			correspond à aux termes utilisés par la recherche
		 * @return $recherche:Recherche 	objet Recherche rempli
		 */
		function GetSearchResultsForIdUser($idUser, $idPortail){
			$article = new Article();
			$listArt = array();
			$recherche = new Recherche();

			$listArt = $article->GetArticleByUser($idUser, $idPortail);
			$recherche->setListResults($listArt);

			return $recherche;
		}

		/**
		 * Méthodes BuildResultsForJS
		 * Permet de construire les résultats d'une recherche
		 * @package DB, DBQuery, Portail, ResultList, Article
		 * @param $recherche:Recherche 			Objet Recherche contenant l'ensemble des articles à afficher
		 * @return $:JSON 						Ensemble des résultats de la recherche au format JSON
		 */
		function BuildResultsForJS($recherche){
			$json = array();
			$list_results = $recherche->getListResults();
			$added = array();
			
			if(count($list_results) > 0){
				foreach ($list_results as $article) {
					if(array_search($article->getIdArticle(), $added) === false){
						$a = array('idArticle' => $article->getIdArticle(), 'idCategorie' => $article->getIdCategorie(), 'idType' => $article->getIdType(), 'idUser' => $article->getIdUser(), 'dateCreation' => $article->getDtCreation(), 'titre' => $article->getTitre(), 'article' => $article->getArticle());
						array_push($added, $article->getIdArticle());
						array_push($json, $a);
					}
				}
			}else{
				$json = array();
			}

			echo json_encode($json);
		}

		/**
		 * Méthodes BuildResultsForJS
		 * Permet de construire les résultats d'une recherche
		 * @package DB, DBQuery, Portail, ResultList, Article
		 * @param $recherche:Recherche 			Objet Recherche contenant l'ensemble des articles à afficher
		 * @return $:JSON 						Ensemble des résultats de la recherche au format JSON
		 */
		function BuildResultsFromListForJS($list_results){
			$json = array();
			$added = array();
			
			if(count($list_results) > 0){
				foreach ($list_results as $article) {
					if(array_search($article->getIdArticle(), $added) === false){
						$a = array('idArticle' => $article->getIdArticle(), 'idCategorie' => $article->getIdCategorie(), 'idType' => $article->getIdType(), 'idUser' => $article->getIdUser(), 'dateCreation' => $article->getDtCreation(), 'titre' => $article->getTitre(), 'article' => $article->getArticle());
						array_push($added, $article->getIdArticle());
						array_push($json, $a);
					}
				}
			}else{
				$json = array();
			}

			echo json_encode($json);
		}
	}
?>