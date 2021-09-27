const express = require("express");
const router = express.Router();

router.use('/postv2', require("./postv2"))

module.exports = router;