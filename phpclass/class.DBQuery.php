<?php
	class DBQuery {

		// USERS
		const DB_USER_CHECK = 	"SELECT * FROM user WHERE login = '{{LOGIN}}' AND password = '{{PASS}}'";
		const DB_USER_CHECKID = "SELECT * FROM user WHERE idUser = '{{ID}}' AND password = '{{PASS}}'";
		const DB_USER_BYID = 	"SELECT * FROM user WHERE idUser = '{{IDUSER}}'";
		const DB_USER_LIST = 	"SELECT * FROM user";
		const DB_USER_CREATE = 	"INSERT INTO user (lstName, fstName, email, role, login, password) VALUES ('{{LSTNAME}}', '{{FSTNAME}}', '{{EMAIL}}', '{{ROLE}}', '{{LOGIN}}', '{{PASSWORD}}')";
		const DB_USER_UPDATE = 	"UPDATE user SET lstName = '{{LSTNAME}}', fstName = '{{FSTNAME}}', email = '{{EMAIL}}', role = '{{ROLE}}', login = '{{LOGIN}}', password = '{{PASSWORD}}' WHERE idUser = '{{IDUSER}}'";
		const DB_USER_DELETE = 	"DELETE FROM user WHERE idUser = '{{IDUSER}}'";

		function getUserCheck($login, $pass){ return str_replace(array("{{LOGIN}}","{{PASS}}"), array($login, $pass), DBQuery::DB_USER_CHECK); }
		function getUserCheckId($id_user, $pass){ return str_replace(array("{{ID}}","{{PASS}}"), array($id_user, $pass), DBQuery::DB_USER_CHECKID); }
		function getUserById($id_user){ return str_replace(array("{{IDUSER}}"), array($id_user), DBQuery::DB_USER_BYID); }
		function getAllUsers(){ return DBQuery::DB_USER_LIST; }
		function createUser($lstname, $fstname, $email, $role, $login, $password){ return str_replace(array("{{LSTNAME}}", "{{FSTNAME}}", "{{EMAIL}}", "{{ROLE}}", "{{LOGIN}}", "{{PASSWORD}}"), array($lstname, $fstname, $email, $role, $login, $password), DBQuery::DB_USER_CREATE); }
		function updateUser($id_user, $lstname, $fstname, $email, $role, $login, $password){ return str_replace(array("{{IDUSER}}", "{{LSTNAME}}", "{{FSTNAME}}", "{{EMAIL}}", "{{ROLE}}", "{{LOGIN}}", "{{PASSWORD}}"), array($id_user, $lstname, $fstname, $email, $role, $login, $password), DBQuery::DB_USER_UPDATE); }
		function deleteUser($id_user){ return str_replace(array("{{IDUSER}}"), array($id_user), DBQuery::DB_USER_DELETE); }



		// PORTAILS
		const DB_PORTAIL_LIST = "SELECT * FROM portail";
		const DB_PORTAIL_BYID = "SELECT * FROM portail WHERE idPortail = '{{ID}}'";
		const DB_PORTAIL_CREATE = "INSERT INTO portail (portail) VALUES ('{{PORTAIL}}')";
		const DB_PORTAIL_UPDATE = "UPDATE portail SET portail = '{{PORTAIL}}' WHERE idPortail = '{{IDPORTAIL}}'";
		const DB_PORTAIL_DELETE = "DELETE FROM portail WHERE idPortail = '{{IDPORTAIL}}'";

		function getPortailList(){ return DBQuery::DB_PORTAIL_LIST; }
		function getPortailById($id_portail){ return str_replace(array("{{ID}}"), array($id_portail), DBQuery::DB_PORTAIL_BYID); }
		function createPortail($portail){ return str_replace(array("{{PORTAIL}}"), array($portail), DBQuery::DB_PORTAIL_CREATE); }
		function updatePortail($id_portail, $portail){ return str_replace(array("{{IDPORTAIL}}","{{PORTAIL}}"), array($id_portail, $portail), DBQuery::DB_PORTAIL_UPDATE); }
		function deletePortail($id_portail){ return str_replace(array("{{IDPORTAIL}}"), array($id_portail), DBQuery::DB_PORTAIL_DELETE); }



		// CATEGORIES
		const DB_CATEGORIE_ALL = 	"SELECT * FROM categorie";
		const DB_CATEGORIE_LIST = 	"SELECT * FROM categorie WHERE idPortail = '{{IDPORTAIL}}'";
		const DB_CATEGORIE_BYID = 	"SELECT * FROM categorie WHERE idCategorie = '{{IDCATEGORIE}}'";
		const DB_CATEGORIE_CREATE = "INSERT INTO categorie (idPortail, categorie, description) VALUES ('{{IDPORTAIL}}', '{{CATEGORIE}}', '{{DESCRIPTION}}')";
		const DB_CATEGORIE_UPDATE = "UPDATE categorie SET idPortail = '{{IDPORTAIL}}', categorie = '{{CATEGORIE}}', description = '{{DESCRIPTION}}' WHERE idCategorie = '{{IDCATEGORIE}}'";
		const DB_CATEGORIE_DELETE = "DELETE FROM categorie WHERE idCategorie = '{{IDCATEGORIE}}'";

		function getAllCategorie(){ return DBQuery::DB_CATEGORIE_ALL; }
		function getListCategorie($id_portail){ return str_replace(array("{{IDPORTAIL}}"), array($id_portail), DBQuery::DB_CATEGORIE_LIST); }
		function getCategorieById($id_categorie){ return str_replace(array("{{IDCATEGORIE}}"), array($id_categorie), DBQuery::DB_CATEGORIE_BYID); }
		function createCategorie($id_portail, $categorie, $description){ return str_replace(array("{{IDPORTAIL}}", "{{CATEGORIE}}", "{{DESCRIPTION}}"), array($id_portail, $categorie, $description), DBQuery::DB_CATEGORIE_CREATE); }
		function updateCategorie($id_categorie, $id_portail, $categorie, $description){ return str_replace(array("{{IDCATEGORIE}}", "{{IDPORTAIL}}", "{{CATEGORIE}}", "{{DESCRIPTION}}"), array($id_categorie, $id_portail, $categorie, $description), DBQuery::DB_CATEGORIE_UPDATE); }
		function deleteCategorie($id_categorie){ return str_replace(array("{{IDCATEGORIE}}"), array($id_categorie), DBQuery::DB_CATEGORIE_DELETE); }



		// ARTICLES
		const DB_ARTICLE_ALL = 			"SELECT * FROM article";
		const DB_ARTICLE_LIST = 		"SELECT * FROM article WHERE idCategorie = '{{IDCATEGORIE}}'";
		const DB_ARTICLE_BYID = 		"SELECT * FROM article WHERE idArticle = '{{IDARTICLE}}'";
		const DB_ARTICLE_BYTERMS = 		"SELECT A.idArticle, A.idType, A.idUser, A.dt_creation, A.idCategorie, A.titre, A.article, C.idCategorie, C.categorie FROM article A INNER JOIN categorie C ON A.idCategorie = C.idCategorie LEFT OUTER JOIN motcle M ON A.idArticle = M.idArticle  WHERE C.idPortail = {{IDPORTAIL}} AND ((A.titre LIKE '%{{TERMS}}%' OR A.article LIKE '%{{TERMS}}%' ) OR M.motcle LIKE '%{{TERMS}}%')";
		const DB_ARTICLE_BYUAP = 		"SELECT * FROM article A, categorie C WHERE A.idCategorie = C.idCategorie AND A.idUser = '{{IDUSER}}' AND C.idPortail = '{{IDPORTAIL}}'";
		const DB_ARTICLE_BYUSER = 		"SELECT * FROM article WHERE idUser = '{{IDUSER}}'";
		const DB_ARTICLE_CREATE = 		"INSERT INTO article (idType, idUser, idCategorie, titre, article) VALUES ('{{IDTYPE}}', '{{IDUSER}}', '{{IDCATEGORIE}}', '{{TITRE}}', '{{ARTICLE}}')";
		const DB_ARTICLE_UPDATE = 		"UPDATE article SET titre='{{TITLEARTICLE}}', article='{{CONTENTARTICLE}}' WHERE idArticle = '{{IDARTICLE}}'";
		const DB_ARTICLE_DELETE = 		"DELETE FROM article WHERE idArticle = '{{IDARTICLE}}'";
		const DB_ARTICLE_MATCH = 		"SELECT A.idArticle, A.titre FROM article A, motcle M WHERE A.idArticle = M.idArticle AND A.idCategorie = '{{IDCATEGORIE}}' AND M.motcle = '{{MOTCLE}}'";
		const DB_ARTICLE_GETPORTAIL = 	"SELECT P.idPortail FROM article A, categorie C, portail P WHERE A.idCategorie = C.idCategorie AND C.idPortail = P.idPortail AND A.idArticle = '{{IDARTICLE}}'";

		function getAllArticle(){ return DBQuery::DB_ARTICLE_ALL; }
		function getListArticle($id_categorie){ return str_replace(array("{{IDCATEGORIE}}"), array($id_categorie), DBQuery::DB_ARTICLE_LIST); }
		function getArticleById($id_article){ return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_ARTICLE_BYID); }
		function getArticleByUserAndPortail($id_user, $id_portail){ return str_replace(array("{{IDUSER}}", "{{IDPORTAIL}}"), array($id_user, $id_portail), DBQuery::DB_ARTICLE_BYUAP); }
		function getArticleByUser($id_user){ return str_replace(array("{{IDUSER}}"), array($id_user), DBQuery::DB_ARTICLE_BYUSER); }
		function getListArticleByTerms($id_portail, $terms){ return str_replace(array("{{IDPORTAIL}}", "{{TERMS}}"), array($id_portail, $terms), DBQuery::DB_ARTICLE_BYTERMS); }
		function createArticle($id_type, $id_user, $id_categorie, $titre, $article){ return str_replace(array("{{IDTYPE}}", "{{IDUSER}}", "{{IDCATEGORIE}}", "{{TITRE}}", "{{ARTICLE}}"), array($id_type, $id_user, $id_categorie, $titre, $article), DBQuery::DB_ARTICLE_CREATE); }
		function updateArticle($id_article, $titre, $content){ return str_replace(array("{{TITLEARTICLE}}", "{{CONTENTARTICLE}}", "{{IDARTICLE}}"), array($titre, $content, $id_article), DBQuery::DB_ARTICLE_UPDATE); }
		function deleteArticle($id_article){ return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_ARTICLE_DELETE); }
		function getMatchingArticles($id_categorie, $motcle){ return str_replace(array("{{IDCATEGORIE}}", "{{MOTCLE}}"), array($id_categorie, $motcle), DBQuery::DB_ARTICLE_MATCH); }
		function getPortailForArticle($id_article){ return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_ARTICLE_GETPORTAIL); }



		// TYPE
		const DB_TYPE_ALL = 	"SELECT * FROM type";
		const DB_TYPE_BYID = 	"SELECT * FROM type WHERE idType = '{{IDTYPE}}'";

		function getAllTypes(){ 		return DBQuery::DB_TYPE_ALL; }
		function getTypeById($id_type){ return str_replace(array("{{IDTYPE}}"), array($id_type), DBQuery::DB_TYPE_BYID); }



		// MOTS CLES
		const DB_MOTCLE_ALL = 				"SELECT * FROM motcle";
		const DB_MOTCLE_BYID = 				"SELECT * FROM motcle WHERE idMotCle = '{{IDMOTCLE}}'";
		const DB_MOTCLE_BYTERMS = 			"SELECT * FROM motcle WHERE motcle LIKE '%{{TERMS}}%'";
		const DB_MOTCLE_LIST = 				"SELECT * FROM motcle WHERE idArticle = '{{IDARTICLE}}'";
		const DB_MOTCLE_UPDATE = 			"UPDATE motcle SET motcle='{{MOTCLE}}' WHERE idMotCle = '{{IDMOTCLE}}'";
		const DB_MOTCLE_CREATE =			"INSERT INTO motcle (idArticle, motcle) VALUES ('{{IDARTICLE}}', '{{MOTCLE}}')";
		const DB_MOTCLE_DELETEALLARTICLE =	"DELETE FROM motcle WHERE idArticle = '{{IDARTICLE}}'";

		function getAllMotCles(){ 							return DBQuery::DB_MOTCLE_ALL; }
		function getMotCleById($id_motcle){ 				return str_replace(array("{{IDMOTCLE}}"), array($id_motcle), DBQuery::DB_MOTCLE_BYID); }
		function getMotCleByTerms($terms){ 					return str_replace(array("{{TERMS}}"), array($terms), DBQuery::DB_MOTCLE_BYTERMS); }
		function getListMotClesForArticle($id_article){ 	return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_MOTCLE_LIST); }
		function updateMotCles($id_motcle, $motcle){ 		return str_replace(array("{{MOTCLE}}", "{{IDMOTCLE}}"), array($motcle, $id_motcle), DBQuery::DB_MOTCLE_UPDATE); }
		function createMotCles($id_article, $motcle){ 		return str_replace(array("{{IDARTICLE}}", "{{MOTCLE}}"), array($id_article, $motcle), DBQuery::DB_MOTCLE_CREATE); }
		function deleteAllMotClesForArticle($id_article){ 	return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_MOTCLE_DELETEALLARTICLE); }


		
		// FAVORIS
		const DB_FAVORIS_FORUSER = 		"SELECT * FROM favoris WHERE idUser = '{{IDUSER}}' AND isForced = 1";
		const DB_FAVORIS_FORARTICLE = 	"SELECT * FROM favoris WHERE idArticle = '{{IDARTICLE}}' AND isForced = 1";
		const DB_FAVORIS_BYID = 		"SELECT * FROM favoris WHERE idFavoris = '{{IDFAVORIS}}'";
		const DB_FAVORIS_INCREMENT = 	"UPDATE favoris SET nbViews = nbViews + 1 WHERE idUser = '{{IDUSER}}' AND idArticle = '{{IDARTICLE}}'";
		const DB_FAVORIS_CREATE = 		"INSERT INTO favoris (idUser, idArticle, nbViews, isForced) VALUES ('{{IDUSER}}', '{{IDARTICLE}}', '1', '{{ISFORCED}}')";
		const DB_FAVORIS_DELETE = 		"DELETE FROM favoris WHERE idUser = '{{IDUSER}}' AND idArticle = '{{IDARTICLE}}'";
		const DB_FAVORIS_FORCE = 		"UPDATE favoris SET isForced = '{{ISFORCED}}' WHERE idUser = '{{IDUSER}}' AND idArticle = '{{IDARTICLE}}'";
		const DB_FAVORIS_MOSTVIEWED = 	"(SELECT * FROM favoris WHERE idUser = '{{IDUSER}}' AND idArticle = '{{IDARTICLE}}' AND isForced = 0 LIMIT 20) ORDER BY nbViews DESC";
		const DB_FAVORIS_SELECT = 		"SELECT * FROM favoris WHERE idUser = '{{IDUSER}}' AND idArticle = '{{IDARTICLE}}'";

		function getFavorisForUser($id_user){							return str_replace(array("{{IDUSER}}"), array($id_user), DBQuery::DB_FAVORIS_FORUSER); }
		function getFavorisForArticle($id_article){						return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_FAVORIS_FORARTICLE); }
		function getFavorisById($id_favoris){							return str_replace(array("{{IDFAVORIS}}"), array($id_favoris), DBQuery::DB_FAVORIS_BYID); }
		function incrementFavorisView($id_user, $id_article){			return str_replace(array("{{IDUSER}}", "{{IDARTICLE}}"), array($id_user, $id_article), DBQuery::DB_FAVORIS_INCREMENT); }
		function createFavoris($id_user, $id_article, $forced = false){	return str_replace(array("{{IDUSER}}", "{{IDARTICLE}}", "{{ISFORCED}}"), array($id_user, $id_article, $forced), DBQuery::DB_FAVORIS_CREATE); }
		function deleteFavoris($idUser, $id_article){					return str_replace(array("{{IDUSER}}", "{{IDARTICLE}}"), array($id_user, $id_article), DBQuery::DB_FAVORIS_DELETE); }
		function forceFavoris($id_user, $id_article, $forced){			return str_replace(array("{{IDUSER}}", "{{IDARTICLE}}", "{{ISFORCED}}"), array($id_user, $id_article, $forced), DBQuery::DB_FAVORIS_FORCE); }
		function getMostViewed($id_user, $id_article){					return str_replace(array("{{IDUSER}}", "{{IDARTICLE}}"), array($id_user, $id_article), DBQuery::DB_FAVORIS_MOSTVIEWED); }
		function getFavoris($id_user, $id_article){						return str_replace(array("{{IDUSER}}", "{{IDARTICLE}}"), array($id_user, $id_article), DBQuery::DB_FAVORIS_SELECT); }



		// COMMENTAIRES
		const DB_COMMENTS_FORARTICLE = 	"SELECT * FROM commentaire WHERE idArticle = '{{IDARTICLE}}'";
		const DB_COMMENTS_CREATE = 		"INSERT INTO commentaire (idArticle, idUser, idType, titre, commentaire) VALUES ('{{IDARTICLE}}', '{{IDUSER}}', '{{IDTYPE}}', '{{TITRE}}', '{{COMMENTAIRE}}')";
		const DB_COMMENTS_DELETE = 		"DELETE FROM commentaire WHERE idCommentaire = '{{IDCOMMENTAIRE}}'";
		const DB_COMMENTS_UPDATE = 		"UPDATE commentaire SET idType = '{{IDTYPE}}', titre = '{{TITRE}}', commentaire = '{{COMMENTAIRE}}' WHERE idCommentaire = '{{IDCOMMENTAIRE}}'";

		function getCommentsForArticle($id_article){									return str_replace(array("{{IDARTICLE}}"), array($id_article), DBQuery::DB_COMMENTS_FORARTICLE); }
		function createComment($id_article, $id_user, $id_type, $titre, $commentaire){	return str_replace(array("{{IDARTICLE}}", "{{IDUSER}}", "{{IDTYPE}}", "{{TITRE}}", "{{COMMENTAIRE}}"), array($id_article, $id_user, $id_type, $titre, $commentaire), DBQuery::DB_COMMENTS_CREATE); }
		function deleteComment($id_commentaire){										return str_replace(array("{{IDCOMMENTAIRE}}"), array($id_commentaire), DBQuery::DB_COMMENTS_DELETE); }
		function updateComment($id_commentaire, $id_type, $titre, $commentaire){		return str_replace(array("{{IDCOMMENTAIRE}}", "{{IDTYPE}}", "{{TITRE}}", "{{COMMENTAIRE}}"), array($id_commentaire, $id_type, $titre, $commentaire), DBQuery::DB_COMMENTS_UPDATE); }
	}
?>