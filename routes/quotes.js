var express = require('express'),
    jwt     = require('jsonwebtoken'),
    config  = require('../config'),
    db      = require('../db');
var app = module.exports = express.Router();

function getPublicQuotesDB(done){
    db.get().query('SELECT * FROM quotes WHERE private=0', function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}
function getPrivateQuotesDB(done){
    db.get().query('SELECT * FROM quotes WHERE private=1', function(err, rows) {
        if (err) throw err;
        done(rows);
    });
}
app.get('/api/public/quote', function(req, res) {
    getPublicQuotesDB(function(result) {
        res.status(200).send(result);
    });
});
app.use('/api/private', function (req,res,next) {
    // body...
    var token = req.headers['token']||req.body.token;
    if(!token){
        res.send('Please send a token');
    }
    else{
        jwt.verify(token,config.secretKey,function (err) {
            // body...
            if(err){
                res.status(500).send('token Invalid');
                console.log(err);
            }
            else{
                next();
            }
        });
    }
});
app.get('/api/private/quote', function(req, res) {
    getPrivateQuotesDB(function(result) {
        res.status(200).send(result);
    });
});