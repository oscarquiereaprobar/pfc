-- REGISTRAR 5 USUARIOS PRIMERO
-- Transportes
INSERT INTO transport (id, type) VALUES
(1, 'Avión'),
(2, 'Tren'),
(3, 'Coche'),
(4, 'Barco');

-- Itinerarios (4 por usuario)
INSERT INTO itinerary (id, name, id_user, start_date, end_date, image) VALUES
(1, 'Aventura en París', 1, '2024-06-01', '2024-06-10', 'default.png'),
(2, 'Vacaciones en Roma', 1, '2024-07-05', '2024-07-15', 'default.png'),
(3, 'Descubre Berlín', 1, '2024-08-10', '2024-08-20', 'default.png'),
(4, 'Ruta por Madrid', 1, '2024-09-01', '2024-09-10', 'default.png'),

(5, 'Playas de Grecia', 2, '2024-06-12', '2024-06-22', 'default.png'),
(6, 'Montañas de Suiza', 2, '2024-07-15', '2024-07-25', 'default.png'),
(7, 'Safari en Kenia', 2, '2024-08-18', '2024-08-28', 'default.png'),
(8, 'Ciudades de Japón', 2, '2024-09-10', '2024-09-20', 'default.png'),

(9, 'Costa de Portugal', 3, '2024-06-03', '2024-06-13', 'default.png'),
(10, 'Fiordos Noruegos', 3, '2024-07-08', '2024-07-18', 'default.png'),
(11, 'Ruta Maya', 3, '2024-08-12', '2024-08-22', 'default.png'),
(12, 'Andalucía Tour', 3, '2024-09-05', '2024-09-15', 'default.png'),

(13, 'Islas Canarias', 4, '2024-06-15', '2024-06-25', 'default.png'),
(14, 'Selva Amazónica', 4, '2024-07-20', '2024-07-30', 'default.png'),
(15, 'Patagonia', 4, '2024-08-25', '2024-09-04', 'default.png'),
(16, 'Ruta de la Seda', 4, '2024-09-12', '2024-09-22', 'default.png'),

(17, 'Australia Roadtrip', 5, '2024-06-18', '2024-06-28', 'default.png'),
(18, 'Nueva Zelanda', 5, '2024-07-22', '2024-08-01', 'default.png'),
(19, 'Sudeste Asiático', 5, '2024-08-28', '2024-09-07', 'default.png'),
(20, 'Canadá Aventura', 5, '2024-09-15', '2024-09-25', 'default.png');

