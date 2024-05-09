const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'Tiger',
    database: 'test'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// Middleware to parse JSON data
app.use(express.json());

// API endpoint to get all notes
app.get('/api/notes', (req, res) => {
    connection.query('SELECT * FROM notes', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API endpoint to add a new note
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    connection.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, title, content });
    });
});

// API endpoint to delete a note
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Note deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
