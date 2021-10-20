


const client = require('../connection.js');

const express          = require('express');
const userRouter       = express.Router();

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

                         

function isLoggedIn(req, res, next) {
if(req.isAuthenticated()) {
    return next();
} else {
    return res.redirect('/login');
}
}
                        


    userRouter.get('/', (req, res) => {
        client.query(`SELECT * FROM customer`, (err, result)=>{
            if(!err){
                res.send(result.rows);
            }
        });
        client.end;
    })



    userRouter.get('/:username', (req, res) => {
        console.log('operator');
        console.log(req.session.passport.user);
        console.log();
        client.query(`SELECT * FROM customer WHERE username = '${req.session.passport.user}'`, (err, result)=>{
            if(!err) {
                if (result.rowCount === 0 )     {  res.status(404).send('user not found.');  } 
                else                            {  res.send(result.rows);  }
            }
        });
        client.end;
    })



    userRouter.put('/:id', isLoggedIn, (req, res, next) => {
        console.log('you made it this far.');
            if (req.body.username)          { client.query(`UPDATE customer SET username         = '${req.body.username}'         WHERE username = '${req.user.username}'`) };
            if (req.body.email)             { client.query(`UPDATE customer SET email            = '${req.body.email}'            WHERE username = '${req.user.username}'`) };
            if (req.body.password)          { client.query(`UPDATE customer SET password         = '${req.body.password}'         WHERE username = '${req.user.username}'`) };
            if (req.body.shipping_address)  { client.query(`UPDATE customer SET shipping_address = '${req.body.shipping_address}' WHERE username = '${req.user.username}'`) };
            if (req.body.postal_code)       { client.query(`UPDATE customer SET postal_code      = '${req.body.postal_code}'      WHERE username = '${req.user.username}'`) };
            if (req.body.city)              { client.query(`UPDATE customer SET city             = '${req.body.city}'             WHERE username = '${req.user.username}'`) };
            if (req.body.province)          { client.query(`UPDATE customer SET province         = '${req.body.province}'         WHERE username = '${req.user.username}'`) };
            if (req.body.phone)             { client.query(`UPDATE customer SET phone            = '${req.body.phone}'            WHERE username = '${req.user.username}'`) };
            res.status(200).send('user successfully updated');
            client.end;
    });


    
   


module.exports = userRouter;


