# Sequelize Homework

Esta homework estará divida en 2 partes.

## PARTE UNO

### Conexión a BDD

Ya se encuentra instalado `sequelize`, `pg` y `pg-hstore` por lo que comenzaremos directamente creando la base de datos. Esto debemos hacerlo desde alguna interfaz a PostgreSQL, ya sea por consola o desde PGAdmin.

Para realizarlo por consola ingresar a la consola de PostgreSQL con el comando ya visto `psql` y luego ejecutar:

```sql
  CREATE DATABASE henry_sequelize;
```

Ahora que ya tenemos creada la base de datos procederemos a conectarla desde nuestro ORM (Sequelize) para poder interactuar con ella. Dentro de la carpeta `db` verán que en el archivo `index.js` tienen lo siguiente:

```js
const db = new Sequelize('postgres://user:password@localhost:5432/henry_sequelize', {
  logging: false,
});
```

Deberán reemplazar donde dice `user` y `password` por su usuario y contraseña de Postgres para que la conexión sea exitosa, sino al correr el servidor les arrojará un error informando donde está fallando el intento de conexión. Si por algun motivo al instalar Postgres cambiaron el puerto default tambien tendran que modificar donde dice `5432`.

### Modelos

Para poder completar esta sección primero entedamos cual va a ser la temática de la homework. La idea va a ser simular la estructura de datos de un juego al estilo League of Legends (Para los que no lo conocen no se preocupen no es necesario saber nada del mismo para completar la homework).

Vamos a generar tres modelos:

#### Character

