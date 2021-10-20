





const client           = require('./connection.js');

const express          = require('express');
const session          = require('express-session');
                       

const cors             = require('cors');

const bodyParser       = require("body-parser");
const cookieParser     = require("cookie-parser");
                       


const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const bcrypt           = require('bcryptjs');                       



const app  = express();

app.use(cors({
  origin: "http://localhost:3001", 
  credentials: true
}));


app.use(session({
                  secret: 'W$q4=25*8%v-}UV',
                  resave: true,
                  saveUninitialized: true
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secretcode"));


app.use(express.json());

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









                                              

passport.use(new LocalStrategy(  async function (username, password, done) {

  try {

    let user                             = await client.query(`SELECT username, password FROM customer WHERE username = '${username}'`);  
    if (user.rowCount !== 1)             { console.log('user not found!');     return done(null, false); }

    let hashedPassword                   = user.rows[0].password; 
    let match                            = await bcrypt.compare(password, hashedPassword);

    if (!match)                          { console.log('error!');              return done(null, false); }
    if (match)                           { console.log('passwords match!');    return done(null, {username} ); }

  } catch (error)                        { console.log('and we...'); } 

}))






passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, {username: username});
}); 

 

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});

client.connect();