create table ciudades (
   id SERIAL PRIMARY KEY,
   nombre TEXT NOT NULL
);

create table personas (
   id SERIAL PRIMARY KEY,
   nombre TEXT NOT NULL,
   apellido TEXT,
   ciudad INTEGER,
   FOREIGN KEY(ciudad) REFERENCES ciudades(id)
);


INSERT INTO ciudades (nombre) VALUES ('Tucuman');
INSERT INTO ciudades (nombre) VALUES ('Buenos Aires');
INSERT INTO ciudades (nombre) VALUES ('New York');
INSERT INTO ciudades (nombre) VALUES ('Caracas');
INSERT INTO ciudades (nombre) VALUES ('Santa Cruz');
INSERT INTO ciudades (nombre) VALUES ('Maracaibo');

# INSERT INTO ciudades (nombre) VALUES ('Tucuman'), ('Buenos Aires'), ('New York'), ('Caracas'), ('Santa Cruz'), ('Maracaibo');

INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Toni', 'Tralice', 1);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Nepo', 'Neme', 1);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Romi', 'Moyano', 3);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Santi', 'Scanlan', 2);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Ceci', 'Schrupp', 4);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Luis', 'Pinki', 5);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Toni', 'Tralice', 5);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Nepo', 'Tita', 2);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Nepo', 'Neme', 1);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Solano', 'Palacio', 6);
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Solano', 'Palacio', 99);

# como no existe 99, no se ingresa ninguna ciudad, pero ... los ids, autoincrementales, 
# se crean igual
-- INSERT INTO personas (nombre, apellido, ciudad) VALUES 
-- ('Toni', 'Tralice', 1), 
-- ('Nepo', 'Neme', 1), 
-- ('Romi', 'Moyano', 3), 
-- ('Santi', 'Scanlan', 2), 
-- ('Ceci', 'Schrupp', 4), 
-- ('Luis', 'Pinki', 5), 
-- ('Solano', 'Palacio', 99); 

# insert multiple values
-- INSERT INTO personas (nombre, apellido, ciudad) VALUES 
-- ('Toni', 'Tralice', 1), 
-- ('Nepo', 'Neme', 1), 
-- ('Romi', 'Moyano', 3), 
-- ('Santi', 'Scanlan', 2), 
-- ('Ceci', 'Schrupp', 4), 
-- ('Luis', 'Pinki', 5); 


SELECT * from personas;

SELECT * from ciudades;

SELECT * FROM personas
  ORDER BY apellido;

SELECT * FROM personas
  ORDER BY nombre DESC;

#default ASC
-- SELECT * FROM personas
--   ORDER BY nombre ASC;

SELECT * FROM personas
  WHERE nombre = 'Toni';

SELECT * FROM personas
  WHERE nombre = 'Toni'
  AND apellido = 'Tralice';

SELECT * FROM personas 
  WHERE ciudad = 1
  ORDER BY nombre; 

SELECT * FROM personas 
  WHERE ciudad = 1
  ORDER BY nombre DESC; 

SELECT * FROM personas WHERE nombre LIKE '%oni%'; 
SELECT * FROM personas WHERE nombre LIKE '%Toni%'; 
SELECT * FROM personas WHERE nombre LIKE 'oni%'; 
SELECT * FROM personas WHERE nombre LIKE '%an%';
SELECT * FROM personas WHERE nombre LIKE '%no';

SELECT * FROM personas WHERE apellido ILIKE 'Tralice'; 
SELECT * FROM personas WHERE apellido ILIKE '%s%' ORDER BY nombre; 
SELECT * FROM personas WHERE apellido ILIKE 'sca%'; 

SELECT DISTINCT nombre FROM personas; 

SELECT DISTINCT nombre, apellido FROM personas; 

SELECT (nombre || ' ' || apellido) as "Nombre y Apellido" FROM personas; 
SELECT (nombre || ' ' || apellido || ' ' || ciudad) as "Nombre - Apellido - Ciudad" FROM personas ORDER BY "Nombre - Apellido - Ciudad"; 
SELECT CONCAT(nombre, ' ', apellido) as "Nombre y Apellido" FROM personas; 

