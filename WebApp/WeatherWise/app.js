const { log } = require("console");
const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // to parse html form
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { C1: "", C2: "", image: "" })
});

app.post('/', (req, res) => {

    let query = req.body.cityInput;
    query = query[0].toUpperCase() + query.slice(1, query.length)

    const apiKey = "0108b0ecf9a999d35ce4e1250f46c3a7"; // you can use you own API Key
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            var content1 = `The temperature in ${query} is:  ${temp} °C.`
            var content2 = `The weather is currently: ${desc}`

            res.render('index', { C1: content1, C2: content2, image: imgURL })

        });

    });
});

app.listen(port, () => {
    console.log(`The Server is running on http://localhost:${port}`);
});