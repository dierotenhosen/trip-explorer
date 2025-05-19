CREATE DATABASE trip_explorer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'corneliu'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON trip_explorer.* TO 'corneliu'@'localhost';
FLUSH PRIVILEGES;