<?php
	class DBQuery {

		// USERS
		const DB_USER_CHECK = "SELECT * FROM user WHERE login = '{{LOGIN}}' AND password = '{{PASS}}'";
		const DB_USER_CHECKID = "SELECT * FROM user WHERE idUser = '{{ID}}' AND password = '{{PASS}}'";
		const DB_USER_BYID = "SELECT * FROM user WHERE idUser = '{{IDUSER}}'";
		function getUserCheck(){ return DBQuery::DB_USER_CHECK; }
		function getUserCheckId(){ return DBQuery::DB_USER_CHECKID; }
		function getUserById(){ return DBQuery::DB_USER_BYID; }

		// PORTAILS
		const DB_PORTAIL_LIST = "SELECT * FROM portail";
		const DB_PORTAIL_BYID = "SELECT * FROM portail WHERE idPortail = '{{ID}}'";
		function getPortailList(){ return DBQuery::DB_PORTAIL_LIST; }
		function getPortailById(){ return DBQuery::DB_PORTAIL_BYID; }

		// CATEGORIES
		const DB_CATEGORIE_ALL = "SELECT * FROM categorie";
		const DB_CATEGORIE_LIST = "SELECT * FROM categorie WHERE idPortail = '{{IDPORTAIL}}'";
		const DB_CATEGORIE_BYID = "SELECT * FROM categorie WHERE idCategorie = '{{IDCATEGORIE}}'";
		function getAllCategorie(){ return DBQuery::DB_CATEGORIE_ALL; }
		function getListCategorie(){ return DBQuery::DB_CATEGORIE_LIST; }
		function getCategorieById(){ return DBQuery::DB_CATEGORIE_BYID; }

		// ARTICLES
		const DB_ARTICLE_ALL = "SELECT * FROM article";
		const DB_ARTICLE_LIST = "SELECT * FROM article WHERE idCategorie = '{{IDCATEGORIE}}'";
		const DB_ARTICLE_BYID = "SELECT * FROM article WHERE idArticle = '{{IDARTICLE}}'";
		const DB_ARTICLE_BYTERMS = "SELECT A.idArticle, A.idType, A.idUser, A.dt_creation, A.idCategorie, A.titre, A.article, C.idCategorie, C.categorie FROM article A INNER JOIN categorie C ON A.idCategorie = C.idCategorie LEFT OUTER JOIN motcle M ON A.idArticle = M.idArticle  WHERE C.idPortail = {{IDPORTAIL}} AND ((A.titre LIKE '%{{TERMS}}%' OR A.article LIKE '%{{TERMS}}%' ) OR M.motcle LIKE '%{{TERMS}}%')";
		function getAllArticle(){ return DBQuery::DB_ARTICLE_ALL; }
		function getListArticle(){ return DBQuery::DB_ARTICLE_LIST; }
		function getArticleById(){ return DBQuery::DB_ARTICLE_BYID; }
		function getListArticleByTerms(){ return DBQuery::DB_ARTICLE_BYTERMS; }

		// TYPE
		const DB_TYPE_ALL = "SELECT * FROM type";
		const DB_TYPE_BYID = "SELECT * FROM type WHERE idType = '{{IDTYPE}}'";
		function getAllTypes(){ return DBQuery::DB_TYPE_ALL; }
		function getTypeById(){ return DBQuery::DB_TYPE_BYID; }

		// MOTS CLES
		const DB_MOTCLE_ALL = "SELECT * FROM motcle";
		const DB_MOTCLE_BYID = "SELECT * FROM motcle WHERE idMotCle = '{{IDMOTCLE}}'";
		const DB_MOTCLE_LIST = "SELECT * FROM motcle WHERE idArticle = '{{IDARTICLE}}'";
		function getAllMotCles(){ return DBQuery::DB_MOTCLE_ALL; }
		function getMotCleById(){ return DBQuery::DB_MOTCLE_BYID; }
		function getListMotClesForArticle(){ return DBQuery::DB_MOTCLE_LIST; }
	}
?>