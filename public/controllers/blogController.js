const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//DEBUG: get the root dir
console.log("path: ", path.resolve(__dirname));
// Get the blogs from the previous session
const blogData = JSON.parse(
    fs.readFileSync("./public/models/blog.json", "utf-8")
);

const getAllBlogs = (req, res) => {
    res.status(200).json({ success: true, data: blogData }); //webserver erhält infos zum Debugging
};

const createBlog = (req, res) => {
    const { name, date, time, title, text } = req.body;
    let id = blogData.length != 0 ? blogData[blogData.length - 1].id + 1 : 0; //do not use Strings for id!!
    const newBlogPost = {
        id,
        name,
        date,
        time,
        title,
        text,
    };

    console.log("in createBlog() before push()");
    console.log("text: " + text);
    console.log("req.params.text: " + req.params.text);

    //save blog posts into the blog array
    blogData.push(newBlogPost);

    console.log("in createBlog(): after push()");
    console.log("text: " + text);
    console.log("req.params.text: " + req.params.text);

    //save blog array into the model file
    let data = JSON.stringify(blogData);
    fs.writeFileSync("./public/models/blog.json", data, "utf-8");
    console.log("createdBlog:" + data);
};

const readBlog = (req, res) => {
    console.log("executing readBlog");

    //search blog entry array for blogId
    let foundIndex = blogData.findIndex((p) => p.id == req.params.id);

    foundIndex == -1
        ? res
              .status(404)
              .json({ success: false, data: "Kein Eintrag gefunden" })
        : res.status(200).json({ success: true, data: blogData[foundIndex] });
};

const updateBlog = (req, res) => {
    let foundIndex = blogData.findIndex((p) => p.id == req.params.id);

    if (foundIndex != null) {
        //replace every entry of blogDate[foundIndex] with req.params.<fieldName>, where <fieldName> is the name of each field
        //identisch zu
        Object.assign(blogData[foundIndex], req.body);

        //blogData[foundIndex].name = newName ? newName : "";
        let data = JSON.stringify(blogData);
        fs.writeFileSync("./public/models/blog.json", data, "utf-8");
        res.status(200).json({ success: true, data: blogData });
    } else {
        createBlog(req, res);
        console.log("else");
        res.status(404).json({ success: false });
    }
};

const deleteBlog = (req, res) => {
    let found = blogData.find((p) => p.id == req.params.id);
    let foundIndex = blogData.indexOf(found);
    //identisch zu
    foundIndex = blogData.findIndex((p) => p.id == req.params.id);
    if (foundIndex != -1) {
        blogData.splice(foundIndex, 1);
        let data = JSON.stringify(blogData);
        fs.writeFileSync("./public/models/blog.json", data, "utf-8");
    }
    res.status(200).json({ success: true, data: blogData });
};

const startNewBlog = (req, res, next) => {
    ///10.1 Dynamisches Formular
    formSubmit = { action: "/blog", method: "POST" };
    formStyle = { class: "mb-3", label: "form-label", input: "form-control" };
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
            id: "text",
            name: "title",
            required: true,
        },
    ];
    formTextFields = [
        { label: "Text:", id: "text", name: "text", rows: "5", required: true },
    ];

    console.log(formInputs[0].label);

    console.log("localhost/blog/newPost per GET");
    res.render("blogpost", {
        title: "Create A Blog Post",
        userData: JSON.stringify(
            blogData[blogData.length - 1] //display last post
        ),
        formSubmit: formSubmit,
        formStyle: formStyle,
        formInputs: formInputs,
        formTextFields: formTextFields,

        showSuccess: true,
    });
};

const amountBlogs = () => {
    console.log("No. of blogs:" + (blogData.length - 1));
    return blogData.length - 1;
};

module.exports = {
    getAllBlogs,
    createBlog,
    readBlog,
    startNewBlog,
    deleteBlog,
    updateBlog,
    amountBlogs,
};
