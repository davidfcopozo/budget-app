const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey.json");
require("dotenv").config;

const { REACT_APP_SERVICE_ACCOUNT_KEY } = process.env;

const parsedServiceAccount = JSON.parse(REACT_APP_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(parsedServiceAccount),
});

module.exports = admin;
