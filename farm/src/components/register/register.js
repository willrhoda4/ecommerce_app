
//import './Register.css';
import React, { useState }   from 'react';
import Axios                 from 'axios';



function Register({setUser}) {

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [invalidUsername,  setInvalidUsername]  = useState(false);

    const register = () => {
        Axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
            },
                withCredentials: true,
                url: "http://localhost:3000/login/register",
        })
        .then((res) => {
            console.log(res.data);
            console.log('check');
           // if (err)                             { throw(err)                  }
            if (res.status === 203)              { setInvalidUsername(true)    }
            else                                 { setInvalidUsername(false);
                                                   setUser(res.data);          }
            
        })
    };

  return (

    <div className="Register">

        <h2>Register</h2>

        <p>This is the Register page.</p>

        <div>
            <h1>Register</h1>

            { invalidUsername ? <p>Username already in use!</p> : null }

            <input
            placeholder="username"
            onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
            placeholder="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={register}>Submit</button>
        </div>

    </div>
    
  );
}

export default Register;



