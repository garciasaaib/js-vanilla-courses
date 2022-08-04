# WorkShop SQL

## SQLite

__SQLite__ es una implementación de una base de datos relacional hecha en _C_. Se diferencia de los demás _motores_ de bases de datos, porque viene contenida como si fuera un programa, en vez de ser un servidor que necesita un cliente. De hecho, SQLite guarda toda la información en un sólo archivo! Por lo tanto, es muy simple de instalar y usar. También por esto, SQLite es una gran opción cuando necesitamos bases de datos embebidas en otras aplicaciones, como en un browser, o en el celular. 

> Empezemos instalando __SQLite__ siguiendo [esta guía](https://mislav.net/rails/install-sqlite3/).

> También se puede instalar un browser más visual para acceder a las bases de datos, por ejemplo: Firefox's SQLite Manager [](https://addons.mozilla.org/en-us/firefox/addon/sqlite-manager/)

### Configurar SQLite

Una vez que tenemos instalado el programa, tenemos que configurar algunas simples opciones.
Con un editor de texto, abrí (o creá si no existe) el archivo `.sqliterc`.

> Para [windows](http://stackoverflow.com/questions/19147547/change-sqlite-default-settings-in-windows)

Ahora editá el contenido de ese archivo para que quede como lo siguiente:

```
.header on
.mode column
.timer o
```
Estos ajustes van a hacer que el output de SQLite sea un poco más amigable.

### Creando una Base de Datos

Ahora vamos a crear una Base da Datos!
Para eso nos ubiquemos en un directorio donde quieras guardar el archivo de la base de datos con `cd`.

Bien, ahora dentro del directorio vamos a crear la base de datos propiamente dicha con el comando: 

` $ sqlite3 imdb_test.sqlite.db `

Esto hace dos cosas, primero crea la base de datos con ese nombre, y además nos abre el prompt de sqlite con esa base de datos pre-cargada por defecto.

Ahora probá ingresar el comando `.help`, deberías ver toda una lista de comandos que son los que podés usar dentro de ese prompt.

### Create Table

Bien, ahora que ya tenemos nuestra base de datos, vamos a empezar a crear tablas dentro de ella. Para eso vamos a usar el comando o sentencia `CREATE TABLE`.

Abajo están detalladas las tres tablas que necesitamos para nuestro ejemplo.

__Movies__ Table:
    - id
      - type INTEGER
      - primary key
    - name
      - type TEXT
      - default value NULL
    - year
      - type INTEGER
      - default value NULL
    - rank
      - type REAL
    - default value NULL
 
> :warning: Las columnas que sean _Primary Key_ van a auto-incrementarse sólo si el tipo de datos definidos es __INTEGER__. Sinónimos tales como __INT__ van a hacer que tengan otro comportamiento.

__Actors__ Table:
  - id
    - type INTEGER
    - primary key
  - first_name
    - type TEXT
    - default value NULL
  - last_name
    - type TEXT
    - default value NULL
  - gender
    - type TEXT 
    - default value NULL


__Roles__ Table:
  - actor_id
    - type INTEGER
  - movie_id
    - type INTEGER
  - role_name
    - type TEXT
    - DEFAULT value NULL

> :blue_book: El comando `CREATE TABLE` de SQLite es similar, pero no es igual al comando de Postgres. 


### Llenando la bases con datos

Ahora que tenemos la est
ructura de la DB, podemos empezar a cargar datos usando el comando `INSERT`. 

De todas formas, para poder realizar consultar un poco más complejas, te vamos a dar una BD ya pre-populada con datos de películas. Para bajarla hace click [acá](https://learndotresources.s3.amazonaws.com/workshop/54c55ddb59650e0c0031a83e/imdb-large.sqlite3.db) y guardá el archivo en el mismo directorio donde estabas trabajando.

Ahora para abrir esa DB podes usar el siguiente comando:

`sqlite3 imdb-large.sqlite3.db`

### Chequeando la DB

Antes de empezar a realizar consultas sobre la BD, primero revisemos la estructura de la base que tenemos, para ver si está todo OK y para aprender ciertos comandos de SQLite.

Probá el siguiente comando:

```
sqlite> .tables
```

Si ves en tu pantalla algo similar a esto:
```
actors     directors_genres  movies_directors  roles
directors  movies            movies_genres
```
Entonces vamos por el buen camino.

Otro comando interesante es `.schema`, recibe como argumento una tabla y devuelve el comando con el que fue creada esa tabla:

```
sqlite> .schema movies
CREATE TABLE "movies" (
  "id" int(11) NOT NULL DEFAULT '0',
  "name" varchar(100) DEFAULT NULL,
  "year" int(11) DEFAULT NULL,
  "rank" float DEFAULT NULL,
  PRIMARY KEY ("id")
);
CREATE INDEX "movies_idx_name" ON "movies" ("name");
```
Con estos comandos podes ver la estructura de una BD y cómo fueron creadas sus tablas.

> Pueden ver info detallada de los comandos [acá](https://sqlite.org/cli.html#special_commands_to_sqlite3_dot_commands_).

### Consultas - Queries

Bien, ahora vamos a empezar a realizar consultas a la Base de Datos. Para hacerlo podemos ingresar código SQL en el prompt de SQLite.
Para probarlo, intentemos recuperar todas las películas que se hicieron en el año 1902 y que obtuvieron un puntaje mayor a 5 en IMBD:

```
sqlite> SELECT name, year FROM movies WHERE year=1902 AND rank>5;
name                  year
--------------------  --------------------
Jack and the Beansta  1902
Uncle Josh at the Mo  1902
Voyage dans la lune,  1902
```

Si ves ese resultado en tu compu, entonces ya estás listo para continuar.

### Escribiendo Consultas

> :bulb: Para escribir consultas SQL es una buena práctica crear un archivo nuevo con extensión `.sql` (asi activamos el syntax highlighter del editor de texto). En este archivo escribimos las consultas SQL separadas por `;`, y luego copiamos y pegamos sobre el prompt de SQLite. Escribirlo así es mucho más fácil y rápido que escribir directamente sobre la consola, además que tenés una forma de guardar todo el trabajo que venis haciendo!

> No te olvides de indentar tu código y darle formato, esto te va a servir mucho, sobre todo en queries más complejas.

Empezemos...

1. __Birthyear__

Buscá todas las películas filmadas en el año que naciste.

2. __1982__

Cuantas películas hay en la DB que sean del año 1982?

3. __Stacktors__

Buscá actores que tengan el substring `stack` en su apellido.

4. __Fame Name Game__

Buscá los 10 nombres y apellidos más populares entre los actores. Cuantos actores tienen cada uno de esos nombres y apellidos?

> Esta consulta puede involucrar múltiples queries.

5. __Prolific__

Listá el top 100 de actores más activos junto con el número de roles que haya realizado.

6. __Bottom of the Barrel__

Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.

7. __Braveheart__

Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995, ordená la lista alfabéticamente por apellido.

8. __Leap Noir__

Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto). Tu consulta debería devolver el nombre del director, el nombre de la peli y el año. Todo ordenado por el nombre de la película.

9. __° Bacon__

Listá todos los actores que hayan trabajado con _Kevin Bacon_ en películas de Drama (incluí el título de la peli). Excluí al señor Bacon de los resultados.

## Índices

En el shell de sqlite, si usas el comando `.schema` en la tabla `actors` vas a ver que en la creación de la tabla se incluyeron:

```
CREATE INDEX "actors_idx_first_name" ON "actors" ("first_name");
CREATE INDEX "actors_idx_last_name" ON "actors" ("last_name");
```
10. __Immortal Actors__

Qué actores actuaron en una película antes de 1900 y también en una película después del 2000?

11. __Busy Filming__

Buscá actores que actuaron en cinco o más roles en la misma película después del año 1990. Noten que los ROLES pueden tener duplicados ocasionales, sobre los cuales no estamos interesados: queremos actores que hayan tenido cinco o más roles DISTINTOS (DISTINCT cough cough) en la misma película. Escribí un query que retorne los nombres del actor, el título de la película y el número de roles (siempre debería ser > 5).

12. __♀__

Para cada año, contá el número de películas en ese años que _sólo_ tuvieron actrices femeninas.

TIP: Podrías necesitar sub-queries. Lee más sobre sub-queries [acá](http://www.tutorialspoint.com/sqlite/sqlite_sub_queries.htm).