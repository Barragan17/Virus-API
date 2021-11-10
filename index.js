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

app.route('/viruses')

.get(function(req, res){
    Virus.find(function(err, resultVirus){
        if(!err){
            res.send(resultVirus);
        } else {
            res.send(err);
        }
    });
})

.post(function(req, res){ 

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

app.route('/viruses/:virusName')

// getting specific viruses
.get(function(req, res){
    Virus.findOne({name: req.params.virusName}, function(err, foundVirus){
        if(foundVirus){
            res.send(foundVirus);
        } else {
            res.send("Virus Cannot be Found");
        }
    }); 
})

.put(function(req, res){
    Virus.replaceOne({name: req.params.virusName}, {
        name: req.body.name,
        desc: req.body.desc,
        deathRate: req.body.deathRate,
        symptomps:  req.body.symptomps}, function(err){
            if(!err){
                res.send('Successfully update article');
            } else {
                res.send('Error with e: ' + err)
            }
        });
})

// deleting specific viruses
.delete(function(req, res){
    Virus.deleteOne({name: req.params.virusName}, function(err){
        if(!err){
            res.send("Delete Specific Virus Success");
        } else {
            res.send("Failed to catch error with error: " + err);
        }
    });
});

app.listen(port, function(){
    console.log("Server is listening on port: " + port);
});