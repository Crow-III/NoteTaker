const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')); // Corrected path
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')); // Corrected path
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes)); // Corrected path

  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});