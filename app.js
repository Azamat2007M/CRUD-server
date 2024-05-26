const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

const db = new Datastore({ filename: 'data.db', autoload: true });

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/items', (req, res) => {
    db.find({}, (err, items) => {
        if (err) {
            res.status(500).send({ error: "Server Error" });
        } else {
            res.send(items);
        }
    });
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    db.insert(newItem, (err, item) => {
        if (err) {
            res.status(500).send({ error: "Server Error" });
        } else {
            res.status(201).send(item);
        }
    });
});

app.patch('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updateItem = req.body;

    db.update({ _id: itemId }, { $set: updateItem }, (err, numReplaced) => {
        if (err) {
            res.status(500).send({ error: "Server Error" });
        } else if (numReplaced === 0) {
            res.status(404).send({ error: 'Element not found' });
        } else {
            res.send({ message: 'Element updated' });
        }
    });
});

app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    db.remove({ _id: itemId }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send({ error: "Server Error" });
        } else if (numRemoved === 0) {
            res.status(404).send({ error: "Element not found" });
        } else {
            res.send({ message: "Element successfully deleted" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
