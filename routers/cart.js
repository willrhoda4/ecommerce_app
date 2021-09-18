





const client           = require('../connection.js');

const express          = require('express');
const cartRouter       = express.Router();

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



    cartRouter.get('/', isLoggedIn, (req, res) => {
      
        client.query(`SELECT customer.username AS "user",
                             product.name AS "product",
                             cart.quantity,
                             product.price AS "unit_price",
                             cart.quantity * product.price AS "subtotal"                         
                        FROM cart 
                        JOIN customer
                          ON customer.id = cart.customer_id
                        JOIN product
                          ON product.id = cart.product_id
                       WHERE customer.username = '${req.user.username}'`, (err, result) => {
                            if(!err){
                                  
                                let subtotals = [];

                                
                                for ( let i = 0; i < result.rows.length; i++ ) {
                                    subtotals.push(parseFloat(result.rows[i].subtotal));
                                }

                                let total = (subtotals.reduce((a, b) => a + b, 0)).toFixed(2);

                                
                                console.log(`your total is: ${total}`);
                                res.send(result.rows).status(200);
                            }
                        }
        );
        client.end;
    })



    cartRouter.post('/', isLoggedIn, async function (req, res) {

    

        let lastProduct                = await client.query(`SELECT * FROM cart ORDER BY id DESC LIMIT 1`);
        let newId                      = lastProduct.rows[0].id + 1;

        let currentCust                = await client.query(`SELECT * FROM customer WHERE username = '${req.user.username}' LIMIT 1`);
        let custId                     = currentCust.rows[0].id

        let existingProduct =            await client.query(`SELECT *
                                                               FROM cart
                                                               JOIN customer
                                                                 ON customer.id         = cart.customer_id
                                                              WHERE customer.username   = '${req.user.username}'
                                                                AND cart.product_id     = '${req.body.product_id}'`);

        if (existingProduct.rowCount === 1) {  client.query(`UPDATE cart
                                                                SET quantity            = quantity + ${req.body.quantity}
                                                              WHERE product_id          = ${existingProduct.rows[0].product_id}
                                                                AND customer_id         = ${existingProduct.rows[0].customer_id}`) 
                                               res.send('additional product successfully added!')
                                            };

        if (existingProduct.rowCount === 0) {   client.query(`INSERT INTO cart            (id,
                                                                                           product_id,
                                                                                           customer_id,
                                                                                           quantity)
                                                                   VALUES                 (${newId}, 
                                                                                           ${req.body.product_id}, 
                                                                                           ${custId}, 
                                                                                           ${req.body.quantity})`)
                                                res.send('new product successfully added!')
                                            };    
        client.end
    });



    cartRouter.delete('/', isLoggedIn, async function (req, res) {


        let currentCust                = await client.query(`SELECT * FROM customer WHERE username = '${req.user.username}'`);
        let custId                     = currentCust.rows[0].id


        let isInCart                   = await client.query(`SELECT * FROM cart WHERE customer_id = ${custId} AND product_id = ${req.body.product_id}`);
        if (isInCart.rowCount === 0)   {  res.status(404).send('something went wrong! this item isn\'t in your cart!');  }


        if (parseFloat(req.body.quantity) === 0)   {   client.query(`DELETE FROM cart 
                                                                           WHERE customer_id   = ${custId} 
                                                                             AND product_id    = ${req.body.product_id}`)  
                                        
                                                               
                                                       res.send('item successfully removed from cart')
                                                    }

        if (parseFloat(req.body.quantity) > 0)     {   client.query(`UPDATE cart 
                                                                        SET quantity      = ${req.body.quantity}
                                                                      WHERE customer_id   = ${custId} 
                                                                        AND product_id    = ${req.body.product_id}`)  
                  
                                                              
                                                       res.send('amount successfully adjusted')
                                                    }

        client.end;
    });




    cartRouter.post('/checkout', isLoggedIn, 
    


        async function (req, res, next) {
            console.log('first function');


            let currentCust                = await client.query(`SELECT * FROM customer WHERE username = '${req.user.username}'`);
            let custId                     = currentCust.rows[0].id;
            res.locals.custId              = custId;
            console.log(res.locals.custId);

            

            let isInCart                   = await client.query(`SELECT * FROM cart WHERE customer_id = ${custId} AND product_id = ${req.body.product_id}`);
            if (isInCart.rowCount === 0)   {  return res.status(404).send('You need to put some items in your cart before you can checkout!'); }

            next();
        
        },


    
        async function (req, res, next) {
            console.log('second function');
            console.log(res.locals.custId);

     


            let items = await client.query(`SELECT cart.quantity * product.price AS "subtotal"                         
                                              FROM cart 
                                              JOIN product
                                                ON product.id = cart.product_id 
                                             WHERE cart.customer_id = '${res.locals.custId}'`);

           
            let subtotals = [];


            for ( let i = 0; i < items.rows.length; i ++ ) {
                subtotals.push(parseFloat(items.rows[i].subtotal));
            }

            let balance       =  99;
            let total         =  parseFloat(subtotals.reduce((a, b) => a + b, 0));
            res.locals.total  =  total;

            console.log(`your total is ${total}`);
            

            if (total > balance)  {  return res.status(404).send('You\'re a little short on money at the moment...'); }

            next();
        },



        async function (req, res, next) {
            console.log('third function');
            console.log(res.locals.custId);

            
            let lastId          = await client.query(`SELECT * FROM orders ORDER BY id DESC LIMIT 1`);
            let newId           = lastId.rows[0].id + 1;
            res.locals.orderId  =  newId;
           
                
            await client.query(`INSERT INTO orders ( id,
                                                     customer_id,
                                                     date,
                                                     total )
                                VALUES             ( ${newId},
                                                     ${res.locals.custId},
                                                     ${new Date().toISOString().slice(0, 10).replace('T', ' ')},
                                                     ${res.locals.total} )`
                                );

            next();
            
        },

        async function (req, res, next) {
            console.log('fourth function!');
            console.log(res.locals.custId);


            let purchases  =  await client.query(`SELECT product_id, quantity FROM cart WHERE customer_id = ${res.locals.custId}`);

            for ( let i = 0; i < purchases.rows.length; i ++ ) {

                
                let purchaseId         =  purchases.rows[i].product_id;
                let purchaseQuantity   =  purchases.rows[i].quantity;

                await client.query(`INSERT INTO product_orders ( product_id,
                                                                 orders_id,
                                                                 quantity )
                                         VALUES                ( ${purchaseId},
                                                                 ${res.locals.orderId},
                                                                 ${purchaseQuantity} )`
                                  );
            };      
                                  
            next();
             
        },

        async function (req, res) {
            console.log('last function');
            console.log(res.locals.custId);



            client.query(`DELETE FROM cart WHERE customer_id = ${res.locals.custId}`);
            
            return res.send('Order successfully placed!');
            

            client.end;
        }
    );




module.exports = cartRouter;
