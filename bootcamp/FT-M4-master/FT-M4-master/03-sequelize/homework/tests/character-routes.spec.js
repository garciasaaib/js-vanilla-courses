const request = require('supertest');
const app = require('../server.js');
const { db, Character } = require('../db');

describe('Character Routes', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  })

  describe('Parte UNO: POST /character', () => {
    xit('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
      const res = await request(app).post('/character');
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe('Falta enviar datos obligatorios');
    });
  
    xit('should return status 201 and character object if the character was succesfully created', async () => {
      const res = await request(app)
                          .post('/character')
                          .send({code: 'FRAN', name: 'Franco', hp: 100.0, mana: 120.0});
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        code: 'FRAN',
        name: 'Franco',
        hp: 100.0,
        mana: 120.0,
        age: null,
        date_added: new Date().toISOString().split('T')[0],
        race: 'Other'
      });
    });
  
    xit('should return status 404 and corresponding text if the database creation fails', async () => {
      const res = await request(app)
                          .post('/character')
                          .send({code: 'FRANCO', name: 'Franco', hp: 100.0, mana: 120.0});
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe('Error en alguno de los datos provistos');
    });
  
    afterAll(async () => {
      await db.sync({ force: true });
    })
  });

  describe('Multiple routes', () => {
    beforeAll(async () => {
      const p1Character = Character.create({code: 'ONE', name: 'First', hp: 90.0, mana: 150.0, race: 'Human', age: 27});
      const p2Character = Character.create({code: 'TWO', name: 'Second', hp: 135.0, mana: 40.0, race: 'Machine', age: 20});
      const p3Character = Character.create({code: 'THREE', name: 'Third', hp: 110.0, mana: 110.0, race: 'Human', age: 23});
      const [p1, p2, p3] = await Promise.all([p1Character, p2Character, p3Character]);
      // await Promise.all([
      //   p1.createRole({name: 'Tank'}),
      //   p1.createRole({name: 'Top'}),
      //   p2.createRole({name: 'Jungle'}),
      //   p3.createRole({name: 'Mid'}),
      //   p3.createRole({name: 'Support'})
      // ]);
    })

    describe('Parte UNO', () => {
      xit('should return status 200 and the list of all characters', async () => {
        const res = await request(app).get('/character');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          {code: 'ONE', name: 'First', hp: 90.0, mana: 150.0, age: 27, date_added: new Date().toISOString().split('T')[0], race: 'Human'},
          {code: 'TWO', name: 'Second', hp: 135.0, mana: 40.0, age: 20, date_added: new Date().toISOString().split('T')[0], race: 'Machine'},
          {code: 'THREE', name: 'Third', hp: 110.0, mana: 110.0, age: 23, date_added: new Date().toISOString().split('T')[0], race: 'Human'}
        ])
      })
  
      xit('EXTRA: should return status 200 and the list of all characters with certain attributes', async () => {
        const res = await request(app).get('/character?name=true&hp=true');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          {name: 'First', hp: 90.0},
          {name: 'Second', hp: 135.0},
          {name: 'Third', hp: 110.0}
        ])
      })
  
      xit('should list all characters that match with the race filter', async () => {
        const res = await request(app).get('/character?race=Human');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          expect.objectContaining({code: 'ONE', name: 'First', hp: 90.0, race: 'Human'}),
          expect.objectContaining({code: 'THREE', name: 'Third', hp: 110.0, race: 'Human'})
        ])
      })
  
      xit('should return status 404 and the correct message if character\'s code is invalid', async () => {
        const res = await request(app).get('/character/FIFTH');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('El código FIFTH no corresponde a un personaje existente');
      })
  
      xit('should return the correct character search by code', async () => {
        const res = await request(app).get('/character/TWO');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
          {code: 'TWO', name: 'Second', hp: 135.0, mana: 40.0, age: 20, date_added: new Date().toISOString().split('T')[0], race: 'Machine'}
        )
      })
    })

    describe('Parte DOS', () => {
      xit('should list all characters that match with the race and the age filters', async () => {
        await Character.create({code: 'FOUR', name: 'Fourth', hp: 48.0, mana: 65.0, age: 27});
        const res = await request(app).get('/character?race=Human&age=27');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          expect.objectContaining({code: 'ONE', name: 'First', hp: 90.0, race: 'Human', age: 27})
        ])
      })
  
      xit('should list all characters with less than 25 years', async () => {
        const res = await request(app).get('/character/young');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
          expect.objectContaining({code: 'TWO', name: 'Second', hp: 135.0, race: 'Machine', age: 20}),
          expect.objectContaining({code: 'THREE', name: 'Third', hp: 110.0, race: 'Human', age: 23}),
        ])
      })
  
      xit('should update attribute wich are null with value passed by query', async () => {
        const five = Character.create({code: 'FIVE', name: 'Fifth', hp: 15.0, mana: 500.0});
        const six = Character.create({code: 'SIX', name: 'Sixth', hp: 305.0, mana: 23.0, age: 35});
        const seven = Character.create({code: 'SEVEN', name: 'Seventh', hp: 305.0, mana: 23.0});
        await Promise.all([five, six, seven]);
        const res = await request(app).put('/character/age?value=40');
        const characters = await Character.findAll();
        const with40years = characters.filter(c => c.age === 40);
        expect(with40years).toEqual([
          expect.objectContaining({code: 'FIVE', age: 40}),
          expect.objectContaining({code: 'SEVEN', age: 40})
        ])
        expect(res.text).toBe('Personajes actualizados');
      })
  
      xit('should return the year joined with the phrase \'years old\'', async () => {
        const characterOne = await Character.findByPk('ONE');
        expect(characterOne.age).toBe('27 years old');
      })
  
      xit('should add the abilities to the character', async () => {
        await request(app)
                .put('/character/addAbilities')
                .send({
                  codeCharacter: 'TWO',
                  abilities: [
                    { name: 'abilityOne', mana_cost: 17.0 },
                    { name: 'abilityTwo', mana_cost: 84.0 },
                    { name: 'abilityThree', mana_cost: 23.0 }
                  ]
                });
        const [results] = await db.query('SELECT name, mana_cost FROM "Abilities" WHERE "CharacterCode" = \'TWO\'');
        expect(results).toEqual(expect.arrayContaining([
          {name: 'abilityOne', mana_cost: 17.0},
          {name: 'abilityTwo', mana_cost: 84.0},
          {name: 'abilityThree', mana_cost: 23.0}
        ]))
      })
  
      xit('should return all the characters with their roles associated', async () => {
        const res = await request(app).get('/character/roles/ONE');
        expect(res.body.name).toBe('First');
        expect(res.body.Roles).toEqual([
          expect.objectContaining({name: 'Tank'}),
          expect.objectContaining({name: 'Top'}),
        ])
      })
    })

    afterAll(async () => {
      await db.sync({ force: true });
    })
  })

  afterAll(() => {
    db.close();
  })
})



