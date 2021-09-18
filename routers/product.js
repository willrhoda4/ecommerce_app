





const client           = require('../connection.js');

const express          = require('express');
const productRouter    = express.Router();

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




    productRouter.get('/', (req, res) => {
        client.query(`SELECT * FROM product`, (err, result)=>{
            if(!err){
                res.send(result.rows);
            }
        });
        client.end;
    })


 

    productRouter.get('/:id', (req, res) => {
        client.query(`SELECT * FROM product WHERE id = ${req.body.id}`, (err, result)=>{
            if(!err) {
                if (result.rowCount === 0 )     {  res.status(404).send('product id not found.');  } 
                else                            {  res.send(result.rows);  }
            }
        });
        client.end;
    })




    productRouter.get('/category/:id', (req, res) => {
        client.query(`SELECT * FROM product JOIN category ON product.category_id = category.id WHERE category.type = '${req.body.category}'`, (err, result)=>{
            if(!err) {
                if (result.rowCount === 0 )     {  res.status(404).send('category not found.');  } 
                else                            {  res.send(result.rows);  }
            }
        });
        client.end;
    })




    productRouter.post('/', 
    function (req, res, next) {

        client.query(`SELECT * FROM product WHERE name = '${req.body.name}'`, (err, result) => {

        if (result.rowCount > 0 ) { return res.status(400).send('a product with this name already exists!') }
        next();

        });

    },
    async function (req, res, next) {

        if ( !req.body.name && !req.body.description && !req.body.price && !req.body.inventory )  {
            return res.status(400).send('Failed Entry. All new products require a name, description, price and inventory.')
        }
    
        let lastProduct = await client.query(`SELECT * FROM product ORDER BY id DESC LIMIT 1`);
        let newId = lastProduct.rows[0].id + 1;
        
        console.log(req.body);
        console.log(newId);

        client.query(`INSERT INTO product ( id, name, description, price, category, inventory)
        
                                   VALUES (   ${newId}, 
                                             '${req.body.name}', 
                                             '${req.body.description}',
                                              ${req.body.price},
                                              ${req.body.category},
                                              ${req.body.inventory})`
                    );
        res.status(200).send(`new product ${req.body.name} added!`);
        console.log(`new product ${req.body.name} added!`);
        client.end;                            
    });


 



module.exports = productRouter;
