


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
const bcrypt =           require("bcryptjs");


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


    loginRouter.get('/', (req, res) => {
        
        console.log('onyourmarks')
        if ( req.isAuthenticated() )  { console.log('lane 1'); res.status(200).send(req.user.username);         }
        else                          { console.log('lane 2'); res.status(403).send('STILL NOT LOGGED IN!!!');  }

        client.end;
    })

    loginRouter.get('/logout', function(req, res){
        req.logout();
        res.send('logged out!');
      });







    loginRouter.post('/', (req, res, next) => {
        console.log('step 1');

        passport.authenticate("local", (err, user) => {
            console.log('step2');
          if (err) throw err;
          if (!user) res.status(203).send("incorrect username or password");
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.send(req.user.username);
              console.log("Successfully Authenticated");
            });
          }
        })(req, res, next);
      });



                                                   
    loginRouter.post('/register', 
    function (req, res, next) {

        console.log('step1');
        client.query(`SELECT * FROM customer WHERE username = '${req.body.username}'`, (err, result) => {

        console.log('step2');
        console.log(result.rowCount);
        if (result.rowCount > 0 ) { return res.status(203).send('username already spoken for!') }
        next();

        });

    },
    async function (req, res, next) {
        console.log('step3');

        let lastUser = await client.query(`SELECT * FROM customer ORDER BY id DESC LIMIT 1`);
        let newId = lastUser.rows[0].id + 1;
        let hashedPassword = await bcrypt.hash(req.body.password, 10);

        client.query(`INSERT INTO customer (id, username, password)
                                    VALUES (${newId}, '${req.body.username}', '${hashedPassword}')`
        );
        passport.authenticate('local')(req, res, function () {
            console.log('step4');
            console.log(req.user);
            res.status(200).send(req.user.username);
            console.log("Successfully Registered");

        })
        


      
        
        console.log('hmm...');

    });

  
/*

 passport.authenticate("local", (err, user) => {
          if (err) throw err;
          if (!user) res.status(203).send("incorrect username or password");
          else {
            req.logIn(user, (err) => {
              if (err) throw err;
              res.send(req.user.username);
              console.log("Successfully Authenticated");
            });
          }
        })(req, res, next);


app.post('/sign', function(req, res){
    authProvider.saveUser(...do stuff), function(error, user){
        if(error){
            res.redirect('/sign');
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/account');
            })
        }
    });
});   

    loginRouter.post("/register", (req, res) => {
        User.findOne({ username: req.body.username }, async (err, doc) => {
          if (err) throw err;
          if (doc) res.send("User Already Exists");
          if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
            const newUser = new User({
              username: req.body.username,
              password: hashedPassword,
            });
            await newUser.save();
            res.send("User Created");
          }
        });
      });
*/

    

module.exports = loginRouter;