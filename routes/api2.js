const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

/**
 * Random API
 */
const encodedParams = new URLSearchParams();
encodedParams.set("BotBirthMonth", "March");
encodedParams.set("BotBirthPlace", "India");
encodedParams.set("BotFavBook", "Harry Potter");
encodedParams.set("BotGender", "Male");
encodedParams.set("BotBirthDate", "1");
encodedParams.set("BotBirthYear", "2020");
encodedParams.set("BotMaster", "Naman Sharma");
encodedParams.set("BotFavActor", "Jim Carrey");
encodedParams.set("BotLocation", "India");
encodedParams.set("BotBuild", "Public");
encodedParams.set("BotFavBand", "1D");
encodedParams.set("BotFavActress", "Emma Watson");
encodedParams.set("BotFavColor", "Black");
encodedParams.set("BotFavArtist", "Eminem");
encodedParams.set("BotName", "Black Sheep");
encodedParams.set("BotAge", "19");
encodedParams.set("BotCompany", "PGamerX");
encodedParams.set("BotEmail", "admin@pgamerx.com");

const url = "https://random-stuff-api.p.rapidapi.com/ai/customize";
const options = {
    method: "POST",
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "q9Oh7Lg7J0Hd",
        "X-RapidAPI-Key": "7a6ca0963bmsh867e9ca269415f4p12b581jsn77028a158fed",
        "X-RapidAPI-Host": "random-stuff-api.p.rapidapi.com",
    },
    body: encodedParams,
};

//DEBUG: get the root dir
console.log("path: ", path.resolve(__dirname));

router
    .route("/")
    .get((req, res) => {
        console.log("API2 opened / per GET");
        res.status(200).render("apis", { title: "APIs" });
    })
    .post(async (req, res) => {
        console.log("API2 opened / per POST");
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        res.json(result);
    });

module.exports = router;
