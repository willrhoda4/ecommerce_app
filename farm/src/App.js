





import                  './App.css';
import   React,
       { useEffect,
         useState }  from 'react';
import { Switch,
         Route,
         Link      } from 'react-router-dom';   
import   Axios       from 'axios';

import   Home        from './components/home/home';
import   Login       from './components/login/login';
import   Register    from './components/register/register';
import   Logout      from './components/logout/logout';
import   Products    from './components/products/products';
import   Cart        from './components/cart/cart';
import   Profile     from './components/profile/profile';

function App() {

  

  const [user,      setUser]       = useState(null);
  const [cartCount, setCartCount]  = useState(0);

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/login",
    })
    .then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
  });




  return (

      <div className="App">

          <header className="App-header">

            <h1> Rhoda Family Farm </h1>

            <nav>
              <ul>
                <li> <Link to='/home'        >Home</Link>        </li>
                <li> <Link to='/register'    >Register</Link>    </li>
                <li> <Link to='/profile'     >Profile</Link>     </li>
                <li> <Link to='/products'    >Products</Link>    </li>
                <li> <Link to='/cart'        >Cart</Link>        </li>

              </ul>
            </nav>

            <div>
              {user ? <div>
                        <p>Welcome Back {user}!</p> 
                        <p><Link to='/cart'>Cart</Link>({cartCount})</p>
                        <Logout setUser={setUser} /> 
                      </div>            
                    :   <Link to="/login" >Login</Link> }
            </div>
        
          </header>

          <main>


            <Switch>
              <Route path="/home">          <Home                               />           </Route>
              <Route path="/register">      <Register          setUser={setUser}/>           </Route>
              <Route path="/login">         <Login                user={user}
                                                               setUser={setUser}
                                                          setCartCount={setCartCount}/>      </Route>
              <Route path="/products">      <Products          setUser={setUser}
                                                             cartCount={cartCount}
                                                          setCartCount={setCartCount}/>      </Route>
              <Route path="/profile">       <Profile              user={user}/>              </Route>
              <Route path="/cart">          <Cart                 user={user}
                                                             cartCount={cartCount}
                                                          setCartCount={setCartCount}/>      </Route>



            </Switch>
          </main>
         
      </div>   
  );
}

export default App;



