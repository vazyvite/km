-- phpMyAdmin SQL Dump
-- version 3.3.9.1
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Ven 15 Mars 2013 à 17:17
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

INSERT INTO `article` (`idArticle`, `idType`, `idUser`, `idCategorie`, `dt_creation`, `titre`, `article`) VALUES
(15, 1, 1, 1, '2013-02-27 19:00:39', 'alert', '&lt;section&gt;&lt;code&gt;alert( &quot;String&quot; );&lt;/code&gt;&lt;/section&gt;\n\n&lt;aside&gt;Popup d&#039;alerte javascript&lt;/aside&gt;\n\n&lt;article&gt;\nLance une popup d&#039;alerte javascript pouvant contenir des informations textuelles et n&Atilde;&copy;cessitant une action de l&#039;utilisateur pour valider la lecture de l&#039;alert&lt;/article&gt;\n&lt;p&gt;&lt;/p&gt;'),
(16, 1, 1, 1, '2013-02-27 19:07:11', 'prompt', '&lt;section&gt;&lt;code&gt;prompt( &quot;title&quot; );&lt;/code&gt;&lt;/section&gt;&lt;p&gt;&lt;/p&gt;&lt;aside title=&quot;Description de l&#039;article&quot;&gt;Popup de saisie utilisateur&lt;/aside&gt;&lt;p&gt;&lt;/p&gt;&lt;article&gt;Affiche une popup affichant un message invitant l&#039;utilisateur &Atilde;&nbsp; saisir une valeur&lt;/article&gt;'),
(17, 1, 1, 1, '2013-02-27 19:08:07', 'confirm', '&lt;section&gt;&lt;code&gt;confirm( &quot;String&quot; );&lt;/code&gt;&lt;/section&gt;&lt;p&gt;&lt;/p&gt;&lt;aside title=&quot;Description de l&#039;article&quot;&gt;Popup de confirmation&lt;/aside&gt;&lt;p&gt;&lt;/p&gt;&lt;article&gt;Affiche une popup dont le message invite l&#039;utilisateur &Atilde;&nbsp; valider ou annuler son action&lt;/article&gt;'),
(21, 1, 1, 7, '2013-03-04 16:26:34', 'Roi', '&lt;aside title=&quot;Description de l&#039;article&quot;&gt;Roi, dirigeant d&#039;un royaume&lt;/aside&gt;&lt;section title=&quot;Syntaxe de l&#039;article&quot;&gt;&lt;code&gt;R O I&lt;/code&gt;&lt;/section&gt;&lt;article title=&quot;Corps de l&#039;article&quot;&gt;Le roi est le repr&Atilde;&copy;sentant du pouvoir l&Atilde;&copy;gislatif et ex&Atilde;&copy;cutif au sein de son royaume et de ses d&Atilde;&copy;pendances.&lt;/article&gt;'),
(22, 1, 1, 1, '2013-03-12 10:14:19', 'test2', '&lt;aside title=&quot;Description de l&#039;article&quot;&gt;description2&lt;/aside&gt;&lt;section title=&quot;Syntaxe de l&#039;article&quot;&gt;&lt;code&gt;syntaxe2&lt;/code&gt;&lt;/section&gt;&lt;article title=&quot;Corps de l&#039;article&quot;&gt;corps de l&#039;article2&lt;/article&gt;'),
(23, 1, 1, 1, '2013-03-14 13:47:01', 'Test large', '&lt;aside title=&quot;Description de l&#039;article&quot;&gt;description d&#039;un article avec un long texte de pr&Atilde;&copy;sentation pour tester son int&Atilde;&copy;gration dans la HomePage&lt;/aside&gt;&lt;section title=&quot;Syntaxe de l&#039;article&quot;&gt;&lt;code&gt;syntaxe&lt;/code&gt;&lt;/section&gt;&lt;article title=&quot;Corps de l&#039;article&quot;&gt;corps de l&#039;article&lt;/article&gt;');

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

INSERT INTO `categorie` (`idCategorie`, `idPortail`, `categorie`, `description`) VALUES
(1, 1, 'Javascript', 'Base de connaissance sur le Javascript'),
(3, 1, 'PHP', 'Base de connaissance sur le PHP'),
(5, 0, 'test', 'super'),
(6, 1, 'Java', 'Base de connaissance sur le Java'),
(7, 7, 'Moyen Age', 'Portail sur le Moyen Age');

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

INSERT INTO `commentaire` (`idCommentaire`, `idArticle`, `idUser`, `idType`, `date_creation`, `titre`, `commentaire`) VALUES
(1, 15, 1, 1, '2013-03-15 11:07:54', 'Commentaire test', 'Contenu test pour un commentaire'),
(2, 15, 1, 2, '2013-03-15 11:07:54', 'Super titre', 'Super commentaire pour un super article !');

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

INSERT INTO `favoris` (`idFavoris`, `idUser`, `idArticle`, `nbViews`, `isForced`) VALUES
(1, 1, 15, 195, 1),
(2, 1, 16, 78, 1),
(3, 1, 17, 30, 1),
(4, 1, 21, 8, 1),
(5, 1, 23, 7, 0),
(6, 1, 22, 2, 0);

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

INSERT INTO `motcle` (`idMotCle`, `idArticle`, `motcle`) VALUES
(127, 16, 'popup'),
(128, 16, 'javascript'),
(134, 21, 'titre'),
(143, 22, 'test'),
(144, 22, 'hop'),
(149, 15, 'javascript'),
(150, 15, 'test'),
(151, 23, 'truc'),
(152, 17, 'popup'),
(153, 17, 'test');

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

INSERT INTO `portail` (`idPortail`, `portail`) VALUES
(1, 'Informatique'),
(7, 'Histoire'),
(14, 'portail test');

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

INSERT INTO `type` (`idType`, `type`) VALUES
(1, 'Article'),
(2, 'Cours');

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

INSERT INTO `user` (`idUser`, `lstName`, `fstName`, `email`, `role`, `login`, `password`) VALUES
(1, 'Jacques', 'Jonathan', 'j.jacques2@free.fr', '11', 'jja', '202cb962ac59075b964b07152d234b70'),
(3, 'testnom', 'test', 'j.jacques@free.fr', '10', 'test', '202cb962ac59075b964b07152d234b70');
