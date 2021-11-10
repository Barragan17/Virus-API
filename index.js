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

const Virus = mongoose.model('viruses', virusSchema);

// get protocol restful api
app.get('/viruses', function(req, res){
    Virus.find(function(err, resultVirus){
        if(!err){
            res.send(resultVirus);
        } else {
            res.send(err);
        }
    });
});

app.post('/viruses', function(req, res){
    console.log();
    console.log();
    console.log();
    console.log(); 

    const newVirus = new Virus({
        name:req.body.name,
        desc:req.body.desc,
        deathRate:req.body.deathRate,
        symptomps:req.body.symptomps
    });

    newVirus.save(function(err){
        if(!err){
            res.send("Successfully Insert Data");
        } else {
            res.send(err);
        }
    });
});

app.listen(port, function(){
    console.log("Server is listening on port: " + port);
});