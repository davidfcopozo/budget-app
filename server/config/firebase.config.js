const admin = require("firebase-admin");

const serviceAccountEnv = require("./serviceAccountKeyEnv.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountEnv),
});

module.exports = admin;
