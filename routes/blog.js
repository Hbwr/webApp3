const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const blogController = require("../public/controllers/blogController");
let fetch = require("node-fetch");

//DEBUG: get the root dir
console.log("path: ", path.resolve(__dirname));

/**
 * STYLE elements for the view
 *  */
formSubmit = { action: "/blog", method: "POST" }; //!!!!!  '/blog' oder '/api/blog'
formStyle = {
    class: "mb-3",
    label: "form-label",
    input: "form-control",
};
formInputs = [
    {
        label: "Name:",
        inputType: "text",
        id: "name",
        name: "name",
        required: false,
    },
    {
        label: "Date:",
        inputType: "date",
        id: "date",
        name: "date",
        required: false,
    },
    {
        label: "Time:",
        inputType: "time",
        id: "time",
        name: "time",
        required: false,
    },
    {
        label: "Title:",
        inputType: "text",
        id: "title",
        name: "title",
        required: true,
    },
];
formTextFields = [
    {
        label: "Text:",
        id: "text",
        name: "text",
        rows: "5",
        required: true,
    },
];

/**
 * API as REST
 */
//Funktion muss als asynchron angegeben sein
let handleAPICalls = async (url, method, body) => {
    //body ist nur optionaler parameter
    let response = null;
    response = await fetch(url, {
        //AWAIT für asynchrone requests
        //
        method: method,
        body: JSON.stringify(body),
    });
    console.log("handleAPICalls:" + response);
    // return response; //line[0]
    return response.json(); //line[1]
};

/**
 * An actual API: do not put it here like this!!
 */
//Chuck Norris API kann in einem anderen Fetch abgerufen wird (zuerst der erste API-Call, dann der nächste)

let getJoke = async (body) => {
    let joke = null;
    joke = await fetch("https://api.chucknorris.io/jokes/random", {
        //AWAIT für asynchrone requests
        //
        method: "get",
        body: JSON.stringify(body),
    });
    console.log("getJoke:" + joke);
    // return joke; //line[0]
    return joke.json(); //line[1]
    return joke;
};

//127.0.0.1:3000/blog per POST
router
    .route("/")
    //muss async sein für gewisse Fälle bei fetch: line[2], nicht für line[3]
    /* .get((req, res, body) => {
        //per handleAPICalls Daten beschaffen
        //line[2]
        //let apiResponse = handleAPICalls("http://127.0.0.1:3000/api/blog", "get"); //braucht async in der Funktion
        // console.log(apiResponse);
        
    });*/
    .get((req, res) => {
        handleAPICalls("http://127.0.0.1:3000/api/blog", "get")
            .then(async (apiResponse) => {
                //Chuck Norris API kann in einem anderen Fetch abgerufen wird (zuerst der erste API-Call, dann der nächste)
                let joke = await getJoke().catch((err) => console.log(err));

                //besserer Fetch: braucht kein async in der Funktion (line[3])
                console.log(
                    "get responses ###########################################"
                );
                console.log(apiResponse);
                console.log(apiResponse.data);
                res.render("blog", {
                    title: "Übersicht über alle Beiträge",
                    blogData: apiResponse.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .post((req, res) => {
        console.log("opened / per POST");
        console.log(res);

        blogController.createBlog(req, res);
        let apiResponse = handleAPICalls(
            "http://127.0.0.1:3000/api/blog/" + blogController.amountBlogs(),
            "get"
        ).then(async (response) => {
            console.log(response.data);

            let joke = await getJoke();

            res.status(201).render("blogpost", {
                title: "Create And Read A Blog Post",
                /// formular.ejs
                formSubmit: formSubmit,
                formStyle: formStyle,
                formInputs: formInputs,
                formTextFields: formTextFields,
                showSuccess: true,
                submitMode: true,
                editMode: false,
                joke: joke.value,
                ///viewPost.ejs
                requestedBlog: response.data,
            });
        });
    });

//127.0.0.1:3000/blog/newPost per GET
router.get("/newPost", (req, res, next) => {
    let apiResponse = handleAPICalls(
        "http://127.0.0.1:3000/api/blog/" + blogController.amountBlogs(),
        "get"
    ).then(async (response) => {
        // console.log(response.data);

        let joke = await getJoke();

        res.render("blogpost", {
            title: "Create And Read A Blog Post",
            /// formular.ejs
            formSubmit: formSubmit,
            formStyle: formStyle,
            formInputs: formInputs,
            formTextFields: formTextFields,
            showSuccess: false,
            submitMode: true,
            editMode: false,
            ///viewPost.ejs
            requestedBlog: response.data,
            joke: joke.value,
        });
    });
});

//127.0.0.1:3000/blog/:id per GET
router.get("/:id", (req, res, next) => {
    console.log("12.2");
    console.log(req.params.id);
    let apiResponse = handleAPICalls(
        "http://127.0.0.1:3000/api/blog/" + req.params.id,
        "get"
    ).then(async (response) => {
        // console.log(response.data);

        let joke = await getJoke();

        res.render("blogpost", {
            title: "Create And Read A Blog Post",
            /// formular.ejs
            formSubmit: formSubmit,
            formStyle: formStyle,
            formInputs: formInputs,
            formTextFields: formTextFields,
            showSuccess: false, //display sent message
            submitMode: false,
            editMode: true,
            ///viewPost.ejs
            requestedBlog: response.data,
            joke: joke.value,
        });
    });
});

/**
 * Local Controller
 */

//127.0.0.1:3000/blog per POST
/* router
    .route("/")
    .get((req, res) => {
        blogController.getAllBlogs(req, res);
    })
    .post((req, res) => {
        console.log("opened / per POST");
        blogController.readAndWriteBlog(req, res);
        res.redirect("/blog/newPost");
    });

//127.0.0.1:3000/blog/newPost per GET
router.get("/newPost", (req, res, next) => {
    console.log("opened newPost");
    blogController.startNewBlog(req, res, next);
});

//127.0.0.1:3000/blog/:id per GET
router.get("/:id", function (req, res) {
    blogController.readBlog(req, res);
}); */

module.exports = router;
