const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.get('/hello', (req, res) => {
  res.send('world!');
});

app.post('/callback', (req, res) => {
  admin
    .database()
    .ref('/hello')
    .push({ hello: 'world' });
});

exports.webApi = functions.https.onRequest(main);
