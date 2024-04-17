const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var cors = require('cors')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());

var sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT, bio TEXT)");
db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, user_id INTEGER, title TEXT, content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)")

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username)
    console.log(email)
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }

        return res.status(201).send('User created');
    })
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], function(err, rows) {
        const user = rows;

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });

            res.json({ token: token, user: user});
        } else {
            res.status(401).send('Credentials are wrong');
        }
    });

});

app.patch('/users/:id', authenticateToken, (req, res) => {
    const id = req.params.id;
    const { bio, username, email } = req.body;

    db.run("UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?", [username, email, bio, id], function(err) {
        if (err) {
            res.status(401).send(err);
        }

        db.get("SELECT * FROM users WHERE id = ?", [id], function(err, rows) {
            const user = rows;

            res.json({ user: user});
        });
    });
});

// POST pour créer une nouvelle note
app.post('/users/notes', authenticateToken, (req, res) => {
    const { userId, title, content } = req.body;
    db.run("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)", [userId, title, content], function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error creating the note');
        }
        res.status(201).send({ message: "Note created", noteId: this.lastID });
    });
});

// GET pour lire toutes les notes d'un utilisateur
app.get('/users/:userId/notes', authenticateToken, (req, res) => {
    const userId = req.params.userId;
    db.all("SELECT * FROM notes WHERE user_id = ?", [userId], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving notes');
        }
        res.send(rows);
    });
});

// PUT pour mettre à jour une note spécifique
app.put('/users/:userId/notes/:noteId', authenticateToken, (req, res) => {
    const { userId, noteId } = req.params;
    const { title, content } = req.body;
    db.run("UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?", [title, content, noteId, userId], function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error updating the note');
        }
        if (this.changes === 0) {
            res.status(404).send('Note not found or no change made');
        } else {
            res.send({ message: "Note updated", noteId, title, content });
        }
    });
});

// DELETE pour supprimer une note spécifique
app.delete('/users/:userId/notes/:noteId', authenticateToken, (req, res) => {
    const { userId, noteId } = req.params;
    db.run("DELETE FROM notes WHERE id = ? AND user_id = ?", [noteId, userId], function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Error deleting the note');
        }
        if (this.changes === 0) {
            res.status(404).send('Note not found');
        } else {
            res.send({ message: "Note deleted", noteId });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
