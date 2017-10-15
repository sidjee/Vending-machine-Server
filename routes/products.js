var express = require('express'),
    jwt     = require('jsonwebtoken'),
    config  = require('../config'),
    db      = require('../db');

var app = module.exports = express.Router();


function getvendorDB(req,res,done){
    
    db.get().query('SELECT A,B,C,D FROM products WHERE id = ? LIMIT 1',[req.params.vendorId], function(err, row) {
        
        if (err) {

            res.status(500).send('An internal error occured');
            console.log(err);
        }
        
        else
            done(row);
    });
}


function updatevendorDB(req,res,done){

    var list = req.body;
    var vendor = req.params.vendorId;
    
    db.get().query('UPDATE products SET A = ?, B = ?, C = ?, D = ? WHERE id = ?',[list.A,list.B,list.C,list.D,vendor],
    
    function(err, rows) {
        if (err) {
            res.status(501).send('Could not implement the request');
            console.log(err);
        }

        else 
            done(rows);
    });

}

function deleteVendor(req,res,done) {
    // body...

    db.get().query('DELETE FROM products WHERE id = ?',[req.params.vendorId], function(err, rows) {
        
        if (err) {

            res.status(500).send('An internal error occured');
            console.log(err);
        }
        
        else
         done(rows);
    });    
}

function addVendor(req,res,done) {
    // body...
    var l = req.body
    db.get().query('INSERT INTO products (A,B,C,D) VALUES (?,?,?,?)',[l.A,l.B,l.C,l.D], function(err,result) {
        
        if (err) {

            res.status(500).send('An internal error occured');
            console.log(err);
        }
        
        else 
            done(result);
    });    

}

app.use('/vendor', function (req,res,next) {
    // body...

    var token = req.headers['token']||req.body.token;

    if(!token){
        res.status(401).send('Please Login first!');
    }

    else{

        jwt.verify(token,config.secretKey,function (err) {
            // body...

            if(err){
                res.status(500).send('token Invalid. Login AGAIN');
                console.log(err);
            }

            else{
                next();
            }

        });
    }

});

app.route('/vendor/:vendorId')

.get(function(req, res, next) {

    getvendorDB(req,res,function(result) {
        res.status(200).send(result);
    });

    //next();

})

.put(function (req,res,next) {
    // body...

    getvendorDB(req,res,function (info) {
        // body...

        if(!info){
            res.status(404).send('Vendor not found');
        }

        else{

            if(!req.body){
                res.status(400).send('Send the information to be updated');
            }

            else{
                updatevendorDB(req,res,function (result) {
                    // body...
                    res.status(200).send(result);
                });
            }
        }
    });
    //next();
})

.delete(function (req,res,next) {
    // body...

    getvendorDB(req,res,function (info) {
        // body...

        if(!info){
            res.status(404).send('Vendor not found');
        }

        else{
            deleteVendor(req,res,function (result) {
                // body...
                res.status(200).send('Deleted the vendor');
            });
            
        }
    });
    //next();
})

app.post('/vendor/add',function (req,res,next) {
    // body...
    
        
            if(!req.body){
                res.status(400).send('Send the information to be added.');
            }
            else{
                addVendor(req,res,function (vendor) {
                    // body...
                    res.status(200).send(vendor.insertId);
                });
            }
        
    
    //next();
})