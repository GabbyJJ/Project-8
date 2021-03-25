var express = require("express");
var router = express.Router();

// This will get users listing.
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
