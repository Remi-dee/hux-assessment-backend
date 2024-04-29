const request = require('supertest');
const app = require('../server');

describe('POST/contacts', () => {
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmY3OTIzNTJkNjgxZjQ3M2FlNmU1YyIsImlhdCI6MTcxNDM4NzI2MSwiZXhwIjoxNzE2OTc5MjYxfQ.BDIa5kC5QQa9-pWeDm1TEoCcuy8t_SzAkuGI8o9DjoI'


  



  it('should create a new contact', async () => {
    const newContact = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890'
    };

    // Include the access token in the request header
    const response = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newContact)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('John');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.phoneNumber).toBe('1234567890');
  }, 10000);

  it('should return 400 if request body is invalid', async () => {
    const invalidContact = {
      // Missing required fields
    };

    // Include the access token in the request header
    const response = await request(app)
      .post('/contacts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(invalidContact)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
  }, 10000);
});
