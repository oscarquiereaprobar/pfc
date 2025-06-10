CREATE DATABASE  IF NOT EXISTS `travelapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `travelapp`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: travelapp
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `itinerary`
--

DROP TABLE IF EXISTS `itinerary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerary` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'Sin nombre',
  `id_user` bigint(20) unsigned NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `itinerary_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary`
--

LOCK TABLES `itinerary` WRITE;
/*!40000 ALTER TABLE `itinerary` DISABLE KEYS */;
INSERT INTO `itinerary` VALUES (1,'Aventura en Francia',1,'2024-06-01','2024-06-10','img_1749498472729.jpg'),(2,'Vacaciones en Roma',1,'2024-07-05','2024-07-15','img_1749498490790.webp'),(3,'Descubre Berlín',1,'2024-08-10','2024-08-20','img_1749498519180.jpg'),(4,'Ruta por Madrid',1,'2024-09-01','2024-09-10','img_1749498571972.jpg'),(5,'Playas de Grecia',2,'2024-06-12','2024-06-22','default.png'),(6,'Montañas de Suiza',2,'2024-07-15','2024-07-25','default.png'),(7,'Safari en Kenia',2,'2024-08-18','2024-08-28','default.png'),(8,'Ciudades de Japón',2,'2024-09-10','2024-09-20','default.png'),(9,'Costa de Portugal',3,'2024-06-03','2024-06-13','default.png'),(10,'Fiordos Noruegos',3,'2024-07-08','2024-07-18','default.png'),(11,'Ruta Maya',3,'2024-08-12','2024-08-22','default.png'),(12,'Andalucía Tour',3,'2024-09-05','2024-09-15','default.png'),(13,'Islas Canarias',4,'2024-06-15','2024-06-25','img_1749498660719.jpg'),(14,'Selva Amazónica',4,'2024-07-20','2024-07-30','img_1749498688632.webp'),(15,'Patagonia',4,'2024-08-25','2024-09-04','img_1749498635980.jpg'),(16,'Ruta de la Seda',4,'2024-09-12','2024-09-22','default.png'),(17,'Australia Roadtrip',5,'2024-06-18','2024-06-28','default.png'),(18,'Nueva Zelanda',5,'2024-07-22','2024-08-01','default.png'),(19,'Sudeste Asiático',5,'2024-08-28','2024-09-07','default.png'),(20,'Canadá Aventura',5,'2024-09-15','2024-09-25','default.png');
/*!40000 ALTER TABLE `itinerary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_itinerary` bigint(20) unsigned NOT NULL,
  `id_user` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_itinerary` (`id_itinerary`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_itinerary`) REFERENCES `itinerary` (`id`) ON DELETE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (2,'¿Alguien recomienda restaurantes en París?','2024-05-26 10:00:00',1,3),(3,'Roma es preciosa en verano.','2024-06-30 07:30:00',2,1),(4,'No olvides visitar el Coliseo.','2024-07-01 12:00:00',2,4),(5,'Berlín tiene mucha historia.','2024-08-01 09:00:00',3,1),(6,'¿Museos recomendados?','2024-08-02 13:00:00',3,5),(7,'Madrid siempre sorprende.','2024-08-28 11:00:00',4,1),(8,'Toledo es una joya.','2024-08-29 14:00:00',4,2),(9,'Las playas de Grecia son increíbles.','2024-06-10 08:00:00',5,2),(10,'Santorini es mi favorita.','2024-06-11 09:00:00',5,3),(11,'Suiza es muy cara pero vale la pena.','2024-07-10 07:00:00',6,2),(12,'No olvides probar el chocolate.','2024-07-11 08:00:00',6,4),(13,'Safari en Kenia, experiencia única.','2024-08-15 06:00:00',7,2),(14,'Lleva prismáticos.','2024-08-16 07:00:00',7,5),(15,'Japón es otro mundo.','2024-09-05 05:00:00',8,2),(16,'Prueba el sushi en Tokio.','2024-09-06 06:00:00',8,1),(17,'Portugal tiene mucho encanto.','2024-06-01 08:00:00',9,3),(18,'No te pierdas el bacalao.','2024-06-02 09:00:00',9,4),(19,'Fiordos espectaculares.','2024-07-05 07:00:00',10,3),(20,'Lleva ropa de abrigo.','2024-07-06 08:00:00',10,5),(21,'Ruta Maya, cultura y aventura.','2024-08-10 06:00:00',11,3),(22,'Tulum es mágico.','2024-08-11 07:00:00',11,1),(23,'Andalucía, tierra de arte.','2024-09-01 05:00:00',12,3),(24,'Granada y su Alhambra.','2024-09-02 06:00:00',12,2),(25,'Canarias, clima perfecto.','2024-06-13 08:00:00',13,4),(26,'Prueba las papas arrugadas.','2024-06-14 09:00:00',13,5),(27,'Aventura en la selva.','2024-07-18 07:00:00',14,4),(28,'Mosquitos everywhere.','2024-07-19 08:00:00',14,1),(29,'Patagonia, naturaleza salvaje.','2024-08-23 06:00:00',15,4),(30,'Lleva buen abrigo.','2024-08-24 07:00:00',15,2),(31,'Ruta de la Seda, historia viva.','2024-09-10 05:00:00',16,4),(32,'Samarkanda es impresionante.','2024-09-11 06:00:00',16,3),(33,'Australia, roadtrip inolvidable.','2024-06-16 08:00:00',17,5),(34,'Canguros everywhere.','2024-06-17 09:00:00',17,1),(35,'Nueva Zelanda, paisajes de película.','2024-07-20 07:00:00',18,5),(36,'No te pierdas Hobbiton.','2024-07-21 08:00:00',18,2),(37,'Sudeste Asiático, cultura y comida.','2024-08-26 06:00:00',19,5),(38,'Bangkok es caótica y fascinante.','2024-08-27 07:00:00',19,3),(39,'Canadá, naturaleza y ciudades.','2024-09-13 05:00:00',20,5),(40,'Vancouver es preciosa.','2024-09-14 06:00:00',20,4);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport`
--

DROP TABLE IF EXISTS `transport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport`
--

LOCK TABLES `transport` WRITE;
/*!40000 ALTER TABLE `transport` DISABLE KEYS */;
INSERT INTO `transport` VALUES (1,'Avión'),(2,'Tren'),(3,'Coche'),(4,'Barco');
/*!40000 ALTER TABLE `transport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_itinerary` bigint(20) unsigned NOT NULL,
  `id_transport` bigint(20) unsigned DEFAULT NULL,
  `origin_country` varchar(100) NOT NULL,
  `origin_city` varchar(100) NOT NULL,
  `destination_country` varchar(100) NOT NULL,
  `destination_city` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `finish_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_itinerary` (`id_itinerary`),
  KEY `id_transport` (`id_transport`),
  CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`id_itinerary`) REFERENCES `itinerary` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trip_ibfk_2` FOREIGN KEY (`id_transport`) REFERENCES `transport` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (1,1,1,'España','Madrid','Francia','París','2024-06-01','2024-06-03'),(2,1,2,'Francia','París','Francia','Versalles','2024-06-04','2024-06-06'),(3,1,3,'Francia','Versalles','Francia','Lyon','2024-06-07','2024-06-10'),(4,2,1,'España','Barcelona','Italia','Roma','2024-07-05','2024-07-07'),(5,2,2,'Italia','Roma','Italia','Florencia','2024-07-08','2024-07-11'),(6,2,3,'Italia','Florencia','Italia','Venecia','2024-07-12','2024-07-15'),(7,3,1,'Alemania','Berlín','Alemania','Hamburgo','2024-08-10','2024-08-13'),(8,3,2,'Alemania','Hamburgo','Alemania','Múnich','2024-08-14','2024-08-17'),(9,3,3,'Alemania','Múnich','Alemania','Berlín','2024-08-18','2024-08-20'),(10,4,2,'España','Madrid','España','Toledo','2024-09-01','2024-09-03'),(11,4,3,'España','Toledo','España','Segovia','2024-09-04','2024-09-07'),(12,4,1,'España','Segovia','España','Madrid','2024-09-08','2024-09-10'),(13,5,1,'Grecia','Atenas','Grecia','Santorini','2024-06-12','2024-06-15'),(14,5,2,'Grecia','Santorini','Grecia','Mykonos','2024-06-16','2024-06-19'),(15,5,3,'Grecia','Mykonos','Grecia','Atenas','2024-06-20','2024-06-22'),(16,6,4,'Suiza','Zúrich','Suiza','Lucerna','2024-07-15','2024-07-18'),(17,6,2,'Suiza','Lucerna','Suiza','Interlaken','2024-07-19','2024-07-22'),(18,6,3,'Suiza','Interlaken','Suiza','Zermatt','2024-07-23','2024-07-25'),(19,7,1,'Kenia','Nairobi','Kenia','Masai Mara','2024-08-18','2024-08-22'),(20,7,2,'Kenia','Masai Mara','Kenia','Mombasa','2024-08-23','2024-08-26'),(21,7,3,'Kenia','Mombasa','Kenia','Nairobi','2024-08-27','2024-08-28'),(22,8,1,'Japón','Tokio','Japón','Kioto','2024-09-10','2024-09-13'),(23,8,2,'Japón','Kioto','Japón','Osaka','2024-09-14','2024-09-17'),(24,8,3,'Japón','Osaka','Japón','Tokio','2024-09-18','2024-09-20'),(25,9,1,'Portugal','Lisboa','Portugal','Oporto','2024-06-03','2024-06-06'),(26,9,2,'Portugal','Oporto','Portugal','Faro','2024-06-07','2024-06-10'),(27,9,3,'Portugal','Faro','Portugal','Lisboa','2024-06-11','2024-06-13'),(28,10,4,'Noruega','Bergen','Noruega','Oslo','2024-07-08','2024-07-11'),(29,10,2,'Noruega','Oslo','Noruega','Trondheim','2024-07-12','2024-07-15'),(30,10,3,'Noruega','Trondheim','Noruega','Bergen','2024-07-16','2024-07-18'),(31,11,1,'México','Cancún','México','Tulum','2024-08-12','2024-08-15'),(32,11,2,'México','Tulum','México','Chichén Itzá','2024-08-16','2024-08-19'),(33,11,3,'México','Chichén Itzá','México','Cancún','2024-08-20','2024-08-22'),(34,12,1,'España','Sevilla','España','Granada','2024-09-05','2024-09-08'),(35,12,2,'España','Granada','España','Córdoba','2024-09-09','2024-09-12'),(36,12,3,'España','Córdoba','España','Sevilla','2024-09-13','2024-09-15'),(37,13,1,'España','Tenerife','España','Gran Canaria','2024-06-15','2024-06-18'),(38,13,2,'España','Gran Canaria','España','Lanzarote','2024-06-19','2024-06-22'),(39,13,3,'España','Lanzarote','España','Tenerife','2024-06-23','2024-06-25'),(40,14,1,'Brasil','Manaos','Brasil','Leticia','2024-07-20','2024-07-23'),(41,14,2,'Brasil','Leticia','Brasil','Iquitos','2024-07-24','2024-07-27'),(42,14,3,'Brasil','Iquitos','Brasil','Manaos','2024-07-28','2024-07-30'),(43,15,1,'Argentina','El Calafate','Argentina','Ushuaia','2024-08-25','2024-08-28'),(44,15,2,'Argentina','Ushuaia','Argentina','Bariloche','2024-08-29','2024-09-01'),(45,15,3,'Argentina','Bariloche','Argentina','El Calafate','2024-09-02','2024-09-04'),(46,16,1,'China','Xi\'an','Uzbekistán','Samarkanda','2024-09-12','2024-09-15'),(47,16,2,'Uzbekistán','Samarkanda','Turquía','Estambul','2024-09-16','2024-09-19'),(48,16,3,'Turquía','Estambul','China','Xi\'an','2024-09-20','2024-09-22'),(49,17,1,'Australia','Sídney','Australia','Melbourne','2024-06-18','2024-06-21'),(50,17,2,'Australia','Melbourne','Australia','Adelaida','2024-06-22','2024-06-25'),(51,17,3,'Australia','Adelaida','Australia','Sídney','2024-06-26','2024-06-28'),(52,18,1,'Nueva Zelanda','Auckland','Nueva Zelanda','Wellington','2024-07-22','2024-07-25'),(53,18,2,'Nueva Zelanda','Wellington','Nueva Zelanda','Queenstown','2024-07-26','2024-07-29'),(54,18,3,'Nueva Zelanda','Queenstown','Nueva Zelanda','Auckland','2024-07-30','2024-08-01'),(55,19,1,'Tailandia','Bangkok','Vietnam','Hanoi','2024-08-28','2024-08-31'),(56,19,2,'Vietnam','Hanoi','Camboya','Phnom Penh','2024-09-01','2024-09-04'),(57,19,3,'Camboya','Phnom Penh','Tailandia','Bangkok','2024-09-05','2024-09-07'),(58,20,1,'Canadá','Toronto','Canadá','Montreal','2024-09-15','2024-09-18'),(59,20,2,'Canadá','Montreal','Canadá','Vancouver','2024-09-19','2024-09-22'),(60,20,3,'Canadá','Vancouver','Canadá','Toronto','2024-09-23','2024-09-25');
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user','$2a$10$WCuC8TuihQ2nuyyEHDNgaeZliOsToISdnjpCJgM6ImK1V/uh1TvQS','oscar','garcia',0),(2,'desiredoue','$2a$10$IUEYr/UO9ExE.4rNIWQIJO.4YZDJBfZMFKw7KEMjF8AKccpkSWFZG','desire','doue',0),(3,'perro','$2a$10$vI74tUSQrspwrt63Xhyllu1JK6xrHepatq.Hhl9wDAOPwAjjsdrN.','perro','sanch',0),(4,'cr7','$2a$10$5iQWdSe/dSTLJWEVPVgP6.RwUQemOCUQvtPSKtkVnnILGDPI8oHU.','cristiano','ronaldo',0),(5,'elnano33','$2a$10$qUmad7b0X7DuHpA8DCI2ieN5eltSv41BKEZtCdUHDJizcV3ZvtbYq','fernando','alonso',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-10 16:28:23
