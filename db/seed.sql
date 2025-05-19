INSERT INTO users (firebase_uid, email, display_name) VALUES
('uid_123', 'popeea.corneliu@gmail.com', 'Corneliu'),
('uid_456', 'cati@example.com', 'Cati');

INSERT INTO trips (user_id, name, start_date, end_date, notes) VALUES
(1, 'Vietnam', '2025-04-17', '2025-05-05', 'One more trip to South-East Asia with Emy!'),
(2, 'Barcelona', '2025-05-19', '2025-05-19', '#barcelona #facebook');

INSERT INTO trip_destinations (trip_id, location, arrival_date, departure_date, notes) VALUES
(1, 'Hanoi, Vietnam', '2025-04-17', '2025-04-21', 'Relaxing'),
(1, 'Luang Prabang, Laos', '2025-04-21', '2025-04-21', 'Relaxing'),
(1, 'Siem Reap, Cambodia', '2025-04-21', '2025-04-25', 'Relaxing'),
(1, 'Ho Chi Minh City, Vietnam', '2025-04-25', '2025-04-28', 'Relaxing'),
(1, 'Danang, Vietnam', '2025-04-28', '2025-05-01', 'Relaxing'),
(1, 'Hanoi, Vietnam', '2025-05-01', '2025-05-05', 'Relaxing'),
(2, 'Barcelona, Spain', '2025-05-19', '2025-05-19', 'Exploring the city.');