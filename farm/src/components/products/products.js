





//import                     './products.css';
import    React, 
        { useState, 
          useEffect } from 'react';
import  { Switch,
          Route,
          Link      } from 'react-router-dom';
import    Axios       from 'axios';
import    Product     from './product/product';



export default function Products({cartCount, setCartCount}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3000/product`)
            .then(res => {
                const products = res.data;
                //console.log(products);
                setProducts(products);
            })
    }, []);
    
    const set6 = () => { setCartCount(6) }
    const set9 = () => { setCartCount(9) }


    return  (
        <div>
            <div>

                <h1>Products List</h1>

                <p>We got {products.length} options</p>
                <button onClick={set9} >9</button>
                <button onClick={set6} >6</button>


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
                    <Route exact path='/products'        render={() => <p>Choose an option for more details!</p> } />
                    <Route       path='/products/:id'    render={() => <Product cartCount={cartCount} setCartCount={setCartCount} />} />
                </Switch>

            </div>
        </div>
    )
   
   }



