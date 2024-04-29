const request = require('supertest');
const app = require('../server');

describe('PUT/contacts', () => {
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmY3OTIzNTJkNjgxZjQ3M2FlNmU1YyIsImlhdCI6MTcxNDM4NzI2MSwiZXhwIjoxNzE2OTc5MjYxfQ.BDIa5kC5QQa9-pWeDm1TEoCcuy8t_SzAkuGI8o9DjoI'


  it('should update a contact', async () => {
  let contactId = "662f824073a9e20233889831"
    const updatedContact = {
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '9876543210'
    };


    const response = await request(app)
      .put(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedContact)
      .set('Accept', 'application/json');

      

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe('Jane');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.phoneNumber).toBe('9876543210');
  }, 10000);
});
