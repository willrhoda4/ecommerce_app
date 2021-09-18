


const client           = require('../connection.js');

const express          = require('express');
const loginRouter      = express.Router();
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




    loginRouter.post('/', passport.authenticate('local', { failureRedirect: '/fail',
                                                            successRedirect: '/success'}));



                                                   
    loginRouter.post('/register', 
    function (req, res, next) {

        client.query(`SELECT * FROM customer WHERE username = '${req.body.username}'`, (err, result) => {

        if (result.rowCount > 0 ) { return res.status(400).send('username already spoken for!') }
        next();

        });

    },
    async function (req, res, next) {
    
        let lastUser = await client.query(`SELECT * FROM customer ORDER BY id DESC LIMIT 1`);
        let newId = lastUser.rows[0].id + 1;

        client.query(`INSERT INTO customer (id, username, password)
                                    VALUES (${newId}, '${req.body.username}', '${req.body.password}')`
        );
        res.status(200).send('oh yeah');
        console.log('hmm...');

    });

   




    

module.exports = loginRouter;