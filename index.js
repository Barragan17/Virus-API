const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/virusAPI");

const virusSchema = {
    name: String,
    desc: String,
    deathRate: String,
    symptomps: Array
}

const Virus = mongoose.model('Virus', virusSchema);


app.listen(port, function(){
    console.log("Server is listening on port: " + port);
});