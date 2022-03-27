const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');


describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body['message']).toEqual('Hello! The server is on. ');
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });
});

describe("Test the * path", () => {
    test("It should response 404 error", async () => {
        const response = await request(app).get("/*");
        expect(response.statusCode).toBe(404);
        expect(response.body['error']).toEqual('Not Found!');
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });
});


describe("Test the commits path", () => {
    test("GET /commits", async () => {
        const response = await request(app).get("/commits");
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');     
    });
});
