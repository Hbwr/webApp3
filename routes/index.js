var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log("help");
    res.render("index", { title: "The Rice Field" });
});

module.exports = router;
