process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
const items = require("../fakeDb");

/* Item for Populating Fake DB for Tests */
let item = {
    name: "KitKat",
    price: 1.45
}

beforeEach(function () {
    items.push(item);
});

afterEach(function () {
    items.length = 0;
});


/************Tests************/

describe("Testing GET /items Route - Return all Items.", () => {
    test("Return all items in Fake DB", async () => {
        const response = await request(app).get("/items");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ name: 'KitKat', price: 1.45 }])
    });
});


describe("Testing GET  /cats/:name Route - Return Requested Item.", () => {
    test("Testing if route returns item in DB requested in route", async () => {
        const response = await request(app).get(`/items/${items[0].name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ "name": "KitKat", "price": 1.45 })
    });
    test("Responds with 404 if invalid item requested", async () => {
        const response = await request(app).get(`/items/snickers`);
        expect(response.statusCode).toBe(404)
    })
});


describe("Tesing POST /items Route - Add an Item to DB ", () => {
    test("Testing if an item can be added to DB", async () => {
        const response = await request(app).post("/items").send({ name: "Milkyway", price: 1.99 });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ item: { name: "Milkyway", price: 1.99 } });
    });
    test("Testing if request returns 400 if item name is missing in request", async () => {
        const response = await request(app).post("/items").send({});
        expect(response.statusCode).toBe(400);
    });
});


describe("Testing /PATCH /items/:name Route - Updating an Item on DB", () => {
    test("Testing if an item name on DB is update with new name in the request", async () => {
        const response = await request(app).patch(`/items/${items[0].name}`).send({ name: "Twix", pric: 2.50 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ item: { name: "Twix", price: 1.45 } });
    });
    test("Testing if request returns a  404 if an invalid name is passed", async () => {
        const response = await request(app).patch(`/items/marsbar`).send({ name: "Twix", pric: 2.50 });
        expect(response.statusCode).toBe(404);
    });
});


describe("Testing if the /DELETE /cats/:name Route Deletes an Item on DB", () => {
    test("Deleting a cat", async () => {
        const response = await request(app).delete(`/items/${items[0].name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Item has been deleted.' })
    });
    test("Testing if passing in an invalid item name returns a 404", async () => {
        const response = await request(app).delete(`/items/m&m`);
        expect(response.statusCode).toBe(404);
    })
});











