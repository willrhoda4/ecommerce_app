





//import                     './products.css';
import    React, 
        { useState, 
          useEffect } from 'react';
import  { Switch,
          Route,
          Link      } from 'react-router-dom';
import    Axios       from 'axios';
import    Product     from './product/product';



export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3000/product`)
            .then(res => {
                const products = res.data;
                //console.log(products);
                setProducts(products);
            })
    }, []);
    

    return  (
        <div>
            <div>

                <h1>Products List</h1>

                <p>We got {products.length} options</p>

                <div>
                <ul>
                    {
                    products.map(p => (
                        <li key={p.id}>
                        <Link to={`/products/${p.id}`}>{p.name}</Link>
                        </li>
                    ))
                    }
                </ul>
                </div>  

            </div>

            <div>
                
                <Switch>
                    <Route exact path='/products' render={() => <p>Choose an option for more details!</p> } />
                    <Route path='/products/:id' component={Product}  />
                </Switch>

            </div>
        </div>
    )
   
   }
