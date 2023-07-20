const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const blogController = require("../public/controllers/blogController");

//DEBUG: get the root dir
console.log("path: ", path.resolve(__dirname));

function stupidCode(req) {
    // const { name, title } = req.query.body;
    let name = JSON.stringify(req.params.name);
    let title = req.params.title;
    console.log(`name: ${name}, title: ${title}`);
}

function analyzeReqRes(req, res) {
    console.log("req.body: ", JSON.stringify(req.body));
    console.log("req.originalUrl: ", JSON.stringify(req.originalUrl));
    console.log("req.params: ", JSON.stringify(req.params));
    console.log("req.query: ", JSON.stringify(req.query));
    console.log("res.app: ", JSON.stringify(res.app)); //This property holds a reference to the instance of the express application that is using the middleware.
    console.log("res.locals: ", JSON.stringify(res.locals)); //An object that contains response local variables scoped to the request
}

//127.0.0.1:3000/blog per POST
router
    .route("/blog")
    .get((req, res) => {
        console.log("API opened / per GET");

        console.log("before getting all the blogs from the controller");
        analyzeReqRes(req, res);

        blogController.getAllBlogs(req, res);

        // log the res json that the function getAllBlogs() returns
        console.log("res.json: ", JSON.stringify(res.json));

        console.log(
            "after getting all the blogs from the controller via res.json()"
        );
        analyzeReqRes(req, res);
        console.log(
            "Once the response is sent, the data is no longer stored in the res or req objects.\nIf you need to access the JSON data again, you will need to store it in a variable or data structure that is accessible from the scope where you need to use it, i.e. as an array in the controller."
        );
    })
    .post((req, res) => {
        console.log("API opened / per POST");

        analyzeReqRes(req, res);

        blogController.createBlog(req, res);

        console.log(blogController.amountBlogs());
        //get the current uri path
        let currentPath = req.originalUrl;
        console.log("currentPath: ", currentPath);

        res.redirect(currentPath, "/", blogController.amountBlogs());
        // res.redirect("/" + blogController.amountBlogs());
    });

//127.0.0.1:3000/api/blog/:id per GET
router
    .route("/blog/:id")
    .get((req, res) => {
        console.log("API opened /:id per GET");
        analyzeReqRes(req, res);

        blogController.readBlog(req, res);
    })
    .delete((req, res) => {
        console.log("API opened /:id per DELETE");
        analyzeReqRes(req, res);
        blogController.deleteBlog(req, res);
    })
    .put((req, res) => {
        console.log("API opened /:id per PUT");
        analyzeReqRes(req, res);
        blogController.updateBlog(req, res);
    });

module.exports = router;
