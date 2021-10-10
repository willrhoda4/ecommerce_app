
import './App.css';


import   React from "react";
import { Switch,
         Route,
         Link
} from   "react-router-dom";

import Home from './components/home/home';
import About from './components/about/about';
import Profile from './components/profile/profile';
import Greeting from './components/login/greeting/greeting';
import Login from './components/login/login';
import Products from './components/products/products';
import Register from './components/register/register';

function App() {



  return (



      <div className="App">

          <header className="App-header">

            <p> Rhoda Family Farm </p>

            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/register'>Register</Link></li>

              </ul>
            </nav>

            <Greeting />

          </header>

          <main>

            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/login' component={Login}/>
              <Route path='/products' component={Products}/>
              <Route path='/register' component={Register}/>

            </Switch>
            
          </main>

      </div>


    
  );
}

export default App;



