





const client           = require('./connection.js');

const express          = require('express');
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

 
app.post('/login', 
          passport.authenticate('local', { failureRedirect: '/fail',
                                           successRedirect: '/success'}));







app.post('/register', 
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

                                                                app.get('/fail', (req, res) => { console.log('you failed!'); res.send('you failed!') });

                                                                app.get('/success', isLoggedIn, (req, res) => { 
                                                                  console.log('you succeeded!'); 
                                                                  console.log(req.user.username);
                                                                  console.log(req.isAuthenticated());
                                                                  req.logout();
                                                                  console.log(req.isAuthenticated());
                                                                  console.log('oh snap!');
                                                                  res.send('you succeeded!') 
                                                                });

passport.use(new LocalStrategy( (username, password, done) => {

    client.query(`SELECT username FROM customer WHERE username = '${username}'
                                                  AND password = '${password}'`, (err, result) => {
      if (err)                             { return done(err); }
      if (result.rowCount !== 1)           { return done(null, false); }
      if (result.rowCount === 1)           { return done(null, {username} ); }
     
    });

}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, {username: username});
}); 

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  } else {
      return res.redirect('/login');
  }
}

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});

client.connect();

