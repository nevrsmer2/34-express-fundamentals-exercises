const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const items = require("../fakeDb")


/* Reneder all Items in Fake DB */
router.get("/", function (request, response) {
    return response.json(items);
});


/* Post an Item to Fake DB */
router.post("/", function (request, response, next) {
    try {
        if (!request.body.name) throw new ExpressError("Item name is required", 400);
        const item = { name: request.body.name, price: request.body.price };
        items.push(item);
        return response.status(201).json({ item: item });
    } catch (error) {
        return next(error);
    };
});


/* Render Specific Item in Fake DB */
router.get("/:name", function (request, response) {
    const item = items.find(i => i.name === request.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    return response.json(item);
});


/* Update a Single Item to Fake DB */
router.patch('/:name', (request, response) => {
    const item = items.find(i => i.name === request.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    item.name = request.body.name;
    return response.json({ item: item });
});


/* Delete and Item on FakeDB */
router.delete('/:name', (request, response) => {
    const item = items.find(i => i.name === request.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    };
    items.splice(item, 1);
    response.json({ message: "Item has been deleted." });
});



/* Module Exports */

module.exports = router;



