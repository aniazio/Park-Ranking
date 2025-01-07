CREATE DATABASE  IF NOT EXISTS `park_ranking`;
USE `park_ranking`;


-- Drop user first if they exist
DROP USER if exists 'parkaccess'@'%' ;
DROP USER if exists 'parkaccess'@'localhost' ;

-- Now create user with prop privileges
CREATE USER 'parkaccess'@'%' IDENTIFIED BY 'parkpassword';
CREATE USER 'parkaccess'@'localhost' IDENTIFIED BY 'parkpassword';

DROP TABLE IF EXISTS `distance`;
DROP TABLE IF EXISTS `park`;
DROP TABLE IF EXISTS `feature`;

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

CREATE TABLE `feature` (
  `park_id` int NOT NULL,
  `id` int NOT NULL,
  `is_positive` boolean,
  `description` varchar(250),
  CONSTRAINT `FKparkId_feature`
    FOREIGN KEY (`park_id`)
    REFERENCES `park` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    PRIMARY KEY (`park_id`, `id`, `is_positive`)
    );

    GRANT ALL PRIVILEGES ON park_ranking.park TO 'parkaccess'@'%';
    GRANT ALL PRIVILEGES ON park_ranking.park TO 'parkaccess'@'localhost';
    GRANT ALL PRIVILEGES ON park_ranking.distance TO 'parkaccess'@'%';
    GRANT ALL PRIVILEGES ON park_ranking.distance TO 'parkaccess'@'localhost';
    GRANT ALL PRIVILEGES ON park_ranking.feature TO 'parkaccess'@'%';
    GRANT ALL PRIVILEGES ON park_ranking.feature TO 'parkaccess'@'localhost';