# Agregamos uno para ver que pasa con dos nombres iguales
INSERT INTO personas (nombre, apellido, ciudad)
VALUES ('Romi', 'Perez', 1);

SELECT * FROM personas 
  ORDER BY nombre, apellido; 

# group by 
-- select column_1, column_2, aggregate_function(column_3)
-- from table
-- group by column_1, column_2, ... ; 
-- https://www.postgresqltutorial.com/postgresql-group-by/

SELECT COUNT(*) AS count_personas FROM personas; 
SELECT COUNT(*) FROM personas; 

SELECT ciudad, COUNT(ciudad) FROM personas GROUP BY ciudad; 

SELECT ciudad, COUNT(ciudad) FROM personas GROUP BY ciudad ORDER BY COUNT(ciudad) DESC; 

SELECT ciudad, nombre, COUNT(ciudad) FROM personas GROUP BY ciudad, nombre ORDER BY nombre; 

SELECT nombre, COUNT(nombre) as "count_personas" FROM personas GROUP BY nombre; 

SELECT nombre, apellido, COUNT(nombre) as "count_personas" FROM personas GROUP BY nombre, apellido ORDER BY nombre, apellido;

SELECT nombre, apellido FROM personas GROUP BY nombre, apellido HAVING COUNT(nombre) > 1; 

SELECT * FROM personas LIMIT 5; 
SELECT * FROM personas LIMIT 2; 

SELECT * FROM ciudades WHERE id NOT IN(4,6);
SELECT * FROM ciudades WHERE id IN(1,3);
SELECT * FROM personas WHERE apellido NOT IN('Neme', 'Tralice');

SELECT * FROM ciudades WHERE id BETWEEN 4 AND 6; 

# join
SELECT * FROM personas
JOIN ciudades
  ON ciudades.id = personas.ciudad;

SELECT * FROM personas
JOIN ciudades
  ON ciudades.id = personas.ciudad LIMIT 3; 

SELECT p.nombre, p.apellido, c.nombre FROM personas p
JOIN ciudades c
  ON c.id = p.ciudad;

SELECT * FROM personas ORDER BY nombre, apellido, ciudad; 

SELECT p.nombre, p.apellido, c.nombre, COUNT(c.nombre) FROM personas p
JOIN ciudades c ON c.id = p.ciudad GROUP BY p.nombre, p.apellido, c.nombre; 

SELECT p.nombre, p.apellido, c.nombre FROM personas p
JOIN ciudades c ON c.id = p.ciudad GROUP BY p.nombre, p.apellido, c.nombre
HAVING COUNT(p.nombre) > 1;

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
JOIN ciudades c
  ON c.id = p.ciudad
WHERE apellido = 'Neme';

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
JOIN ciudades c
  ON c.id = p.ciudad
WHERE apellido IN (SELECT apellido FROM personas WHERE id > 6 AND nombre ILIKE '%o%'); 
-- LIMIT 3; 

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
JOIN ciudades c
  ON c.id = p.ciudad
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
JOIN ciudades c
  ON c.id = p.ciudad WHERE c.nombre IN ('Tucuman', 'New York')
ORDER BY c.nombre; 

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
JOIN ciudades c
  ON c.id = p.ciudad WHERE c.nombre IN (SELECT nombre FROM ciudades WHERE id > 4)
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
LEFT JOIN ciudades c
  ON c.id = p.ciudad
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
RIGHT JOIN ciudades c
  ON c.id = p.ciudad
ORDER BY c.nombre;

SELECT per.nombre, per.apellido, c.nombre  FROM ciudades c
LEFT JOIN personas per
  ON c.id = per.ciudad
WHERE per.ciudad IS NULL
ORDER BY c.nombre;

SELECT p.nombre, p.apellido, c.nombre  FROM personas p
JOIN ciudades c
  ON c.id != p.ciudad;

SELECT * FROM personas
LEFT JOIN ciudades
  ON ciudades.id = personas.ciudad;



