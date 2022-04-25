/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const { validate: isUuid } = require('uuid');

const request = require('supertest');
const chai = require('chai');
const app = require('../app.js');

const expect = chai.expect;

describe('GET /api/appointment', () => {
  it('should be able to get a appointment with respond with a 200 status code', async () => {
    const response = await request(app).get('/api/appointment/');
    expect(response.statusCode).to.equal(200);
  });
});

describe('POST /api/appointment with wrong data', () => {
  it('should be able to respond with a status code of 400', async () => {
    const requestBody = {};

    const response = await request(app)
      .post('/api/appointment/')
      .send(requestBody);
    expect(response.statusCode).to.equal(400);
  });
});

// to do
describe('POST /api/appointment', () => {
  it('should be able to create a new appointment', async () => {
    const response = await request(app)
      .post('/api/appointment')
      .send({
        name: 'iury',
        birthDate: '1996-07-03T19:02:00.000Z',
        vaccineDate: '2022-07-03T19:02:00.000Z',
      });
    expect(response.statusCode).to.equal(200);
  });
});
