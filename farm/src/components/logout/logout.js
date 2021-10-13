
//import './Logout.css';
import   React from "react";
import Axios from "axios";



function Logout({setUser}) {

    const endSession = () => {
        Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:3000/login/logout",
        })
        .then((res) => {
          setUser(null);
          console.log(res.data);
        });
    };

  return (

    <p onClick={endSession} >Logout</p>
    
  );
}

export default Logout;



