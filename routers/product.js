


const client = require('../connection.js');


const express = require('express');
const customerRouter = express.Router();


customerRouter.get('/', (req, res) => {
    client.query(`Select * from product`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
  })




module.exports = customerRouter;