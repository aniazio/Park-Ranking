-- Drop user first if they exist
DROP USER if exists 'parkaccess'@'%' ;
DROP USER if exists 'parkaccess'@'localhost' ;

-- Now create user with prop privileges
CREATE USER 'parkaccess'@'%' IDENTIFIED BY 'parkpassword';
CREATE USER 'parkaccess'@'localhost' IDENTIFIED BY 'parkpassword';

GRANT ALL PRIVILEGES ON park_ranking.park TO 'parkaccess'@'%';
GRANT ALL PRIVILEGES ON park_ranking.park TO 'parkaccess'@'localhost';
GRANT ALL PRIVILEGES ON park_ranking.distance TO 'parkaccess'@'%';
GRANT ALL PRIVILEGES ON park_ranking.distance TO 'parkaccess'@'localhost';