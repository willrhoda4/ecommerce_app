





import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";





const Login = () => {


    const [badCredentials, setBadCredentials] = useState(false);
 
    const message = () => {
 
     if (badCredentials === true) { return <p>Either your username or password was incorrect...</p> }
       
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
  
             axios.post('http://localhost:3000/login', {}, {

                 auth: {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                 }
               })
               .then(function (response) {
                 console.log(response);
                 if ( response.status === 200) {
                   setBadCredentials(false); 
                   history.push('/profile') ;
                 }
                
               })
               .catch(function (error) {
                 console.log(error);
                 setBadCredentials(true);
               });
         };
     
 
 
   
 
     return (
 
         <div>
         
         <h1>Login</h1>
 
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





export default Login;