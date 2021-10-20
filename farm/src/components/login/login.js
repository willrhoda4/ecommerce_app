
//import                         './Login.css';
import   React, 
       { useState,
         useEffect }         from 'react';
import   Axios               from 'axios';
import { Link }              from 'react-router-dom';


function Login({user, setUser, setCartCount}) {

    const [loginUsername,  setLoginUsername]  = useState('');
    const [loginPassword,  setLoginPassword]  = useState('');
    const [badCredentials, setBadCredentials] = useState(false);

    useEffect(() => {

        if (user)          { Axios({             method: "GET",
                                                   data: { username: user },
                                        withCredentials: true,
                                                    url: "http://localhost:3000/cart",
                          }).then((res) => {
                                                let cartData = res.data;
                                                let count = 0;

                                                for ( let i = 0; i < cartData.length; i++ ) {
                                                    count = count + parseFloat(cartData[i].quantity);
                                                }
                                                
                                                setCartCount(count);                            
                                            });
    }}, [setCartCount, user]);

    const login = () => {
        Axios({
          method: "POST",
          data: {
            username: loginUsername,
            password: loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:3000/login",
        }).then((res) => {
            console.log('heyhey');
            console.log(res.status);
            console.log('heyhey');
            if (res.status === 203 || res.status === 403) { return setBadCredentials(true); }
            setBadCredentials(false);
            setUser(res.data);
        });
      };

    const tryAgain = () => {

        if (badCredentials) { return <span>
                                         <p>Invalid username or password</p> 
                                         <p>If you don't have an account, then </p><Link to='/register'>Register</Link> 
                                     </span>
                            } 
        return null;
    }

    return (

        <div className="Login">

            <h2>Login</h2>

            <p>This is the Login page.</p>

            {tryAgain()}

            <div>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                    placeholder="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button onClick={login}>Submit</button>
            </div>

         </div>
  );
}

export default Login;