-- Viajes (mínimo 3 por itinerario, id_itinerary de 1 a 20)
INSERT INTO trip (id, id_itinerary, id_transport, origin_country, origin_city, destination_country, destination_city, start_date, finish_date) VALUES
-- Itinerario 1
(1, 1, 1, 'España', 'Madrid', 'Francia', 'París', '2024-06-01', '2024-06-03'),
(2, 1, 2, 'Francia', 'París', 'Francia', 'Versalles', '2024-06-04', '2024-06-06'),
(3, 1, 3, 'Francia', 'Versalles', 'Francia', 'Lyon', '2024-06-07', '2024-06-10'),
-- Itinerario 2
(4, 2, 1, 'España', 'Barcelona', 'Italia', 'Roma', '2024-07-05', '2024-07-07'),
(5, 2, 2, 'Italia', 'Roma', 'Italia', 'Florencia', '2024-07-08', '2024-07-11'),
(6, 2, 3, 'Italia', 'Florencia', 'Italia', 'Venecia', '2024-07-12', '2024-07-15'),
-- Itinerario 3
(7, 3, 1, 'Alemania', 'Berlín', 'Alemania', 'Hamburgo', '2024-08-10', '2024-08-13'),
(8, 3, 2, 'Alemania', 'Hamburgo', 'Alemania', 'Múnich', '2024-08-14', '2024-08-17'),
(9, 3, 3, 'Alemania', 'Múnich', 'Alemania', 'Berlín', '2024-08-18', '2024-08-20'),
-- Itinerario 4
(10, 4, 2, 'España', 'Madrid', 'España', 'Toledo', '2024-09-01', '2024-09-03'),
(11, 4, 3, 'España', 'Toledo', 'España', 'Segovia', '2024-09-04', '2024-09-07'),
(12, 4, 1, 'España', 'Segovia', 'España', 'Madrid', '2024-09-08', '2024-09-10'),
-- Itinerario 5
(13, 5, 1, 'Grecia', 'Atenas', 'Grecia', 'Santorini', '2024-06-12', '2024-06-15'),
(14, 5, 2, 'Grecia', 'Santorini', 'Grecia', 'Mykonos', '2024-06-16', '2024-06-19'),
(15, 5, 3, 'Grecia', 'Mykonos', 'Grecia', 'Atenas', '2024-06-20', '2024-06-22'),
-- Itinerario 6
(16, 6, 4, 'Suiza', 'Zúrich', 'Suiza', 'Lucerna', '2024-07-15', '2024-07-18'),
(17, 6, 2, 'Suiza', 'Lucerna', 'Suiza', 'Interlaken', '2024-07-19', '2024-07-22'),
(18, 6, 3, 'Suiza', 'Interlaken', 'Suiza', 'Zermatt', '2024-07-23', '2024-07-25'),
-- Itinerario 7
(19, 7, 1, 'Kenia', 'Nairobi', 'Kenia', 'Masai Mara', '2024-08-18', '2024-08-22'),
(20, 7, 2, 'Kenia', 'Masai Mara', 'Kenia', 'Mombasa', '2024-08-23', '2024-08-26'),
(21, 7, 3, 'Kenia', 'Mombasa', 'Kenia', 'Nairobi', '2024-08-27', '2024-08-28'),
-- Itinerario 8
(22, 8, 1, 'Japón', 'Tokio', 'Japón', 'Kioto', '2024-09-10', '2024-09-13'),
(23, 8, 2, 'Japón', 'Kioto', 'Japón', 'Osaka', '2024-09-14', '2024-09-17'),
(24, 8, 3, 'Japón', 'Osaka', 'Japón', 'Tokio', '2024-09-18', '2024-09-20'),
-- Itinerario 9
(25, 9, 1, 'Portugal', 'Lisboa', 'Portugal', 'Oporto', '2024-06-03', '2024-06-06'),
(26, 9, 2, 'Portugal', 'Oporto', 'Portugal', 'Faro', '2024-06-07', '2024-06-10'),
(27, 9, 3, 'Portugal', 'Faro', 'Portugal', 'Lisboa', '2024-06-11', '2024-06-13'),
-- Itinerario 10
(28, 10, 4, 'Noruega', 'Bergen', 'Noruega', 'Oslo', '2024-07-08', '2024-07-11'),
(29, 10, 2, 'Noruega', 'Oslo', 'Noruega', 'Trondheim', '2024-07-12', '2024-07-15'),
(30, 10, 3, 'Noruega', 'Trondheim', 'Noruega', 'Bergen', '2024-07-16', '2024-07-18'),
-- Itinerario 11
(31, 11, 1, 'México', 'Cancún', 'México', 'Tulum', '2024-08-12', '2024-08-15'),
(32, 11, 2, 'México', 'Tulum', 'México', 'Chichén Itzá', '2024-08-16', '2024-08-19'),
(33, 11, 3, 'México', 'Chichén Itzá', 'México', 'Cancún', '2024-08-20', '2024-08-22'),
-- Itinerario 12
(34, 12, 1, 'España', 'Sevilla', 'España', 'Granada', '2024-09-05', '2024-09-08'),
(35, 12, 2, 'España', 'Granada', 'España', 'Córdoba', '2024-09-09', '2024-09-12'),
(36, 12, 3, 'España', 'Córdoba', 'España', 'Sevilla', '2024-09-13', '2024-09-15'),
-- Itinerario 13
(37, 13, 1, 'España', 'Tenerife', 'España', 'Gran Canaria', '2024-06-15', '2024-06-18'),
(38, 13, 2, 'España', 'Gran Canaria', 'España', 'Lanzarote', '2024-06-19', '2024-06-22'),
(39, 13, 3, 'España', 'Lanzarote', 'España', 'Tenerife', '2024-06-23', '2024-06-25'),
-- Itinerario 14
(40, 14, 1, 'Brasil', 'Manaos', 'Brasil', 'Leticia', '2024-07-20', '2024-07-23'),
(41, 14, 2, 'Brasil', 'Leticia', 'Brasil', 'Iquitos', '2024-07-24', '2024-07-27'),
(42, 14, 3, 'Brasil', 'Iquitos', 'Brasil', 'Manaos', '2024-07-28', '2024-07-30'),
-- Itinerario 15
(43, 15, 1, 'Argentina', 'El Calafate', 'Argentina', 'Ushuaia', '2024-08-25', '2024-08-28'),
(44, 15, 2, 'Argentina', 'Ushuaia', 'Argentina', 'Bariloche', '2024-08-29', '2024-09-01'),
(45, 15, 3, 'Argentina', 'Bariloche', 'Argentina', 'El Calafate', '2024-09-02', '2024-09-04'),
-- Itinerario 16
(46, 16, 1, 'China', 'Xi\'an', 'Uzbekistán', 'Samarkanda', '2024-09-12', '2024-09-15'),
(47, 16, 2, 'Uzbekistán', 'Samarkanda', 'Turquía', 'Estambul', '2024-09-16', '2024-09-19'),
(48, 16, 3, 'Turquía', 'Estambul', 'China', 'Xi\'an', '2024-09-20', '2024-09-22'),
-- Itinerario 17
(49, 17, 1, 'Australia', 'Sídney', 'Australia', 'Melbourne', '2024-06-18', '2024-06-21'),
(50, 17, 2, 'Australia', 'Melbourne', 'Australia', 'Adelaida', '2024-06-22', '2024-06-25'),
(51, 17, 3, 'Australia', 'Adelaida', 'Australia', 'Sídney', '2024-06-26', '2024-06-28'),
-- Itinerario 18
(52, 18, 1, 'Nueva Zelanda', 'Auckland', 'Nueva Zelanda', 'Wellington', '2024-07-22', '2024-07-25'),
(53, 18, 2, 'Nueva Zelanda', 'Wellington', 'Nueva Zelanda', 'Queenstown', '2024-07-26', '2024-07-29'),
(54, 18, 3, 'Nueva Zelanda', 'Queenstown', 'Nueva Zelanda', 'Auckland', '2024-07-30', '2024-08-01'),
-- Itinerario 19
(55, 19, 1, 'Tailandia', 'Bangkok', 'Vietnam', 'Hanoi', '2024-08-28', '2024-08-31'),
(56, 19, 2, 'Vietnam', 'Hanoi', 'Camboya', 'Phnom Penh', '2024-09-01', '2024-09-04'),
(57, 19, 3, 'Camboya', 'Phnom Penh', 'Tailandia', 'Bangkok', '2024-09-05', '2024-09-07'),
-- Itinerario 20
(58, 20, 1, 'Canadá', 'Toronto', 'Canadá', 'Montreal', '2024-09-15', '2024-09-18'),
(59, 20, 2, 'Canadá', 'Montreal', 'Canadá', 'Vancouver', '2024-09-19', '2024-09-22'),
(60, 20, 3, 'Canadá', 'Vancouver', 'Canadá', 'Toronto', '2024-09-23', '2024-09-25');

