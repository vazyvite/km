-- phpMyAdmin SQL Dump
-- version 3.3.9.1
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Sam 19 Janvier 2013 à 09:15
-- Version du serveur: 5.5.9
-- Version de PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de données: `km`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `idArticle` int(11) NOT NULL AUTO_INCREMENT,
  `idType` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idCategorie` int(11) NOT NULL,
  `dt_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `titre` varchar(150) NOT NULL,
  `article` text NOT NULL,
  PRIMARY KEY (`idArticle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `article`
--

INSERT INTO `article` (`idArticle`, `idType`, `idUser`, `idCategorie`, `dt_creation`, `titre`, `article`) VALUES
(3, 1, 1, 1, '2013-01-08 11:40:22', 'Exemple 1', 'Exemple d''article que l''on peut avoir'),
(4, 1, 1, 1, '2013-01-08 11:40:22', 'Exemple 2', 'Autre exemple d''article que l''on peut avoir');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE IF NOT EXISTS `categorie` (
  `idCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `idPortail` int(11) NOT NULL,
  `categorie` varchar(25) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `categorie`
--

INSERT INTO `categorie` (`idCategorie`, `idPortail`, `categorie`, `description`) VALUES
(1, 1, 'Javascript', 'Base de connaissance sur le Javascript'),
(2, 1, 'PHP', 'Base de connaissance sur le PHP');

-- --------------------------------------------------------

--
-- Structure de la table `motcle`
--

CREATE TABLE IF NOT EXISTS `motcle` (
  `idMotCle` int(11) NOT NULL AUTO_INCREMENT,
  `idArticle` int(11) NOT NULL,
  `motcle` varchar(25) NOT NULL,
  PRIMARY KEY (`idMotCle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `motcle`
--

INSERT INTO `motcle` (`idMotCle`, `idArticle`, `motcle`) VALUES
(1, 1, 'Exemple'),
(2, 1, 'Article'),
(3, 2, 'Exemple');

-- --------------------------------------------------------

--
-- Structure de la table `portail`
--

CREATE TABLE IF NOT EXISTS `portail` (
  `idPortail` int(11) NOT NULL AUTO_INCREMENT,
  `portail` varchar(25) NOT NULL,
  PRIMARY KEY (`idPortail`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `portail`
--

INSERT INTO `portail` (`idPortail`, `portail`) VALUES
(1, 'Informatique'),
(2, 'Cuisine');

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

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

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `lstName` varchar(25) NOT NULL,
  `fstName` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(3) NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`idUser`, `lstName`, `fstName`, `email`, `role`, `login`, `password`) VALUES
(1, 'Jacques', 'Jonathan', 'j.jacques2@free.fr', '11', 'jja', '202cb962ac59075b964b07152d234b70');
