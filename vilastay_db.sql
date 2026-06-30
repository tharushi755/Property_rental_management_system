-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: vilastay_db
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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `cleaning_fee` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `guests` int(11) NOT NULL,
  `nights` int(11) NOT NULL,
  `service_fee` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `subtotal` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `property_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj94ktyvmw1driaufktolkpj1c` (`property_id`),
  KEY `FKeyog2oic85xg7hsu2je2lx3s6` (`user_id`),
  CONSTRAINT `FKeyog2oic85xg7hsu2je2lx3s6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKj94ktyvmw1driaufktolkpj1c` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2026-06-13','2026-06-19',40,'2026-06-13 00:42:50.000000',2,6,25,'CONFIRMED',2520,2585,589,7),(2,'2026-06-13','2026-06-19',40,'2026-06-13 00:43:46.000000',1,6,25,'CONFIRMED',1380,1445,607,7),(3,'2026-06-13','2026-06-19',40,'2026-06-13 01:30:15.000000',2,6,25,'CANCELLED',1170,1235,605,11),(4,'2026-06-12','2026-06-13',40,'2026-06-13 01:39:15.000000',3,1,25,'CONFIRMED',420,485,589,6),(5,'2026-06-19','2026-06-25',40,'2026-06-13 01:49:04.000000',5,6,25,'CONFIRMED',1920,1985,591,11);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amenities` varchar(255) DEFAULT NULL,
  `baths` int(11) NOT NULL,
  `beds` int(11) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `featured` bit(1) NOT NULL,
  `guests` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `rating` double NOT NULL,
  `reviews` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK32k2h9s30s0ukftb8hj947ef2` (`owner_id`),
  CONSTRAINT `FK32k2h9s30s0ukftb8hj947ef2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=613 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (588,'Outdoor swimming pool, Free WiFi, Airport shuttle, Free parking, Restaurant , Room service, Tea/coffee maker in all rooms, Bar,  Good breakfast',1,1,'2026-06-13 00:34:38.000000','Suisse is housed in a colonial building, across Kandy Lake. Offering rooms with views of the tropical garden or Kandy Lake, it has a spa, a restaurant and free parking.',_binary '\0',2,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/701829228.jpg?k=4e391a56dfbebce81ee15758f8ae847746296cf08e01de65ee87fd2cfb92483b&o=','Kandy',25000,4.666666666666667,3,'APPROVED','Hotel Suisse Kandy','Hotel','2026-06-30 16:18:34.000000',3),(589,'Beach access, Pool, Restaurant, WiFi',2,2,'2026-06-13 00:34:38.000000','Beautiful beachfront bungalow with private beach access.',_binary '\0',4,'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&h=250&fit=crop','Kandy',420,4.8,112,'APPROVED','Beachfront Bungalow','Bungalow','2026-06-13 00:34:38.000000',3),(590,'Beachfront, Free WiFi ,Family rooms, Free parking, Non-smoking rooms, Private beach area ,Breakfast',3,4,'2026-06-13 00:34:38.000000','Located in Hikkaduwa, near Seenigama Beach and Seenigama Temple, Refuge Boutique Villa is a recently renovated property, featuring, a private beach area and garden.',_binary '\0',8,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/863304954.jpg?k=7818e8a071f99c7f3ef4612466e6082e8bd8614266a48083f763ff8b4da2431a&o=','Galle,Hikkaduwa',450,4.8,91,'APPROVED','Refuge Boutique Villa','Cabana','2026-06-30 00:47:29.000000',3),(591,'beach view, Fireplace, Parking, WiFi',2,3,'2026-06-13 00:34:38.000000','Set in Galle, 300 metres from Galle International Cricket Stadium, Le Grand Galle has a number of amenities including an outdoor swimming pool, a fitness centre, a garden and free WiFi.\n\n',_binary '\0',6,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/174997700.jpg?k=d14a49e71bbeff56a57429affe6eb1aa128053b6cb68c786d9ec6af48bdc3e03&o=','Galle',320,5,1,'APPROVED',' Le Grand Galle','Hotel','2026-06-30 00:22:29.000000',3),(592,'Outdoor swimming pool, Free WiFi , Free parking , Airport shuttle, Non-smoking rooms , Facilities for disabled guests, Room service, Bar, Breakfast',1,2,'2026-06-13 00:34:38.000000','Featuring air-conditioned accommodation with a private pool, garden view and a patio, Medusa Bungalow is located in Galle.',_binary '\0',4,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/510752477.jpg?k=27b7b00b3d7d7966900aa1cbd5e9b296743ca27d42db5e495f80d0e5c72fac8f&o=','Galle',250,4.6,98,'APPROVED','Medusa Bungalow','Villa','2026-06-29 23:05:23.000000',3),(593,'Jungle view, Plunge pool, Breakfast, Spa access,pa and wellness centre ,Restaurant ,Room service, Bar ,Private beach area',1,1,'2026-06-13 00:34:38.000000','Situated in Trincomalee, a few steps from Nilaveli Beach, That\'s Why Nilaveli Beach Cabanas features accommodation with free bikes, free private parking, a garden and a private beach area.',_binary '\0',2,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/888088451.jpg?k=444ce3aae16171448249a5fdee72efb4e8e000357d7bb4fa3915261a98b1e70a&o=','Trincomalee',185,4.7,203,'APPROVED','That\'s Why Nilaveli Beach Cabanas','Cabana','2026-06-30 01:25:51.000000',3),(594,'Beachfront, Free WiFi ,Free parking ,Room service ,Private beach area ,Breakfast',2,2,'2026-06-13 00:34:38.000000','Situated in Trincomalee, a few steps from Dutch Bay Beach, Dutch Bay Villa - Trincomalee features accommodation with a garden, free private parking, a private beach area and a terrace.',_binary '\0',3,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/870811859.jpg?k=6ada689e9088f167d0fcb281afc41baf2109204fe8851e6d61f630da3e42f7fc&o=','Trincomalee',150,4.6,178,'APPROVED','Dutch Bay Villa','Villa','2026-06-30 01:44:04.000000',3),(595,'Free WiFi, Family rooms, Free parking, Restaurant ,Room service ,Non-smoking rooms ,Breakfast',2,3,'2026-06-13 00:34:38.000000','Situated in Trincomalee, 60 metres from Sampalthivu Beach, Regina Beach Bungalow features accommodation with a garden, free private parking, a terrace and a restaurant.',_binary '\0',5,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/335953107.jpg?k=c4685cc33e2cdc5299086c830131075e3073f8058f11b0ace11bf3aab36f7279&o=','Trincomalee',220,4.8,145,'APPROVED','Regina Beach Bungalow','Bungalow','2026-06-30 01:51:52.000000',3),(597,'Outdoor swimming pool, AC, Free WiFi, Beachfront, Elevator,Bar,2 restaurant, Room service',1,4,'2026-06-13 00:34:38.000000','Featuring air-conditioned accommodation with a private pool, pool view, and a patio, Galle Beach Front Duplex 4 Bed Amazing Sea Views is set in Galle.',_binary '\0',8,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/644228646.jpg?k=e755f7b31f66a1ba277d429fac7e02943c4ffdc7aac55d75a4edddb0f3681243&o=','Galle',120,4.5,234,'APPROVED','HDC Apartments','Apartment','2026-06-29 23:24:57.000000',3),(601,'Mountain view, Hot tub, Game room, WiFi',4,5,'2026-06-13 00:34:38.000000','Luxury lodge with stunning mountain views and private hot tub.',_binary '\0',10,'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop','Nuwara Eliya',520,4.9,203,'APPROVED','Aspen Mountain Lodge','Lodge','2026-06-13 00:34:38.000000',3),(602,'Fireplace, Hot tub, Ski storage, Parking',2,3,'2026-06-13 00:34:38.000000','Cozy cabin near Breckenridge ski resort.',_binary '\0',6,'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop','Nuwara Eliya',380,4.7,189,'APPROVED','Breckenridge Ski Cabin','Cabin','2026-06-13 00:34:38.000000',3),(603,'Free WiFi ,Family rooms ,Free parking ,Spa and wellness centre ,Non-smoking rooms, Room service, Bar ,24-hour front desk ,Tea/coffee maker in all rooms,  Very good breakfast',3,4,'2026-06-13 00:34:38.000000','Situated in Nuwara Eliya, 1.8 km from Gregory Lake, The Bellwood Manor features accommodation with a garden, free private parking, a terrace and a bar.',_binary '\0',8,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/445051770.jpg?k=a497fdfb5b6ad0211abd31a380729b78e4e11c3ba59330f33a525a86bebe60f2&o=','Nuwara Eliya',450,4.8,156,'APPROVED','The Bellwood Manor','Bungalow','2026-06-30 02:44:51.000000',3),(604,'Mountain view, Pool, Gym, WiFi',2,2,'2026-06-13 00:34:38.000000','Modern condo with mountain views.',_binary '\0',4,'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop','Nuwara Eliya',290,4.6,112,'APPROVED','Telluride Condo','Condo','2026-06-13 00:34:38.000000',3),(605,'Outdoor swimming pool ,Airport shuttle ,Free WiFi, Family rooms, Restaurant ,24-hour front desk , Free parking, Non-smoking rooms, Tea/coffee maker in all rooms , Fabulous breakfast',2,3,'2026-06-13 00:34:38.000000','Set in Negombo, less than 1 km from Wellaweediya Beach, Belmont Boutique Hotel Negombo- Free Airport Shuttle Service offers accommodation with an outdoor swimming pool, free private parking and a garden',_binary '\0',5,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/286302393.jpg?k=e1a1cfa273714834e27a18dc2260ddb50754e666a1c6daabf989f92fcc6b8c62&o=','Negombo ,Kibulapitiya',195,4.7,312,'APPROVED','Swanee Grand','Hotel','2026-06-30 02:32:16.000000',3),(606,'Outdoor swimming pool, Free WiFi ,Beachfront ,Free parking ,Non-smoking rooms ,Room service ,Air conditioning, Garden, Breakfast',2,2,'2026-06-13 00:34:38.000000','Facing the seafront in Negombo, Jetwing Thalahena Villa is a villa, featuring an outdoor pool and private parking.',_binary '\0',4,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/51909806.jpg?k=287306821691b07bb4cd144f6631d11cf4b69d1cae9abb22d4fcdde030fdef0f&o=','Negombo ',165,4.6,245,'APPROVED','Jetwing Thalahena Villa','Villa','2026-06-30 02:36:12.000000',3),(607,'Free WiFi, Family rooms, 24-hour front desk, Free parking ,Non-smoking rooms, Air conditioning',2,3,'2026-06-13 00:34:38.000000','Situated in Negombo, Lotus Luxury Residencies provides accommodation with seating area. This apartment features free private parking, a 24-hour front desk and free WiFi.',_binary '\0',6,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/813648706.jpg?k=1cdd2cde01dacb8763209d6abda7c43885040b7f2f1e89157b8dcaa54439e8f4&o=','Negombo ',230,4.8,167,'APPROVED','Lotus Luxury Residencies','Apartment','2026-06-30 02:38:45.000000',3),(609,'Outdoor swimming pool, Airport shuttle, Non-smoking rooms, Spa and wellness centre, Fitness centre, Room service ,Facilities for disabled guests, Tea/coffee maker in all rooms, Bar ,Superb breakfast',2,2,'2026-06-13 01:45:38.000000','Situated in Colombo, a few steps from Bambalapitiya Beach, Marino Beach Colombo features accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden.',_binary '\0',4,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/156672332.jpg?k=b4f3d04cbc8b0c80193f63046e63e576ba1a50fc9f48289aa152f10a026aab4d&o=','Colombo',100,0,0,'APPROVED','Marino Beach Colombo','Hotel','2026-06-30 13:32:43.000000',3),(610,'Free Wi-Fi,Pool,Gym,Facilities for disabled guests, Room service,Tea/coffee maker in all rooms ,Bar, Breakfast,Airport shuttle',2,3,'2026-06-29 20:44:18.000000','Situated in Gampaha, 26 km from St Anthony\'s Church, The Covanro Airport Hotel - Katunayake features accommodation with an outdoor swimming pool, free private parking, a garden and a shared lounge.',_binary '\0',6,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/351246493.jpg?k=31c2cedbe69ffb41853c9557754690814cbd56ff92d80c1a73a0e8b62d99a62c&o=','Gampaha,Katunayake',100,0,0,'APPROVED','The Covanro Airport Hotel','Hotel','2026-06-30 01:20:52.000000',6),(611,'Outdoor swimming pool, Free WiFi ,Beachfront ,Spa and wellness centre, Family rooms Free parking Tea/coffee maker in all rooms Bar Private beach area  Good breakfast',2,2,'2026-06-30 00:39:16.000000','Located in the historic fort city of Galle on the southern coast of Sri Lanka, Radisson Blu Resort, Galle is a luxury beachfront resort. Your ultimate beach holiday starts here.',_binary '\0',4,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/737144191.jpg?k=551974bee1cf35766b922036cc6d2f98707a5cdfca1622ad2bfd4ab605b4a57d&o=','Galle',100,0,0,'APPROVED','Radisson Blu Resort Galle','Hotel','2026-06-30 01:17:50.000000',3),(612,'Free parking, Free WiFi, Family rooms ,Tea/coffee maker in all rooms ,Bar',2,2,'2026-06-30 15:56:23.000000','Conveniently located in the centre of Anuradhapura, Lolu Village Resort offers air-conditioned rooms, an outdoor swimming pool, free WiFi and a garden. This 3-star hotel offers room service.',_binary '\0',4,'https://cf.bstatic.com/xdata/images/hotel/max1024x768/425743624.jpg?k=560445faa7525801266aa983defe9b65060ef47b2f1aeee627e24093d0f4820b&o=','Anuradhapura',100,0,0,'APPROVED','Lolu Village Resort','Villa','2026-06-30 15:56:30.000000',3);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `property_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK83j25x4ukm1vhf1336h1tt882` (`property_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FK83j25x4ukm1vhf1336h1tt882` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'this is good\n','2026-06-13 01:32:00.000000',5,588,6),(2,'this is very good','2026-06-13 01:47:37.000000',5,591,11),(3,'best','2026-06-30 16:18:14.000000',5,588,6),(4,'nice place','2026-06-30 16:18:34.000000',4,588,6);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,_binary '','2026-06-12 16:44:32.000000','owner@example.com','Sarah Owner','$2a$10$NkM3FqXZQKZQKZQKZQKZQKZQKZQKZQKZQKZQK','OWNER','+1 555 987 6543','2026-06-12 16:44:32.000000'),(4,_binary '','2026-06-12 22:32:03.000000','test@example.com','Test User','$2a$10$1qk/L6LpljAOp2hDoBbMcuN.W3k4c7Sp1otj/lWYXDP1gZYW3fS6K','GUEST','+1 555 123 4567','2026-06-12 22:32:03.000000'),(5,_binary '\0','2026-06-12 23:26:29.000000','admin@vilastay.com','Super Admin','$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG','GUEST','+1 234 567 8900','2026-06-13 01:44:39.000000'),(6,_binary '','2026-06-12 23:29:09.000000','newadmin@vilastay.com','New Admin','$2a$10$R28WvwMCw23vhkHd6sdhuuW1GlXZ0q2nHXysj.7kXcqIEbdqixcvC','ADMIN','+1 234 567 8900','2026-06-12 23:29:09.000000'),(7,_binary '','2026-06-13 00:30:46.000000','testuser@gmail.com','test user','$2a$10$bFRzjDHdNyK4nMDhr6yLq.oBYDCCjekdKBII0ldCz1AfLquGRMqq6','GUEST','0123456789','2026-06-13 00:30:46.000000'),(8,_binary '','2026-06-13 00:34:35.000000','guest@example.com','John Guest','$2a$10$Oct57zyQJsB10R5ecPcGZ.8Lh7LDELqG9Dd/DUippCoBnMj5n1q1O','GUEST','+1 555 123 4567','2026-06-13 00:34:35.000000'),(10,_binary '','2026-06-13 01:03:12.000000','ownertest@example.com','ownertest','$2a$10$BThp.z5Jxshc34hT7bQ.4uTH/0FSiDOdrfBYNpEovgf5xrhl0f5/S','OWNER','','2026-06-13 01:03:12.000000'),(11,_binary '','2026-06-13 01:06:58.000000','tharinduroshana28@gmail.com','T REX bro','$2a$10$ec5kn0Tzil5mg.Kk9OcIweH81EfqMpiqLgsXezEbEXl6cr5zXIF/u','GUEST','','2026-06-13 01:06:58.000000');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-30 20:26:07
