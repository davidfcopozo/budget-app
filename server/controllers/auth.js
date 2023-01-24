const { StatusCodes } = require("http-status-codes");

const login = (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ msg: "TEST Invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  return res.send(token);
};

const signup = (req, res) => {
  if (!req.headers.authorization) {
    res.status(StatusCodes.UNAUTHORIZED).send({ msg: "Invalid token" });
  }

  const token = req.headers.authorization.split(" ")[1];
  return res.status(200).send(token);
};

module.exports = { login, signup };
