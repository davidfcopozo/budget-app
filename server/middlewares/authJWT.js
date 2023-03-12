const { StatusCodes } = require("http-status-codes");
const admin = require("../config/firebase.config");

const authJWT = async (req, res, next) => {
  const authHeader = await req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authentication invalid");
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: error.message, msg: "Invalid token" });
  }
};

module.exports = authJWT;
