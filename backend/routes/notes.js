const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes : Get "/api/notes/fetchallnotes". Login Required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a New Note : POST "/api/notes/addnote". Login Required

router.post('/addnote', fetchuser, [
    body('title', 'title must be at least 3 Characters').isLength({ min: 3 }),
    body('description', 'title must be at least 5 Characters').isLength({ min: 5 }),
    body('tag', 'Tag must be at least 3 Characters').isLength({ min: 3 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are errors , Return Bad Request and Error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Edit Existing Notes : PUT "/api/notes/updatenote". Login Required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //    Create New Note Object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be upadated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
})
// ROUTE 4: Delete a Note : DELETE "/api/notes/deletenote". Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // Find the note to Delete
    let note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note is Deleted"})
})

module.exports = router