-- Mensajes (1-2 por itinerario)
INSERT INTO message (id, text, created_at, id_itinerary, id_user) VALUES
(1, '¡Qué ganas de empezar este viaje!', '2024-05-25 10:00:00', 1, 1),
(2, '¿Alguien recomienda restaurantes en París?', '2024-05-26 12:00:00', 1, 3),
(3, 'Roma es preciosa en verano.', '2024-06-30 09:30:00', 2, 1),
(4, 'No olvides visitar el Coliseo.', '2024-07-01 14:00:00', 2, 4),
(5, 'Berlín tiene mucha historia.', '2024-08-01 11:00:00', 3, 1),
(6, '¿Museos recomendados?', '2024-08-02 15:00:00', 3, 5),
(7, 'Madrid siempre sorprende.', '2024-08-28 13:00:00', 4, 1),
(8, 'Toledo es una joya.', '2024-08-29 16:00:00', 4, 2),
(9, 'Las playas de Grecia son increíbles.', '2024-06-10 10:00:00', 5, 2),
(10, 'Santorini es mi favorita.', '2024-06-11 11:00:00', 5, 3),
(11, 'Suiza es muy cara pero vale la pena.', '2024-07-10 09:00:00', 6, 2),
(12, 'No olvides probar el chocolate.', '2024-07-11 10:00:00', 6, 4),
(13, 'Safari en Kenia, experiencia única.', '2024-08-15 08:00:00', 7, 2),
(14, 'Lleva prismáticos.', '2024-08-16 09:00:00', 7, 5),
(15, 'Japón es otro mundo.', '2024-09-05 07:00:00', 8, 2),
(16, 'Prueba el sushi en Tokio.', '2024-09-06 08:00:00', 8, 1),
(17, 'Portugal tiene mucho encanto.', '2024-06-01 10:00:00', 9, 3),
(18, 'No te pierdas el bacalao.', '2024-06-02 11:00:00', 9, 4),
(19, 'Fiordos espectaculares.', '2024-07-05 09:00:00', 10, 3),
(20, 'Lleva ropa de abrigo.', '2024-07-06 10:00:00', 10, 5),
(21, 'Ruta Maya, cultura y aventura.', '2024-08-10 08:00:00', 11, 3),
(22, 'Tulum es mágico.', '2024-08-11 09:00:00', 11, 1),
(23, 'Andalucía, tierra de arte.', '2024-09-01 07:00:00', 12, 3),
(24, 'Granada y su Alhambra.', '2024-09-02 08:00:00', 12, 2),
(25, 'Canarias, clima perfecto.', '2024-06-13 10:00:00', 13, 4),
(26, 'Prueba las papas arrugadas.', '2024-06-14 11:00:00', 13, 5),
(27, 'Aventura en la selva.', '2024-07-18 09:00:00', 14, 4),
(28, 'Mosquitos everywhere.', '2024-07-19 10:00:00', 14, 1),
(29, 'Patagonia, naturaleza salvaje.', '2024-08-23 08:00:00', 15, 4),
(30, 'Lleva buen abrigo.', '2024-08-24 09:00:00', 15, 2),
(31, 'Ruta de la Seda, historia viva.', '2024-09-10 07:00:00', 16, 4),
(32, 'Samarkanda es impresionante.', '2024-09-11 08:00:00', 16, 3),
(33, 'Australia, roadtrip inolvidable.', '2024-06-16 10:00:00', 17, 5),
(34, 'Canguros everywhere.', '2024-06-17 11:00:00', 17, 1),
(35, 'Nueva Zelanda, paisajes de película.', '2024-07-20 09:00:00', 18, 5),
(36, 'No te pierdas Hobbiton.', '2024-07-21 10:00:00', 18, 2),
(37, 'Sudeste Asiático, cultura y comida.', '2024-08-26 08:00:00', 19, 5),
(38, 'Bangkok es caótica y fascinante.', '2024-08-27 09:00:00', 19, 3),
(39, 'Canadá, naturaleza y ciudades.', '2024-09-13 07:00:00', 20, 5),
(40, 'Vancouver es preciosa.', '2024-09-14 08:00:00', 20, 4);