const request = require('supertest');
const app = require('../server'); 

describe('POST /api/contacts', () => {
  it('should create a new contact', async () => {
    const newContact = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890'
    };

    const response = await request(app)
      .post('/api/contacts')
      .send(newContact)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('John');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.phoneNumber).toBe('1234567890');
  });

  it('should return 400 if request body is invalid', async () => {
    const invalidContact = {
      // Missing required fields
    };

    const response = await request(app)
      .post('/api/contacts')
      .send(invalidContact)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
  });
});
