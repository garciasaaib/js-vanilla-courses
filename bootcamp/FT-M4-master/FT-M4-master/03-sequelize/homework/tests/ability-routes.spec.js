const request = require('supertest');
const app = require('../server.js');
const { db, Character, Ability } = require('../db');

describe('Ability Routes', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  })

  describe('Parte DOS', () => {
    describe('POST /ability', () => {
      xit('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
        const res = await request(app).post('/ability');
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe('Falta enviar datos obligatorios');
      });
  
      xit('should return status 201 and ability object if the ability was succesfully created', async () => {
        const res = await request(app)
                            .post('/ability')
                            .send({name: 'Fire Ball', mana_cost: 80.5});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({
          name: 'Fire Ball',
          description: null,
          mana_cost: 80.5
        }));
      });
    })
  
    describe('Multiple Routes', () => {
      beforeAll(async () => {
        const p1Character = Character.create({code: 'ONE', name: 'First', hp: 90.0, mana: 150.0, race: 'Human', age: 27});
        const p2Character = Character.create({code: 'TWO', name: 'Second', hp: 135.0, mana: 40.0, race: 'Machine', age: 20});
        const p3Character = Character.create({code: 'THREE', name: 'Third', hp: 110.0, mana: 110.0, race: 'Human', age: 23});
        const p1Ability = Ability.create({name: 'Thunderbolt', mana_cost: 45.0});
        const p2Ability = Ability.create({name: 'Prismatic Barrier', mana_cost: 30.0});
        const p3Ability = Ability.create({name: 'Final Spark', mana_cost: 100.0});
        await Promise.all([p1Character, p2Character, p3Character, p1Ability, p2Ability, p3Ability]);
      })
  
      xit('should associate ability with character', async () => {
        const res = await request(app)
                            .put('/ability/setCharacter')
                            .send({idAbility: 1, codeCharacter: 'ONE'});
        expect(res.body).toEqual(expect.objectContaining({
          name: 'Fire Ball',
          description: null,
          mana_cost: 80.5,
          CharacterCode: 'ONE'
        }));
        const [results] = await db.query('SELECT "CharacterCode" FROM "Abilities" WHERE id = 1');
        expect(results[0].CharacterCode).toBe('ONE');
      })
    })
  })

  afterAll(() => {
    db.close();
  })
})



