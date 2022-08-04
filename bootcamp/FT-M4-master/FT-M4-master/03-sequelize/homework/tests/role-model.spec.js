const { db, Role } = require('../db');

describe('Role Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe('Parte UNO', () => {
    xit('should not create the Role if name is not send', async () => {
      expect.assertions(1);
      try {
        await Role.create({description: 'Big amount of HP needed to withstands the attacks'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  
    xit('should create the Role if all required properties are ok', async () => {
      const role = await Role.create({
        name: 'Tank',
        description: 'Big amount of HP needed to withstands the attacks'
      });
      expect(role.toJSON()).toHaveProperty('name','Tank');
      expect(role.toJSON()).toHaveProperty('description','Big amount of HP needed to withstands the attacks');
    });
    xit('should not create two Roles with the same name', async () => {
      expect.assertions(2);
      try {
        const firstRole = await Role.create({name:'Support', description: 'foo'});
        expect(firstRole.toJSON()).toEqual({
          name: 'Support',
          description: 'Great at assisting allies from safety'
        });
        await Role.create({name: 'Support', description: 'foo2'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    })
  })


  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  })
});