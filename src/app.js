const express=require("express");
const app=express();
const ejs=require("ejs")
const bodyParser=require("body-parser");
const port=process.env.PORT||3000;
const axios = require("axios");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/weather",(req,res)=>{
    res.render("weather");
})
app.get("*",(req,res)=>{
    res.send("404 error");
})
app.listen(port,(req,res)=>{
    console.log(`Server is listening on port ${port}`);
})