const admin = require("firebase-admin");
require("dotenv").config;

const serviceKey = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
});

module.exports = admin;
