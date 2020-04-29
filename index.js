const express = require('express')
const app = express();
const router = require('./routes/user')

const bodyParser = require('body-parser');
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

app.get("/", (req, res, next) => {
    res.send("Root Directory");
});

app.listen(3000, () => {
    console.log("The server is listening on port 3000...")
});

