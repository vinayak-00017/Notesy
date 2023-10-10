const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Note } = require("../db");
const jwt = require('jsonwebtoken');
const router = express.Router();

    router.get("/me", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      res.status(403).json({msg: "User doesnt exist"})
      return
    }
    res.sendStatus(200);
    });

 

  router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

  router.post('/note', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    const note = new Note({...req.body,userId : user.id});
    if (!user) {
      res.status(403).json({msg: "User doesnt exist"})
      return
    }else{
      
      await note.save();
      user.notes.push(note._id)
      await user.save();
      res.json({ message: 'Note created successfully', note : note});
    }  
  });

  router.put('/note/:id',authenticateJwt,async(req,res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body,{new: true});
    if(note){
      res.json({message : "Note updated successfully"})
    }else{
      res.status(404).json({message : 'Note not found'})
    }
  })

  router.delete("/delete/:id", authenticateJwt,async (req,res) => {
    try {
      const noteId = req.params.id;
      const deletedItem = await Note.findByIdAndRemove(noteId);

      if(!deletedItem){
        return res.status(404).json({message : "Item not found"})
      }
      const userId = deletedItem.userId;
      await User.findByIdAndUpdate(userId, {$pull: {notes: noteId}})

      return res.json({message : 'Note deleted', noteId});
    } catch(error){
      console.error('Error deleting item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })


  router.get('/notes', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username });
    const userNotes = [];  
      for(y in user.notes){
        const n = await Note.findById(user.notes[y])
        userNotes.push(n);
      }
    res.json({ notes : userNotes});
  });
  

  module.exports = router