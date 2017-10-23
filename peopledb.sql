

create database calldb;

create table `People`(
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255),
`callDate` varchar(30),
`relationship` varchar(30),
`birthday` varchar(30),
PRIMARY KEY (`id`)
)



  LOCK TABLES `people` WRITE;
  INSERT INTO `people` (id, name, callDate, relationship, birthday) VALUES
  (1,'Mom','10/15/2017', 'Parent', '02/24/1954'),
  (2,'Dad','10/18/2017', 'Parent', '06/22/1952'),
  (3,'Derick','10/10/2017', 'Friend', '01/10/1990'),
  (4,'Angelica','09/10/2017','Family', '02/12/1988');
  UNLOCK TABLES;

  
