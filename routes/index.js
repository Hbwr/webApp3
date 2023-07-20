var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/* GET anything else. */
router.get("/hello", function (req, res, next) {
    var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log(fullUrl);
    res.status(200).send("Hello world");
});

module.exports = router;
