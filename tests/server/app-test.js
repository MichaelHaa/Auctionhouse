const request = require("supertest");
const {app} = require("../../src/server/app");

const rep = require('../../src/server/itemCollection');

beforeEach(() => {rep.createAuctions();});


// taken and modified from https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

// tests the root path
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  
});

// following tests are reused and slightly modified from les 07
//  https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/tests/server/app-test.js
test("Test get all", async () =>{

  const response = await request(app).get('/api/items');

  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(6);
});

// asserts that 404 is returned when given an get for an item that doesnt exist
test("Test item not found", async () => {

  const response = await request(app).get('/api/items/-3');
  expect(response.statusCode).toBe(404);
});


test("create item", async () => {

  let responseAll = await request(app).get('/api/items');
  const n = responseAll.body.length;

  const itemName = "my house";

  const resPost = await request(app)
      .post('/api/items')
      .send({itemName:itemName, startingPrice: 10})
      .set('Content-Type', 'application/json');

  expect(resPost.statusCode).toBe(201);
  const location = resPost.header.location;

  //should had been increased by 1
  responseAll = await request(app).get('/api/items');
  expect(responseAll.body.length).toBe(n + 1);

  const resGet = await request(app).get(location);
  expect(resGet.statusCode).toBe(200);

});

test("Delete all items", async () =>{

  let responseAll = await request(app).get('/api/items');
  expect(responseAll.statusCode).toBe(200);

  const items = responseAll.body;
  expect(items.length).toBe(6);

  for(let i=0; i<items.length; i++){

      const res = await request(app).delete('/api/items/'+items[i].id);
      expect(res.statusCode).toBe(204);
  }

  responseAll = await request(app).get('/api/items');
  expect(responseAll.statusCode).toBe(200);
  expect(responseAll.body.length).toBe(0);
});