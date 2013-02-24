<?php
	class DBQuery {

		// USERS
		const DB_USER_CHECK = 	"SELECT * FROM user WHERE login = '{{LOGIN}}' AND password = '{{PASS}}'";
		const DB_USER_CHECKID = "SELECT * FROM user WHERE idUser = '{{ID}}' AND password = '{{PASS}}'";
		const DB_USER_BYID = 	"SELECT * FROM user WHERE idUser = '{{IDUSER}}'";
		// function getUserCheck($login, $pass){ 	return DBQuery::DB_USER_CHECK; }
		function getUserCheck($login, $pass){ 		return str_replace(array("{{LOGIN}}","{{PASS}}"), array($login, $pass), DBQuery::DB_USER_CHECK); }
		function getUserCheckId($id_user, $pass){ 	return str_replace(array("{{ID}}","{{PASS}}"), array($id_user, $pass), DBQuery::DB_USER_CHECKID); }
		function getUserById($id_user){ 			return str_replace(array("{{IDUSER}}"), array($id_user), DBQuery::DB_USER_BYID); }



		// PORTAILS
		const DB_PORTAIL_LIST = "SELECT * FROM portail";
		const DB_PORTAIL_BYID = "SELECT * FROM portail WHERE idPortail = '{{ID}}'";
		function getPortailList(){ 				return DBQuery::DB_PORTAIL_LIST; }
		function getPortailById($id_portail){ 	return str_replace(array("{{ID}}"), array($id_portail), DBQuery::DB_PORTAIL_BYID); }



		// CATEGORIES
		const DB_CATEGORIE_ALL = 	"SELECT * FROM categorie";
		const DB_CATEGORIE_LIST = 	"SELECT * FROM categorie WHERE idPortail = '{{IDPORTAIL}}'";
		const DB_CATEGORIE_BYID = 	"SELECT * FROM categorie WHERE idCategorie = '{{IDCATEGORIE}}'";
		function getAllCategorie(){ 				return DBQuery::DB_CATEGORIE_ALL; }
		function getListCategorie($id_portail){		return str_replace(array("{{IDPORTAIL}}"), array($id_portail), DBQuery::DB_CATEGORIE_LIST); }
		function getCategorieById($id_categorie){ 	return str_replace(array("{{IDCATEGORIE}}"), array($id_categorie), DBQuery::DB_CATEGORIE_BYID); }



		// ARTICLES
		const DB_ARTICLE_ALL = 		"SELECT * FROM article";
		const DB_ARTICLE_LIST = 	"SELECT * FROM article WHERE idCategorie = '{{IDCATEGORIE}}'";
		const DB_ARTICLE_BYID = 	"SELECT * FROM article WHERE idArticle = '{{IDARTICLE}}'";
		const DB_ARTICLE_BYTERMS = 	"SELECT A.idArticle, A.idType, A.idUser, A.dt_creation, A.idCategorie, A.titre, A.article, C.idCategorie, C.categorie FROM article A INNER JOIN categorie C ON A.idCategorie = C.idCategorie LEFT OUTER JOIN motcle M ON A.idArticle = M.idArticle  WHERE C.idPortail = {{IDPORTAIL}} AND ((A.titre LIKE '%{{TERMS}}%' OR A.article LIKE '%{{TERMS}}%' ) OR M.motcle LIKE '%{{TERMS}}%')";
		const DB_ARTICLE_UPDATE = 	"UPDATE article SET titre='{{TITLEARTICLE}}', article='{{CONTENTARTICLE}}' WHERE idArticle = '{{IDARTICLE}}'";
		function getAllArticle(){ 								return DBQuery::DB_ARTICLE_ALL; }
		function getListArticle($id_categorie){ 				return str_replace(array("{{IDCATEGORIE}}"), array($id_categorie), DBQuery::DB_ARTICLE_LIST); }
		function getArticleById($id_article){ 					return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_ARTICLE_BYID); }
		function getListArticleByTerms($id_portail, $terms){ 	return str_replace(array("{{IDPORTAIL}}", "{{TERMS}}"), array($id_portail, $terms), DBQuery::DB_ARTICLE_BYTERMS); }
		function updateArticle($id_article, $titre, $content){ 	return str_replace(array("{{TITLEARTICLE}}", "{{CONTENTARTICLE}}", "{{IDARTICLE}}"), array($titre, $content, $id_article), DBQuery::DB_ARTICLE_UPDATE); }



		// TYPE
		const DB_TYPE_ALL = 	"SELECT * FROM type";
		const DB_TYPE_BYID = 	"SELECT * FROM type WHERE idType = '{{IDTYPE}}'";
		function getAllTypes(){ 		return DBQuery::DB_TYPE_ALL; }
		function getTypeById($id_type){ return str_replace(array("{{IDTYPE}}"), array($id_type), DBQuery::DB_TYPE_BYID); }



		// MOTS CLES
		const DB_MOTCLE_ALL = 	"SELECT * FROM motcle";
		const DB_MOTCLE_BYID = 	"SELECT * FROM motcle WHERE idMotCle = '{{IDMOTCLE}}'";
		const DB_MOTCLE_LIST = 	"SELECT * FROM motcle WHERE idArticle = '{{IDARTICLE}}'";
		function getAllMotCles(){ 						return DBQuery::DB_MOTCLE_ALL; }
		function getMotCleById($id_motcle){ 			return str_replace(array("{{IDMOTCLE}}"), array($id_motcle), DBQuery::DB_MOTCLE_BYID); }
		function getListMotClesForArticle($id_article){ return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_MOTCLE_LIST); }
	}
?>