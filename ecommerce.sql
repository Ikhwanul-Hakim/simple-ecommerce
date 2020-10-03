CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(75) NOT NULL,
  `price` int NOT NULL,
  `isPromo` tinyInt DEFAULT 0,
  `promoPrice` int,
  `stock` int DEFAULT 0,
  `description` text,
  `actionLink` varchar(255),
  `weight` int,
  `condition` tinyInt DEFAULT 1,
  `id_category` int,
  `created_at` timestamp default CURRENT_TIMESTAMP,
  `updated_at` timestamp default CURRENT_TIMESTAMP,
  `deleted_at` timestamp default CURRENT_TIMESTAMP
);

ALTER TABLE `product` CHANGE `deleted_at` `deleted_at` TIMESTAMP NULL DEFAULT NULL;

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp default CURRENT_TIMESTAMP,
  `updated_at` timestamp default CURRENT_TIMESTAMP,
  `deleted_at` timestamp default CURRENT_TIMESTAMP
);

ALTER TABLE `category` CHANGE `deleted_at` `deleted_at` TIMESTAMP NULL DEFAULT NULL;

CREATE TABLE `specification` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `key` varchar(20) NOT NULL,
  `value` varchar(20) NOT NULL,
  `id_product` int,
  `created_at` timestamp default CURRENT_TIMESTAMP,
  `updated_at` timestamp default CURRENT_TIMESTAMP,
  `deleted_at` timestamp default CURRENT_TIMESTAMP
);

ALTER TABLE `specification` CHANGE `deleted_at` `deleted_at` TIMESTAMP NULL DEFAULT NULL;

ALTER TABLE `product` ADD FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);

ALTER TABLE `specification` ADD FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

INSERT INTO `category` (`name`) VALUES ('Buah'), ('Mainan'), ('Elektronik');

insert into `product` (`name`, `price`, `id_category`) VALUES
('Mangga', 20000, 1),
('Manggis', 10000, 1),
('Jeruk', 23000, 1),
('Anggur Merah', 52000, 1),
('Pesawat TV', 20000, 2),
('Hotwheels', 20000, 2),
('Sepeda', 20000, 2),
('TV', 20000, 3),
('Kulkas', 20000, 3),
('AC', 20000, 3);

insert into `specification` (`key`, `value`, `id_product`) VALUES
('Tipe', 'Racing Cobra', 6),
('Ukuran', '42 inch', 8),
('Jenis', 'Plasma TV', 8),
('Ukuran', '3 Pintu', 9),
('Listrik', '450 watt', 9),
('Ukuran', '1 PK', 10),
('Listrik', '690 watt', 10);

SELECT
 *, 
  CASE 
    WHEN `product`.`condition` = 1 
      THEN 'Baru' 
    WHEN `product`.`condition` = 2 
      THEN 'Bekas' 
    ELSE '-' 
  END as conditionFormatted 
FROM `product`
WHERE `deleted_at` IS NULL; 

