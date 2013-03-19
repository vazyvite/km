<?php
	class Navigation {
		private $_portail;
		private $_listCategoriesContent;

		// setters
		function setPortail($portail){ $this->_portail = $portail; }
		function setListCategoriesContent($list){ $this->_listCategoriesContent = $list; }

		// getters
		function getPortail(){ return $this->_portail; }
		function getListCategoriesContent(){ return $this->_listCategoriesContent; }

		// constructor
		function Navigation($portail = null, $listCategoriesContent = array()){
			$this->setPortail($portail);
			$this->setListCategoriesContent($listCategoriesContent);
		}

		// méthodes

		/**
		 * Méthodes BuildNavigation
		 * Permet de construire l'arborescence de navigation
		 * @package DB, DBQuery, Portail, Categorie, CategorieContent, Article
		 * @param $idPortail:Int 			correspond à l'identifiant de l'objet Portail pour lequel on souhaite construire l'arborescence
		 * @return $navigation:Navigation 	objet Navigation rempli
		 */
		function BuildNavigation($idPortail){
			$portail = new Portail();
			$categorie = new Categorie();
			$listCat = array();
			$listCategorieContent = array();
			$navigation = new Navigation();

			$navigation->setPortail($portail->GetPortailById($idPortail));
			$listCat = $categorie->GetAllCategoriesForPortail($idPortail);
			$navigation->setListCategoriesContent($listCat);

			if(count($listCat) > 0){
				foreach($listCat as $cat){
					$c = new CategorieContent();
					$c->setCategorie($cat);
					$c->setListArticles($cat->GetAllArticlesForCategorie($cat->getIdCategorie()));
					array_push($listCategorieContent,$c);
				}

				$navigation->setListCategoriesContent($listCategorieContent);

				return $navigation;
			}else{
				return null;
			}
		}

		/**
		 * Méthodes BuildNavigationForJS
		 * Permet de construire l'arborescence de navigation
		 * @package DB, DBQuery, Portail, Categorie, CategorieContent, Article
		 * @param $navigation:Navigation 		Objet Navigation contenant l'arborescence de navigation
		 * @return $:JSON 						Arborescence de navigation au format JSON
		 */
		function BuildNavigationForJS($navigation){
			if($navigation != null){
				$json = array();
				$list_categorieContent = $navigation->getListCategoriesContent();

				if(count($list_categorieContent) > 0){
					foreach ($list_categorieContent as $categorieContent){
						$jsonArt = array();
						$categorie = $categorieContent->getCategorie();
						$idCategorie = $categorie->getIdCategorie();
						$list_articles = $categorie->GetAllArticlesForCategorie($idCategorie);

						if(count($list_articles) > 0){
							foreach ($list_articles as $article) {
								$a = array(
									'idArticle' => $article->getIdArticle(),
									'idType' => $article->getIdType(),
									'idUser' => $article->getIdUser(),
									'dateCreation' => $article->getDtCreation(),
									'titre' => html_entity_decode($article->getTitre(), ENT_QUOTES),
									'article' => html_entity_decode($article->getArticle(), ENT_QUOTES)
								);
								array_push($jsonArt, $a);
							}
						}else{
							$jsonArt = array();
						}

						$cc = array(
							'id' => $categorie->getIdCategorie(),
							'idPortail' => $categorie->getIdPortail(),
							'categorie' => html_entity_decode($categorie->getCategorie(), ENT_QUOTES),
							'description' => html_entity_decode($categorie->getDescription(), ENT_QUOTES),
							'articles' => $jsonArt
						);
						array_push($json, $cc);
					}
				}
				echo json_encode($json);
			}else{
				echo "";
			}
		}
	}
?>