const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

app.use(cors({ origin: true }));

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.post('/withingsAccess', async (req, res) => {
  const { data } = req.body;
  const d = {
    ...data.params,
    client_secret: functions.config().withings.secret
  };

  const response = await axios({
    method: 'post',
    url: 'https://account.withings.com/oauth2/token',
    data: qs.stringify(d),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });

  await setWithingsAccessToken(response.data, data.uid);
  res.send({ data: true });
});

const setWithingsAccessToken = async (access, uid) => {
  const snapshot = await admin
    .database()
    .ref(`${uid}/withings/`)
    .update(access);
  return snapshot;
};

exports.webApi = functions.https.onRequest(main);
