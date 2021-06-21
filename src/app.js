const express=require("express");
const app=express();
const ejs=require("ejs")
const bodyParser=require("body-parser");
const port=process.env.PORT||3000;
const axios = require("axios");

var cday = new Date();
var ab = null;
var cityName = null;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/weather", (req, res) => {
    const temp_api_key=process.env.temp_key
    async function axiosTest() {
      ab = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather?units=metric",
        { params: { appid:temp_api_key,q: cityName } }
      );
      return ab;
    }
    axiosTest()
      .then((data) => {
        res.render("weather", {
          location: cityName,
          day: dayNames[cday.getDay()],
          month: monthNames[cday.getMonth()],
          date: cday.getDate() ,
          currenttemp: data.data.main.temp,
        });
      })
      .catch((err) => console.log(err));
  });
app.get("*",(req,res)=>{
    res.render("error");
})
app.listen(port,(req,res)=>{
    console.log(`Server is listening on port ${port}`);
})