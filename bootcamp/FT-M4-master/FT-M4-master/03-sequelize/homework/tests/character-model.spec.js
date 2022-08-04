const { db, Character } = require('../db');

describe('Character Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    console.log('Franco');
  });

  describe('Parte UNO', () => {
    xit('should not create the Character if name is not send', async () => {
      expect.assertions(1);
      try {
        await Character.create({hp: 100.0, mana: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if hp is not send', async () => {
      expect.assertions(1);
      try {
        await Character.create({name: 'Franco', mana: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if mana is not send', async () => {
      expect.assertions(1);
      try {
        await Character.create({hp: 100.0, name: 'Franco'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if code is not send', async () => {
      expect.assertions(1);
      try {
        await Character.create({name: 'Franco', hp: 100.0, mana: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if race is not a valid option', async () => {
      expect.assertions(1);
      try {
        await Character.create({code: 'FRAN', name: 'Franco', hp: 100.0, mana: 150.0, race: 'Monster'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if code is more than 5 chars', async () => {
      expect.assertions(1);
      try {
        await Character.create({code: 'FRANCO', name: 'Franco', hp: 100.0, mana: 150.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should create the Character if all required properties are ok', async () => {
      // Lógica para generar un ISO string con la hora local en vez de UTC
      const date = new Date();
      const localTimezone = date.getTimezoneOffset() * 60 * 1000;
      let localTime = date - localTimezone;
      localTime = new Date(localTime);

      const character = await Character.create({
        code: 'FRAN',
        name: 'Franco',
        hp: 100.0,
        mana: 150.0
      })
      expect(character.toJSON()).toEqual({
        code: 'FRAN',
        name: 'Franco',
        hp: 100.0,
        mana: 150.0,
        age: null,
        date_added: localTime.toISOString().split('T')[0],
        race: 'Other'
      });
    });
  
    xit('should not create two Characters with the same name', async () => {
      expect.assertions(2);
      try {
        // Lógica para generar un ISO string con la hora local en vez de UTC
        const date = new Date();
        const localTimezone = date.getTimezoneOffset() * 60 * 1000;
        let localTime = date - localTimezone;
        localTime = new Date(localTime);

        const characterOne = await Character.create({code: 'ONE', name: 'First', hp: 100.0, mana: 150.0})
        expect(characterOne.toJSON()).toEqual({
          code: 'ONE',
          name: 'First',
          hp: 100.0,
          mana: 150.0,
          age: null,
          date_added: localTime.toISOString().split('T')[0],
          race: 'Other'
        });
        await Character.create({code: 'TWO', name: 'First', hp: 10.0, mana: 15.0});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  describe('Parte DOS', () => {
    xit('should not create the Character if name is forbidden', async () => {
      expect.assertions(1);
      try {
        await Character.create({
          code: 'HENRY',
          name: 'Henry',
          hp: 100.0,
          mana: 150.0
        })
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if code is forbidden', async () => {
      expect.assertions(1);
      try {
        await Character.create({
          code: 'HeNrY',
          name: 'Valid Name',
          hp: 100.0,
          mana: 150.0
        })
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should not create the Character if code is forbidden', async () => {
      expect.assertions(1);
      try {
        await Character.create({
          code: 'henRY',
          name: 'Valid Name Two',
          hp: 100.0,
          mana: 150.0
        })
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