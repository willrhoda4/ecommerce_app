





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



const loginRouter = require('./routers/login.js');
app.use('/login', loginRouter);

const productRouter = require('./routers/product.js');
app.use('/product', productRouter);

const userRouter = require('./routers/user.js');
app.use('/user', userRouter);

const cartRouter = require('./routers/cart.js');
app.use('/cart', cartRouter);

const ordersRouter = require('./routers/orders.js');
app.use('/orders', ordersRouter);





                                                                app.get('/fail', (req, res) => { console.log('you failed!'); res.send('you failed!') });

                                                                app.get('/success', isLoggedIn, (req, res) => { 
                                                                  console.log('you succeeded!'); 
                                                                  console.log(req.user);
                                                                  console.log(req.user.username);
                                                                  console.log(req.isAuthenticated());
                                                                  
                                                                  console.log(req.user);
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

