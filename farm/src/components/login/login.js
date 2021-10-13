
//import                            './Login.css';
import   React, { useState } from 'react';
import   Axios               from 'axios';


function Login({setUser}) {

    const [loginUsername,  setLoginUsername]  = useState('');
    const [loginPassword,  setLoginPassword]  = useState('');
    const [badCredentials, setBadCredentials] = useState(false);

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
            console.log(res.status);
            if (res.status === 203) { return setBadCredentials(true); }
            setBadCredentials(false);
            setUser(res.data);
        });
      };

    const tryAgain = () => {

       return badCredentials ? <p>Invalid username or password</p> : null;
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



