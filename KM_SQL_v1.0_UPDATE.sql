-- phpMyAdmin SQL Dump
-- version 3.3.9.1
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 15 Mars 2013 à 17:16
-- Version du serveur: 5.5.9
-- Version de PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `km`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `idArticle` int(11) NOT NULL AUTO_INCREMENT,
  `idType` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idCategorie` int(11) NOT NULL,
  `dt_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `titre` varchar(150) NOT NULL,
  `article` text NOT NULL,
  PRIMARY KEY (`idArticle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Contenu de la table `article`
--

UPDATE `article` SET `idArticle` = 15,`idType` = 1,`idUser` = 1,`idCategorie` = 1,`dt_creation` = '2013-02-27 19:00:39',`titre` = 'alert',`article` = '&lt;section&gt;&lt;code&gt;alert( &quot;String&quot; );&lt;/code&gt;&lt;/section&gt;\n\n&lt;aside&gt;Popup d&#039;alerte javascript&lt;/aside&gt;\n\n&lt;article&gt;\nLance une popup d&#039;alerte javascript pouvant contenir des informations textuelles et n&Atilde;&copy;cessitant une action de l&#039;utilisateur pour valider la lecture de l&#039;alert&lt;/article&gt;\n&lt;p&gt;&lt;/p&gt;' WHERE `article`.`idArticle` = 15;
UPDATE `article` SET `idArticle` = 16,`idType` = 1,`idUser` = 1,`idCategorie` = 1,`dt_creation` = '2013-02-27 19:07:11',`titre` = 'prompt',`article` = '&lt;section&gt;&lt;code&gt;prompt( &quot;title&quot; );&lt;/code&gt;&lt;/section&gt;&lt;p&gt;&lt;/p&gt;&lt;aside title=&quot;Description de l&#039;article&quot;&gt;Popup de saisie utilisateur&lt;/aside&gt;&lt;p&gt;&lt;/p&gt;&lt;article&gt;Affiche une popup affichant un message invitant l&#039;utilisateur &Atilde;&nbsp; saisir une valeur&lt;/article&gt;' WHERE `article`.`idArticle` = 16;
UPDATE `article` SET `idArticle` = 17,`idType` = 1,`idUser` = 1,`idCategorie` = 1,`dt_creation` = '2013-02-27 19:08:07',`titre` = 'confirm',`article` = '&lt;section&gt;&lt;code&gt;confirm( &quot;String&quot; );&lt;/code&gt;&lt;/section&gt;&lt;p&gt;&lt;/p&gt;&lt;aside title=&quot;Description de l&#039;article&quot;&gt;Popup de confirmation&lt;/aside&gt;&lt;p&gt;&lt;/p&gt;&lt;article&gt;Affiche une popup dont le message invite l&#039;utilisateur &Atilde;&nbsp; valider ou annuler son action&lt;/article&gt;' WHERE `article`.`idArticle` = 17;
UPDATE `article` SET `idArticle` = 21,`idType` = 1,`idUser` = 1,`idCategorie` = 7,`dt_creation` = '2013-03-04 16:26:34',`titre` = 'Roi',`article` = '&lt;aside title=&quot;Description de l&#039;article&quot;&gt;Roi, dirigeant d&#039;un royaume&lt;/aside&gt;&lt;section title=&quot;Syntaxe de l&#039;article&quot;&gt;&lt;code&gt;R O I&lt;/code&gt;&lt;/section&gt;&lt;article title=&quot;Corps de l&#039;article&quot;&gt;Le roi est le repr&Atilde;&copy;sentant du pouvoir l&Atilde;&copy;gislatif et ex&Atilde;&copy;cutif au sein de son royaume et de ses d&Atilde;&copy;pendances.&lt;/article&gt;' WHERE `article`.`idArticle` = 21;
UPDATE `article` SET `idArticle` = 22,`idType` = 1,`idUser` = 1,`idCategorie` = 1,`dt_creation` = '2013-03-12 10:14:19',`titre` = 'test2',`article` = '&lt;aside title=&quot;Description de l&#039;article&quot;&gt;description2&lt;/aside&gt;&lt;section title=&quot;Syntaxe de l&#039;article&quot;&gt;&lt;code&gt;syntaxe2&lt;/code&gt;&lt;/section&gt;&lt;article title=&quot;Corps de l&#039;article&quot;&gt;corps de l&#039;article2&lt;/article&gt;' WHERE `article`.`idArticle` = 22;
UPDATE `article` SET `idArticle` = 23,`idType` = 1,`idUser` = 1,`idCategorie` = 1,`dt_creation` = '2013-03-14 13:47:01',`titre` = 'Test large',`article` = '&lt;aside title=&quot;Description de l&#039;article&quot;&gt;description d&#039;un article avec un long texte de pr&Atilde;&copy;sentation pour tester son int&Atilde;&copy;gration dans la HomePage&lt;/aside&gt;&lt;section title=&quot;Syntaxe de l&#039;article&quot;&gt;&lt;code&gt;syntaxe&lt;/code&gt;&lt;/section&gt;&lt;article title=&quot;Corps de l&#039;article&quot;&gt;corps de l&#039;article&lt;/article&gt;' WHERE `article`.`idArticle` = 23;

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `idCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `idPortail` int(11) NOT NULL,
  `categorie` varchar(25) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `categorie`
--

UPDATE `categorie` SET `idCategorie` = 1,`idPortail` = 1,`categorie` = 'Javascript',`description` = 'Base de connaissance sur le Javascript' WHERE `categorie`.`idCategorie` = 1;
UPDATE `categorie` SET `idCategorie` = 3,`idPortail` = 1,`categorie` = 'PHP',`description` = 'Base de connaissance sur le PHP' WHERE `categorie`.`idCategorie` = 3;
UPDATE `categorie` SET `idCategorie` = 5,`idPortail` = 0,`categorie` = 'test',`description` = 'super' WHERE `categorie`.`idCategorie` = 5;
UPDATE `categorie` SET `idCategorie` = 6,`idPortail` = 1,`categorie` = 'Java',`description` = 'Base de connaissance sur le Java' WHERE `categorie`.`idCategorie` = 6;
UPDATE `categorie` SET `idCategorie` = 7,`idPortail` = 7,`categorie` = 'Moyen Age',`description` = 'Portail sur le Moyen Age' WHERE `categorie`.`idCategorie` = 7;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `idCommentaire` int(11) NOT NULL AUTO_INCREMENT,
  `idArticle` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idType` int(11) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `titre` varchar(150) NOT NULL,
  `commentaire` text NOT NULL,
  PRIMARY KEY (`idCommentaire`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `commentaire`
--

UPDATE `commentaire` SET `idCommentaire` = 1,`idArticle` = 15,`idUser` = 1,`idType` = 1,`date_creation` = '2013-03-15 11:07:54',`titre` = 'Commentaire test',`commentaire` = 'Contenu test pour un commentaire' WHERE `commentaire`.`idCommentaire` = 1;
UPDATE `commentaire` SET `idCommentaire` = 2,`idArticle` = 15,`idUser` = 1,`idType` = 2,`date_creation` = '2013-03-15 11:07:54',`titre` = 'Super titre',`commentaire` = 'Super commentaire pour un super article !' WHERE `commentaire`.`idCommentaire` = 2;

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `idFavoris` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `nbViews` int(11) NOT NULL,
  `isForced` tinyint(1) NOT NULL,
  PRIMARY KEY (`idFavoris`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `favoris`
--

UPDATE `favoris` SET `idFavoris` = 1,`idUser` = 1,`idArticle` = 15,`nbViews` = 195,`isForced` = 1 WHERE `favoris`.`idFavoris` = 1;
UPDATE `favoris` SET `idFavoris` = 2,`idUser` = 1,`idArticle` = 16,`nbViews` = 78,`isForced` = 1 WHERE `favoris`.`idFavoris` = 2;
UPDATE `favoris` SET `idFavoris` = 3,`idUser` = 1,`idArticle` = 17,`nbViews` = 30,`isForced` = 1 WHERE `favoris`.`idFavoris` = 3;
UPDATE `favoris` SET `idFavoris` = 4,`idUser` = 1,`idArticle` = 21,`nbViews` = 8,`isForced` = 1 WHERE `favoris`.`idFavoris` = 4;
UPDATE `favoris` SET `idFavoris` = 5,`idUser` = 1,`idArticle` = 23,`nbViews` = 7,`isForced` = 0 WHERE `favoris`.`idFavoris` = 5;
UPDATE `favoris` SET `idFavoris` = 6,`idUser` = 1,`idArticle` = 22,`nbViews` = 2,`isForced` = 0 WHERE `favoris`.`idFavoris` = 6;

-- --------------------------------------------------------

--
-- Structure de la table `motcle`
--

DROP TABLE IF EXISTS `motcle`;
CREATE TABLE IF NOT EXISTS `motcle` (
  `idMotCle` int(11) NOT NULL AUTO_INCREMENT,
  `idArticle` int(11) NOT NULL,
  `motcle` varchar(25) NOT NULL,
  PRIMARY KEY (`idMotCle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=154 ;

--
-- Contenu de la table `motcle`
--

UPDATE `motcle` SET `idMotCle` = 127,`idArticle` = 16,`motcle` = 'popup' WHERE `motcle`.`idMotCle` = 127;
UPDATE `motcle` SET `idMotCle` = 128,`idArticle` = 16,`motcle` = 'javascript' WHERE `motcle`.`idMotCle` = 128;
UPDATE `motcle` SET `idMotCle` = 134,`idArticle` = 21,`motcle` = 'titre' WHERE `motcle`.`idMotCle` = 134;
UPDATE `motcle` SET `idMotCle` = 143,`idArticle` = 22,`motcle` = 'test' WHERE `motcle`.`idMotCle` = 143;
UPDATE `motcle` SET `idMotCle` = 144,`idArticle` = 22,`motcle` = 'hop' WHERE `motcle`.`idMotCle` = 144;
UPDATE `motcle` SET `idMotCle` = 149,`idArticle` = 15,`motcle` = 'javascript' WHERE `motcle`.`idMotCle` = 149;
UPDATE `motcle` SET `idMotCle` = 150,`idArticle` = 15,`motcle` = 'test' WHERE `motcle`.`idMotCle` = 150;
UPDATE `motcle` SET `idMotCle` = 151,`idArticle` = 23,`motcle` = 'truc' WHERE `motcle`.`idMotCle` = 151;
UPDATE `motcle` SET `idMotCle` = 152,`idArticle` = 17,`motcle` = 'popup' WHERE `motcle`.`idMotCle` = 152;
UPDATE `motcle` SET `idMotCle` = 153,`idArticle` = 17,`motcle` = 'test' WHERE `motcle`.`idMotCle` = 153;

-- --------------------------------------------------------

--
-- Structure de la table `portail`
--

DROP TABLE IF EXISTS `portail`;
CREATE TABLE IF NOT EXISTS `portail` (
  `idPortail` int(11) NOT NULL AUTO_INCREMENT,
  `portail` varchar(25) NOT NULL,
  PRIMARY KEY (`idPortail`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Contenu de la table `portail`
--

UPDATE `portail` SET `idPortail` = 1,`portail` = 'Informatique' WHERE `portail`.`idPortail` = 1;
UPDATE `portail` SET `idPortail` = 7,`portail` = 'Histoire' WHERE `portail`.`idPortail` = 7;
UPDATE `portail` SET `idPortail` = 14,`portail` = 'portail test' WHERE `portail`.`idPortail` = 14;

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `idType` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`idType`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `type`
--

UPDATE `type` SET `idType` = 1,`type` = 'Article' WHERE `type`.`idType` = 1;
UPDATE `type` SET `idType` = 2,`type` = 'Cours' WHERE `type`.`idType` = 2;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `lstName` varchar(25) NOT NULL,
  `fstName` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(3) NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `user`
--

UPDATE `user` SET `idUser` = 1,`lstName` = 'Jacques',`fstName` = 'Jonathan',`email` = 'j.jacques2@free.fr',`role` = '11',`login` = 'jja',`password` = '202cb962ac59075b964b07152d234b70' WHERE `user`.`idUser` = 1;
UPDATE `user` SET `idUser` = 3,`lstName` = 'testnom',`fstName` = 'test',`email` = 'j.jacques@free.fr',`role` = '10',`login` = 'test',`password` = '202cb962ac59075b964b07152d234b70' WHERE `user`.`idUser` = 3;






