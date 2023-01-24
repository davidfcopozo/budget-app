const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth");

router.route("/login").get(login);
router.route("/signup").get(signup);

module.exports = router;
