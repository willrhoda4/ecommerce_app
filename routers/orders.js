


const client           = require('../connection.js');

const express          = require('express');
const ordersRouter      = express.Router();
const app              = express();
const session          = require('express-session');
                         app.use(session({
                           secret: 'W$q4=25*8%v-}UV',
                           resave: true,
                           saveUninitialized: true
                         }));

const cors             = require('cors');
                         app.use(cors());

const bodyParser       = require("body-parser");
                         app.use(bodyParser.json());
                         app.use(express.json());

const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
                         app.use(passport.initialize());
                         app.use(passport.session());



    ordersRouter.get('/', (req, res) => {
        client.query(`SELECT * FROM orders`, (err, result) => {
            if(!err){
                res.send(result.rows);
            }
        });
        client.end;
    })


    

    ordersRouter.get('/:id', (req, res) => {
        client.query(`SELECT * FROM orders WHERE id = ${req.body.id}`, (err, result) => {
            if(!err) {
                if (result.rowCount === 0 )     {  res.status(404).send('order id not found.');  } 
                else                            {  res.send(result.rows);  }
            }
        });
        client.end;
    })
   
   




    

module.exports = ordersRouter;