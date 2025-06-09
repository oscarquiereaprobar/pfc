DROP DATABASE IF EXISTS travelapp;
CREATE DATABASE travelapp;
USE travelapp;

-- Tabla de usuarios
CREATE TABLE user (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

-- Tabla de itinerarios
CREATE TABLE itinerary (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Sin nombre',
    id_user BIGINT UNSIGNED NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    image VARCHAR(512),
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);

-- Tabla de transportes
CREATE TABLE transport (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL
);

-- Tabla de viajes
CREATE TABLE trip (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_itinerary BIGINT UNSIGNED NOT NULL,
    id_transport BIGINT UNSIGNED, -- PERMITIMOS NULL
    origin_country VARCHAR(100) NOT NULL,
    origin_city VARCHAR(100) NOT NULL,
    destination_country VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    FOREIGN KEY (id_itinerary) REFERENCES itinerary(id) ON DELETE CASCADE,
    FOREIGN KEY (id_transport) REFERENCES transport(id) ON DELETE SET NULL
);

-- Tabla de mensajes
CREATE TABLE message (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_itinerary BIGINT UNSIGNED NOT NULL,
    id_user BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (id_itinerary) REFERENCES itinerary(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE
);
