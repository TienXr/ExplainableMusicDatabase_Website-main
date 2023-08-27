const express = require('express');
const router = express.Router();

// Item Model
const Theme = require('../../models/Theme');

// @route   GET api/themes
// @desc    GET ALl Themes
// @access Public
router.get('/', async (req, res) => {
    const themes = await Theme.find({})
    res.status(200).json(themes)
});

// @route   GET api/themes
// @desc    GET An Theme
// @access Public
router.get('/:id', (req, res) => {
    Theme.findById(req.params.id)
        .then(themes => res.json(themes))
        .catch(err => res.status(404).json({ success: false }))

});

// @route POST api/themes
// @desc Create An Theme
// @access Public
router.post('/', (req, res) => {
    const newTheme = new Theme({
        title: req.body.title,
        song: req.body.song
    })

    newTheme.save().then(theme => res.json(theme));
});

// @route PATCH api/themes
// @desc update An Theme
// @access Public
router.patch('/:id', (req, res) => {
    Theme.findByIdAndUpdate(
        { _id: req.params.id }, {
        ...req.body
    }).then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
})

// @route DELETE api/items
// @desc Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
    Theme.findById(req.params.id)
        .then(theme => theme.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;