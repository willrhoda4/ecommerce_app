





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



function App() {

  

  const [user, setUser] = useState(null);

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
                <li> <Link to='/login'       >Login</Link>       </li>
                <li> <Link to='/products'    >Products</Link>    </li>
              </ul>
            </nav>

            <div>
              {user ? <div>
                        <p>Welcome Back {user}!</p> 
                        <Logout setUser={setUser} /> 
                      </div>            
                    :   <Link to="/login" >Login</Link> }
            </div>
        
          </header>

          <main>


            <Switch>
              <Route path="/home">          <Home />                              </Route>
              <Route path="/register">      <Register    setUser={setUser}/>      </Route>
              <Route path="/login">         <Login       setUser={setUser}/>      </Route>
              <Route path="/products">      <Products    setUser={setUser}/>      </Route>
            </Switch>
          </main>
         
      </div>   
  );
}

export default App;



