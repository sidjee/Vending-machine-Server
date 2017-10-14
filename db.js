var mysql = require('mysql');
var pool  = null;
var pass = require('../mypass.js');


exports.connect = function() {
  pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : pass,
    database : 'vendor'
  });
}

exports.get = function() {
  return pool;
}