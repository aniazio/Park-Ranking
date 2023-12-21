-- Drop user first if they exist
DROP USER if exists 'parkaccess'@'%' ;

-- Now create user with prop privileges
CREATE USER 'parkaccess'@'%' IDENTIFIED BY 'parkpassword';

GRANT ALL PRIVILEGES ON park_ranking.park TO 'parkaccess'@'%';
GRANT ALL PRIVILEGES ON park_ranking.distance TO 'parkaccess'@'%';