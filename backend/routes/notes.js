const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// Route 1 : Get all Notes using: GET "/fetchallnotes" - already logged in

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find(({ user: req.user.id })); // find notes where user = req.user by it's id
        res.json(notes);
    } catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }

})

// Route 2 : Add a new note using: POST "/addnote" - already logged in

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body; // these will all be there in the body content while sending the post request

        // if there are errors, return bad request and the errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({ // it will return a promise .save is a promise here
            title, description, tag, user: req.user.id // user id will automatically come from fetchuser
        })

        const savedNote = await note.save();

        res.json(savedNote); // this response will be returned
    }
    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }

})

// Route 3 : Update an exsisting note using: PUT "/updatenote" - already logged in

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        const newNote = {};   // create a new note object

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated
        let note = await Notes.findById(req.params.id);  // cause we are changing it later

        if (!note) { return res.status(404).send("Id not found") }; // if the note to be updated even exists

        // if this note's user's id is not equal to the requested user's id 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("unauthorised user")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }

    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4 : Delete an exsisting note using: DELETE "/deletenote" - already logged in

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // find the note to be deleted
        let note = await Notes.findById(req.params.id);  // let cause we are changing it later

        if (!note) { return res.status(404).send("Id not found") }; // if the note to be updated even exists

        // if this note's user's id is not equal to the requested user's id 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("unauthorised user")
        }
        // deleting the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted : ", DeletedNote: note });
    }

    catch (error) {
        console.error(error.messsage);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;