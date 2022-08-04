const { db, Ability } = require('../db');

describe('Ability Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe('Parte UNO', () => {
    xit('should not create the Ability if name is not send', async () => {
      expect.assertions(1);
      try {
        await Ability.create({mana_cost: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Ability if mana_cost is not send', async () => {
      expect.assertions(1);
      try {
        await Ability.create({name: 'Fire Ball'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should create the Ability if all required properties are ok', async () => {
      const ability = await Ability.create({
        name: 'Franco',
        mana_cost: 150.0
      });
      expect(ability.toJSON()).toHaveProperty('name','Franco');
      expect(ability.toJSON()).toHaveProperty('mana_cost',150.0);
      expect(ability.toJSON()).toHaveProperty('description',null);
    });
  
    xit('should not create two Abilities with the same name-mana combination', async () => {
      expect.assertions(5);
      try {
        const abilityOne = await Ability.create({name: 'Fire Ball', mana_cost: 150.0});
        expect(abilityOne.toJSON()).toHaveProperty('name','Fire Ball');
        expect(abilityOne.toJSON()).toHaveProperty('mana_cost',150.0);
        const abilityTwo = await Ability.create({name: 'Fire Ball', mana_cost: 100.0});
        expect(abilityTwo.toJSON()).toHaveProperty('name','Fire Ball');
        expect(abilityTwo.toJSON()).toHaveProperty('mana_cost',100.0);
        await Ability.create({name: 'Fire Ball', mana_cost: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  describe('Parte DOS', () => {
    xit('should retrieve the summary although it is not saved in the database', async () => {
      const ability = await Ability.create({
        name: 'Thunderbolt',
        description: 'An incredibly powerful thunderbolt', 
        mana_cost: 210.0});
      expect(ability.summary).toBe('Thunderbolt (210 points of mana) - Description: An incredibly powerful thunderbolt');
      const [results] = await db.query('SELECT * FROM "Abilities" WHERE name = \'Thunderbolt\'');
      expect(results[0]).not.toHaveProperty('summary');
    });
  
    xit('should not create the Ability if mana_cost is lower than the min value', async () => {
      expect.assertions(1);
      try {
        await Ability.create({name: 'Weak power', mana_cost: 5.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Ability if mana_cost is higher than the max value', async () => {
      expect.assertions(1);
      try {
        await Ability.create({name: 'Op power', mana_cost: 505.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  })
});