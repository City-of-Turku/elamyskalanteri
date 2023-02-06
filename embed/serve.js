const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/events/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/event_detail.html'));
});

const server = app.listen(8001, () => {
    console.log("Listening on http://localhost:8001");
});
