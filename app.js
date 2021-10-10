





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

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

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
  console.log('small success');
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()) {
      return next();
  } else {
      console.log('another small success');
      return res.redirect('/login');
  }
}

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});

client.connect();