Va a representar a uno de los personajes que podrías seleccionar del juego y tendrá las siguientes propiedades:

  * __code__*: string (Máximo 5 caracteres) [PK]
  * __name__*: string (Debe ser único)
  * __age__: integer
  * __race__: enum (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
  * __hp__*: float
  * __mana__*: float
  * __date_added__: timestamp without time

En el caso de no setear una raza ("race") por default deberían asignarle "Other" y si no damos valor para "date_added" debería tomar la fecha actual. Adicionalmente queremos quitar los timestamps automáticos de createdAt y updatedAt.

#### Ability

  * __name__*: string
  * __description__: text
  * __mana_cost__*: float

La combinación "name" + "mana_cost" debe ser única.

#### Role

  * __name__*: string (Dene ser único)
  * __description__: string

Las propiedades marcadas con asterístico son obligatorias

### Rutas

Van a tener ya los middlewares para cada modelo configurados y el esqueleto de las rutas, la idea es que completen el interior de las mismas con el código apropiado.

#### POST /character

Debe recibir por body los datos del modelo de `Character` y crear una instancia del mismo en la base de datos. 
  * De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios"
  * Si alguna validación interna de la base de datos falle debe devolver un status 404 con el mensaje "Error en alguno de los datos provistos"
  * Si todos los datos son provistos debera devolver un status 201 y el objeto del personaje

#### GET /character

Debe retornar todos los personajes que se encuentren creados en la base de datos. Además este endpoint debe aceptar por query un valor de una raza para filtrar los resultados, por ejemplo: GET /character?race=human

<img style="float: left; padding-right: 10px" src="./img/extra.png">

Adicionalmente pueden hacer que reciba por query los atributos que quiera devolver en el caso de no querer todos, por ejemplo: GET /character?name=true&hp=true

#### GET /character/:code

Debe retornar aquel personaje que coincida con el código enviado. En el caso de no encontrarlo debe responder con status code 404 y el mensaje "El código ${codigo} no corresponde a un personaje existente"

## PARTE DOS

### GET /character

Volvamos a la ruta que habíamos hecho en la parte uno, ahora vamos a agregarle tambien que pueda recibir un age por query y que el filtro sea un AND de ambos campos, es decir que traiga aquellos personajes que tengan la raza dada en race y la edad dada en age.

<img style="float: left; padding-right: 10px" src="./img/extra.png">

Adicionalmente pueden hacer que de forma dinámica pueda filtrar por cualquiera de los atributos del modelo de Character y no solamente por race y age, tengan en cuenta que pueden pasarle la cantidad de parámetros que quieran, desde ninguno hasta todos.

### GET /character/young

Implementaremos un nuevo endpoint que deberá traer todos los personajes considerados "jovenes" que serán aquellos con menos de 25 años. CUIDADO con el orden de las rutas...

### PUT /character/:attribute?value=...

Vamos a crear un PUT el cual va a recibir un atributo como param y un value como query y deberá modificar todos los valores de dicho atributo con el valor dado para todas las instancias de personajes que existan en la base de datos y cuyo valor de ese atributo sea null.

Es decir si se hace un request PUT a /character/age?value=40 deberá buscar todos los personajes cuya edad sea null y a esos reemplazarlos por el valor 40.

Devolver simplemente un mensaje que diga 'Personajes actualizados'

### Getter

Vamos a definir un getter para el atributo age de los personajes, lo que queremos es que nos devuelva el valor de su edad pero concatenado con la frase 'years old' por lo que para un personaje que tenga 27 años nos debería devoler '27 years old'.

IMPORTANTE: Esto hará que rompan algunos tests anteriores que esperaban solamente el valor, animate y arreglalos, ya sabes como funcionan los tests.

### Virtual Field

Ahora crearemos un campo virtual para el modelo de Ability que será como un mini resumen de la habilidad y lo llamaremos "summary", deberá retornar "${name} (${mana_cost} points of mana) - Description: ${description}" (La mana tienen que ser solo la parte entera).

### Validations

Vamos a agregar algunas validaciones a nivel base de datos:
  * __Ability - mana_cost__: el valor debe estar entre 10.0 y 250.0
  * __Character - name__: el valor no puede ser "Henry", "SoyHenry" o "Soy Henry"
  * __Character - code__: similar al name vamos a hacer que no pueda ser "HENRY" pero incluyendo cualquier variación/combinación de mayúsculas y minísculas (Armar un custom validator).

### Relaciones

Ya tenemos todos los modelos creados y funcionando correctamente pero cada uno por su cuenta, deberíamos relacionarlos de la siguiente forma:

<p align="center">
  <img src="./img/DER.png" />
</p>

Deben asociar los modelos dentro del archivo `index.js` de la carpeta `db`. Para ello primero deberán obtener los modelos desde la instancia de Sequelize creada:

```js
  const { Character, Ability, Role} = db.models;
```

Ahora si tienen que usar los métodos `hasOne`, `belongsTo`, `hasMany` o `belongsToMany` según corresponda.

Una vez que hayan completado exitosamente las asociaciones van a tener que descomentar las lineas que se encuentra dentro del `beforeAll` del archivo `character-routes.spec.js` (Lineas 52 a 58): 

```js
  await Promise.all([
    p1.createRole({name: 'Tank'}),
    p1.createRole({name: 'Top'}),
    p2.createRole({name: 'Jungle'}),
    p3.createRole({name: 'Mid'}),
    p3.createRole({name: 'Support'})
  ]);
```

### POST /ability

Debe recibir por body los datos del modelo de `Ability` y crear una instancia del mismo en la base de datos. 
  * De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios"
  * Si todos los datos son provistos debera devolver un status 201 y el objeto de la habilidad

### PUT /ability/setCharacter

Recibirá por body `idAbility` y `codeCharacter` y deberá asociarlos a partir del modelo de Ability y devolver el objeto de habilidad con `name`, `description`, `mana_cost` y `CharacterCode`.

### PUT /character/addAbilities

Similar al enpodint anterior pero ahora queremos poder desde el lado del personaje agregar una o mas habilidades en simultaneo que las recibiremos como un array dentro del body del request:

```js
{
  codeCharacter: 'TWO',
  abilities: [
    { name: 'abilityOne', mana_cost: 17.0 },
    { name: 'abilityTwo', mana_cost: 84.0 },
    { name: 'abilityThree', mana_cost: 23.0 }
  ]
}
```

Todas estas habilidades aun no existen en la base de datos... 

### GET /characters/roles/:code

Crearemos otro endpoint para obtener todos los datos del personajes pero incluyendo también la información asociada a sus roles. Por ejemplo debería devolver algo así:

```js
{
      age: '27 years old',
      code: 'ONE',
      name: 'First',
      race: 'Human',
      hp: 90,
      mana: 150,
      date_added: '2022-03-27',
      Roles: [
        {
          id: 1,
          name: 'Tank',
          description: null
        },
        {
          id: 2,
          name: 'Top',
          description: null
        }
      ]
    }

```