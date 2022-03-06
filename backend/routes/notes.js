const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Route 1 : Get all noted for specific user

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id }); //fetch notes 
    res.json(notes);
})


//Route 2 : Add notes for specific user

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title ').isLength({ min: 3 }),
    body('description', 'Description cannot be less than 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //In case of error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await notes.save();

        res.json(savednote)
    } catch (error) {
        console.error(error.message)

    }
})



// Route : 3 Add notes for specific user

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //In case of error handling

        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //Find the note to be updated

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(401).json("Note Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ updatedNote })
    } catch (error) {
        res.status(500).send("Internal Server error");
        console.error(error.message)

    }

})


//Route 4 Deleting notes

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //Find the note to be updated
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(401).send("Note Found");
        }
        //Ollow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        deleteNote = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Sucess": "Note has been deleted" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server error");
    }
})

module.exports = router 