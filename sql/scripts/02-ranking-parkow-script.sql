CREATE DATABASE  IF NOT EXISTS `park_ranking`;
USE `park_ranking`;

DROP TABLE IF EXISTS `distance`;
DROP TABLE IF EXISTS `park`;

CREATE TABLE `park` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name`varchar(100) DEFAULT NULL UNIQUE,
  `district` varchar(50) DEFAULT NULL,
  `rating` double DEFAULT 5,
  `latitude` double DEFAULT 52.2278197,
  `longitude` double DEFAULT 21.0028638,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

CREATE TABLE `distance` (
  `park_id` int NOT NULL,
  `dist` double DEFAULT 0,
  CONSTRAINT `FKparkId`
    FOREIGN KEY (`park_id`)
    REFERENCES `park` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    PRIMARY KEY (`park_id`)
    );
