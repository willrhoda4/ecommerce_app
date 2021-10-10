






import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch,
         Route,
         Link
} from            'react-router-dom';
import            './products.css';
import Product from './product/product';


export default function Products() {

 const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/product`)
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




/*

const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);

ReactDOM.render(
  <Router>
    <Route path="/home" render={() => <div>Home</div>} />
  </Router>,
  node

\ <li><Link to='/products'>Products</Link></li>


const Roster = () => (
  <Switch>
    <Route exact path='/roster' component={FullRoster}/>
    <Route path='/roster/:number' component={Player}/>
  </Switch>
)
*/
