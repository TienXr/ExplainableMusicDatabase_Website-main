const express = require('express');
const fs = require('fs');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    GET ALl Items
// @access Public
router.get('/', async (req, res) => {
    // Item.find()
    //     .then(items => res.json(items));
    const items = await Item.find({})
    res.status(200).json(items)
});

// @route   GET api/items
// @desc    GET An Items
// @access Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ success: false }))
});

// @route PATCH api/items
// @desc update An Item
// @access Public
router.patch('/:id', async (req, res) => {
    Item.findByIdAndUpdate(
        { _id: req.params.id }, {
        ...req.body
    }).then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
})

// @route POST api/items
// @desc Create An Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        location2: req.body.location2
    })

    newItem.save().then(item => res.json(item));
});

// @route POST api/items/upload
// @desc upload file
// @access Public
router.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    const file2 = req.files.file2;

    file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("move success")
        }
    })

    file2.mv(`${__dirname}/../../client/public/uploads/${file2.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } else {
            console.log("move success")
        }
    })

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`, fileName2: file2.name, filePath2: `/uploads/${file2.name}` });
})

// @route DELETE api/items/upload
// @desc delete file
// @access Public
router.delete('/upload', (req, res) => {
    const filePath1 = `${__dirname}/../../client/public/${req.body.path1}`;
    fs.unlink(filePath1, function (err) {
        if (err) {
            console.log("error at delete file")
        } else {
            console.log("success")        }
    })

    const filePath2 = `${__dirname}/../../client/public/${req.body.path2}`;
    fs.unlink(filePath2, function (err) {
        if (err) {
            console.log("error at delete file")
        } else {
            console.log("success")
        }
    })
})


// @route DELETE api/items
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json(req.params.id)))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;