





import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";





const Register = () => {


   const [takenName, setTakenName]         = useState(false);
   const [attemptedName, setAttemptedName] = useState('');

   const message = () => {

    if (takenName === true) { return <p>The name {attemptedName} has already been taken!</p> }
      
   }



    const Field = React.forwardRef(({label, type}, ref) => {
        return (
          <div>
            <label  >{label}</label>
            <input ref={ref} type={type}  />
          </div>
        );
    });
    
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const history     = useHistory();

    const handleSubmit = e => {

            e.preventDefault();

            setAttemptedName(usernameRef.current.value)

            axios.post('http://localhost:3000/login/register', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
              })
              .then(function (response) {
                console.log(response);
                if ( response.status === 200) {
                  setTakenName(false); 
                  history.push('/profile') ;
                }
               
              })
              .catch(function (error) {
                console.log(error);
                setTakenName(true);
              });
        };
    


  

    return (

        <div>
        
        <h1>Register</h1>

        {message()}

        <form onSubmit={handleSubmit} >
            <Field ref={usernameRef} label="Username:" type="text" />
            <Field ref={passwordRef} label="Password:" type="password" />
            <div>
            <button  type="submit">Submit</button>
            </div>
        </form>

        </div>
    );
};


  export default Register;


  /*

const App = () => {
    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };
    return (
      <div style={appStyle}>
        <Form onSubmit={handleSubmit} />
      </div>
    );
};









axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
*/