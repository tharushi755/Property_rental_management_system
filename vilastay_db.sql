-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2026 at 05:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vilastay_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) NOT NULL,
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
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `check_in`, `check_out`, `cleaning_fee`, `created_at`, `guests`, `nights`, `service_fee`, `status`, `subtotal`, `total_price`, `property_id`, `user_id`) VALUES
(1, '2026-06-13', '2026-06-19', 40, '2026-06-13 00:42:50.000000', 2, 6, 25, 'CONFIRMED', 2520, 2585, 589, 7),
(2, '2026-06-13', '2026-06-19', 40, '2026-06-13 00:43:46.000000', 1, 6, 25, 'CONFIRMED', 1380, 1445, 607, 7),
(3, '2026-06-13', '2026-06-19', 40, '2026-06-13 01:30:15.000000', 2, 6, 25, 'CANCELLED', 1170, 1235, 605, 11),
(4, '2026-06-12', '2026-06-13', 40, '2026-06-13 01:39:15.000000', 3, 1, 25, 'CONFIRMED', 420, 485, 589, 6),
(5, '2026-06-19', '2026-06-25', 40, '2026-06-13 01:49:04.000000', 5, 6, 25, 'CONFIRMED', 1920, 1985, 591, 11);

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) NOT NULL,
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
  `owner_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `amenities`, `baths`, `beds`, `created_at`, `description`, `featured`, `guests`, `image_url`, `location`, `price`, `rating`, `reviews`, `status`, `title`, `type`, `updated_at`, `owner_id`) VALUES
(586, 'Private pool, Sea view, Fast WiFi, Parking, Full kitchen, Air conditioning', 2, 3, '2026-06-13 00:34:38.000000', 'Perched dramatically on the caldera cliff, this iconic whitewashed villa offers breathtaking views of the Aegean Sea.', b'0', 6, 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop', 'Santorini, Greece', 320, 4.9, 128, 'APPROVED', 'Santorini Cliffside Villa', 'Villa', '2026-06-13 00:34:38.000000', 3),
(587, 'Sea view, Hot tub, Breakfast included, WiFi', 2, 2, '2026-06-13 00:34:38.000000', 'Beautiful suite with stunning sunset views over the caldera.', b'0', 4, 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=250&fit=crop', 'Santorini, Greece', 280, 4.7, 89, 'APPROVED', 'Caldera View Suite', 'Suite', '2026-06-13 00:34:38.000000', 3),
(588, 'Ocean deck, Snorkeling, Welcome drink, Outdoor bath', 1, 1, '2026-06-13 00:34:38.000000', 'Step directly from your private deck into crystal-clear lagoon.', b'0', 2, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=250&fit=crop', 'Maldives', 580, 5, 1, 'APPROVED', 'Maldives Overwater Cabana', 'Cabana', '2026-06-13 01:32:00.000000', 3),
(589, 'Beach access, Pool, Restaurant, WiFi', 2, 2, '2026-06-13 00:34:38.000000', 'Beautiful beachfront bungalow with private beach access.', b'0', 4, 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=400&h=250&fit=crop', 'Maldives', 420, 4.8, 112, 'APPROVED', 'Beachfront Bungalow', 'Bungalow', '2026-06-13 00:34:38.000000', 3),
(590, 'Ski-in/out, Fireplace, Private sauna, Wine cellar', 3, 4, '2026-06-13 00:34:38.000000', 'A masterpiece of alpine architecture nestled amid snow-dusted peaks.', b'0', 8, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop', 'Swiss Alps', 450, 4.8, 91, 'APPROVED', 'Swiss Alps Luxury Chalet', 'Chalet', '2026-06-13 00:34:38.000000', 3),
(591, 'Mountain view, Fireplace, Parking, WiFi', 2, 3, '2026-06-13 00:34:38.000000', 'Cozy lodge with stunning mountain views and fireplace.', b'0', 6, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop', 'Swiss Alps', 320, 5, 1, 'APPROVED', 'Mountain View Lodge', 'Lodge', '2026-06-13 01:47:37.000000', 3),
(592, 'Hiking trails, Fire pit, Kitchen, WiFi', 1, 2, '2026-06-13 00:34:38.000000', 'Rustic cabin perfect for couples seeking mountain adventure.', b'0', 4, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', 'Swiss Alps', 250, 4.6, 98, 'APPROVED', 'Alpine Retreat Cabin', 'Cabin', '2026-06-13 00:34:38.000000', 3),
(593, 'Jungle view, Plunge pool, Breakfast, Spa access', 2, 2, '2026-06-13 00:34:38.000000', 'Immerse yourself in Bali\'s lush rainforest canopy.', b'0', 4, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop', 'Bali', 185, 4.7, 203, 'APPROVED', 'Bali Jungle Retreat', 'Villa', '2026-06-13 00:34:38.000000', 3),
(594, 'Rice terrace view, Pool, Yoga deck, Breakfast', 2, 2, '2026-06-13 00:34:38.000000', 'Stunning villa overlooking beautiful rice terraces.', b'0', 3, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=250&fit=crop', 'Bali', 150, 4.6, 178, 'APPROVED', 'Ubud Rice Terrace Villa', 'Villa', '2026-06-13 00:34:38.000000', 3),
(595, 'Beachfront, Private pool, Staff, WiFi', 2, 3, '2026-06-13 00:34:38.000000', 'Luxury beachfront villa with private pool and staff.', b'0', 5, 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=250&fit=crop', 'Bali', 220, 4.8, 145, 'APPROVED', 'Beachfront Villa Seminyak', 'Villa', '2026-06-13 00:34:38.000000', 3),
(596, 'City view, Rooftop café, WiFi, Fitness centre', 1, 1, '2026-06-13 00:34:38.000000', 'Located in the heart of Barcelona\'s historic Gothic Quarter.', b'0', 2, 'https://images.unsplash.com/photo-1564501049412-61c2a30805a1?w=400&h=250&fit=crop', 'Barcelona', 140, 4.6, 312, 'APPROVED', 'Barcelona Boutique Hotel', 'Hotel', '2026-06-13 00:34:38.000000', 3),
(597, 'City view, AC, WiFi, Elevator', 1, 2, '2026-06-13 00:34:38.000000', 'Modern apartment near Sagrada Familia.', b'0', 4, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop', 'Barcelona', 120, 4.5, 234, 'APPROVED', 'Gaudi Apartment', 'Apartment', '2026-06-13 00:34:38.000000', 3),
(598, 'Lake view, Private dock, Fireplace, Hot tub', 2, 3, '2026-06-13 00:34:38.000000', 'Stunning lakefront cabin with private dock and mountain views.', b'0', 6, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', 'Lake Tahoe, California', 320, 4.8, 178, 'APPROVED', 'Lake Tahoe Luxury Cabin', 'Cabin', '2026-06-13 00:34:38.000000', 3),
(599, 'Ski-in/out, Fireplace, Hot tub, Parking', 3, 4, '2026-06-13 00:34:38.000000', 'Perfect ski-in/ski-out chalet near Heavenly resort.', b'0', 8, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop', 'Lake Tahoe, California', 280, 4.7, 134, 'APPROVED', 'Ski Chalet at Heavenly', 'Chalet', '2026-06-13 00:34:38.000000', 3),
(600, 'Lake view, Fireplace, Kitchen, WiFi', 1, 2, '2026-06-13 00:34:38.000000', 'Cozy cottage with stunning lake views.', b'0', 4, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop', 'Lake Tahoe, California', 190, 4.6, 98, 'APPROVED', 'Lakeview Cottage', 'Cottage', '2026-06-13 00:34:38.000000', 3),
(601, 'Mountain view, Hot tub, Game room, WiFi', 4, 5, '2026-06-13 00:34:38.000000', 'Luxury lodge with stunning mountain views and private hot tub.', b'0', 10, 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop', 'Colorado Rockies', 520, 4.9, 203, 'APPROVED', 'Aspen Mountain Lodge', 'Lodge', '2026-06-13 00:34:38.000000', 3),
(602, 'Fireplace, Hot tub, Ski storage, Parking', 2, 3, '2026-06-13 00:34:38.000000', 'Cozy cabin near Breckenridge ski resort.', b'0', 6, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop', 'Colorado Rockies', 380, 4.7, 189, 'APPROVED', 'Breckenridge Ski Cabin', 'Cabin', '2026-06-13 00:34:38.000000', 3),
(603, 'Ski-in/out, Sauna, Fireplace, WiFi', 3, 4, '2026-06-13 00:34:38.000000', 'Stunning chalet in the heart of Vail.', b'0', 8, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop', 'Colorado Rockies', 450, 4.8, 156, 'APPROVED', 'Vail Mountain Retreat', 'Chalet', '2026-06-13 00:34:38.000000', 3),
(604, 'Mountain view, Pool, Gym, WiFi', 2, 2, '2026-06-13 00:34:38.000000', 'Modern condo with mountain views.', b'0', 4, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop', 'Colorado Rockies', 290, 4.6, 112, 'APPROVED', 'Telluride Condo', 'Condo', '2026-06-13 00:34:38.000000', 3),
(605, 'Mountain view, Hot tub, Fireplace, Pool table', 2, 3, '2026-06-13 00:34:38.000000', 'Secluded cabin with panoramic mountain views and private hot tub.', b'0', 5, 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=250&fit=crop', 'Great Smoky Mountains', 195, 4.7, 312, 'APPROVED', 'Smoky Mountain Retreat', 'Cabin', '2026-06-13 00:34:38.000000', 3),
(606, 'Fireplace, Deck, Kitchen, WiFi', 2, 2, '2026-06-13 00:34:38.000000', 'Cozy log cabin with fireplace and private deck.', b'0', 4, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=250&fit=crop', 'Great Smoky Mountains', 165, 4.6, 245, 'APPROVED', 'Gatlinburg Log Cabin', 'Cabin', '2026-06-13 00:34:38.000000', 3),
(607, 'Mountain view, Fire pit, Game room, WiFi', 2, 3, '2026-06-13 00:34:38.000000', 'Modern chalet with stunning mountain views.', b'0', 6, 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop', 'Great Smoky Mountains', 230, 4.8, 167, 'APPROVED', 'Mountain View Chalet', 'Chalet', '2026-06-13 00:34:38.000000', 3),
(608, 'wifi , pool , bath, ', 2, 3, '2026-06-13 01:04:16.000000', '', b'0', 5, '', 'Greece', 80, 0, 0, 'APPROVED', 'dsgsg', 'Hotel', '2026-06-13 01:05:06.000000', 10),
(609, '', 2, 2, '2026-06-13 01:45:38.000000', '', b'0', 4, '', 'santorini', 100, 0, 0, 'PENDING', 'vvv', 'Villa', '2026-06-13 01:45:38.000000', 3);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `property_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `comment`, `created_at`, `rating`, `property_id`, `user_id`) VALUES
(1, 'this is good\n', '2026-06-13 01:32:00.000000', 5, 588, 6),
(2, 'this is very good', '2026-06-13 01:47:37.000000', 5, 591, 11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `active`, `created_at`, `email`, `name`, `password`, `role`, `phone`, `updated_at`) VALUES
(3, b'1', '2026-06-12 16:44:32.000000', 'owner@example.com', 'Sarah Owner', '$2a$10$NkM3FqXZQKZQKZQKZQKZQKZQKZQKZQKZQKZQK', 'OWNER', '+1 555 987 6543', '2026-06-12 16:44:32.000000'),
(4, b'1', '2026-06-12 22:32:03.000000', 'test@example.com', 'Test User', '$2a$10$1qk/L6LpljAOp2hDoBbMcuN.W3k4c7Sp1otj/lWYXDP1gZYW3fS6K', 'GUEST', '+1 555 123 4567', '2026-06-12 22:32:03.000000'),
(5, b'0', '2026-06-12 23:26:29.000000', 'admin@vilastay.com', 'Super Admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'GUEST', '+1 234 567 8900', '2026-06-13 01:44:39.000000'),
(6, b'1', '2026-06-12 23:29:09.000000', 'newadmin@vilastay.com', 'New Admin', '$2a$10$R28WvwMCw23vhkHd6sdhuuW1GlXZ0q2nHXysj.7kXcqIEbdqixcvC', 'ADMIN', '+1 234 567 8900', '2026-06-12 23:29:09.000000'),
(7, b'1', '2026-06-13 00:30:46.000000', 'testuser@gmail.com', 'test user', '$2a$10$bFRzjDHdNyK4nMDhr6yLq.oBYDCCjekdKBII0ldCz1AfLquGRMqq6', 'GUEST', '0123456789', '2026-06-13 00:30:46.000000'),
(8, b'1', '2026-06-13 00:34:35.000000', 'guest@example.com', 'John Guest', '$2a$10$Oct57zyQJsB10R5ecPcGZ.8Lh7LDELqG9Dd/DUippCoBnMj5n1q1O', 'GUEST', '+1 555 123 4567', '2026-06-13 00:34:35.000000'),
(10, b'1', '2026-06-13 01:03:12.000000', 'ownertest@example.com', 'ownertest', '$2a$10$BThp.z5Jxshc34hT7bQ.4uTH/0FSiDOdrfBYNpEovgf5xrhl0f5/S', 'OWNER', '', '2026-06-13 01:03:12.000000'),
(11, b'1', '2026-06-13 01:06:58.000000', 'tharinduroshana28@gmail.com', 'T REX bro', '$2a$10$ec5kn0Tzil5mg.Kk9OcIweH81EfqMpiqLgsXezEbEXl6cr5zXIF/u', 'GUEST', '', '2026-06-13 01:06:58.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKj94ktyvmw1driaufktolkpj1c` (`property_id`),
  ADD KEY `FKeyog2oic85xg7hsu2je2lx3s6` (`user_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK32k2h9s30s0ukftb8hj947ef2` (`owner_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK83j25x4ukm1vhf1336h1tt882` (`property_id`),
  ADD KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=610;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FKeyog2oic85xg7hsu2je2lx3s6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKj94ktyvmw1driaufktolkpj1c` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`);

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `FK32k2h9s30s0ukftb8hj947ef2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK83j25x4ukm1vhf1336h1tt882` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  ADD CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
