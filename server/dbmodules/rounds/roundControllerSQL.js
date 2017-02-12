var mysql = require('promise-mysql');
//var Promises = require('bluebird');
var connection;

module.exports = {
  newRound : function(req, res, next) {
    return createRound(req.body).then(function(round) {
      if (round) {
        res.json(round);
      } 
      next();
    }).fail(function(err){
      next(err);
    });
  },

  getRounds : function(req, res, next) {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'healthwars'
    }).then(function(conn){
        connection = conn;
  
        return connection.query('select c.id, c.name as name, e.name as exercises from competition c inner join exercises e on e.id = c. id_exercises');
    }).then(function(rows){
        // Logs out a list of hobbits 
        console.log(rows);
        res.json(rows);
        
    });
  },

  getRound : function(req, res, next) {
    return findRound(req.body).then(function(round){
      if(round) {
        res.json(round);
      }
      next();
    }).fail(function(err){
      next(err);
    });
  }

};