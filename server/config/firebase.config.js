const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey.json");

const serviceAccount = {
  type: REACT_APP_TYPE,
  project_id: REACT_APP_PROJECT_ID,
  private_key_id: REACT_APP_PRIVATE_KEY_ID,
  private_key: REACT_APP_PRIVATE_KEY,
  client_email: REACT_APP_CLIENT_EMAIL,
  client_id: REACT_APP_CLIENT_ID,
  auth_uri: REACT_APP_AUTH_URI,
  token_uri: REACT_APP_TOKEN_URI,
  auth_provider_x509_cert_url: REACT_APP_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: REACT_APP_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

module.exports = admin;
