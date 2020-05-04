const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Item = require('../models/Item.model');

//@route GET api/items
//@func get all items
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items));
});

//@route POST api/items
//@func create an item
router.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@func delete an item
router.delete('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    Item.findById(req.params.id)
        .then(item => {
            item.remove()
            .then(() => res.json(item));
        })
        .catch(err => res.status(404).json('Item id does not exist'));
});

module.exports = router;