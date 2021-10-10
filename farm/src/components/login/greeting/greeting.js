





import axios                   from "axios";
import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";



function Greeting() {



    const [loggedIn, setLoggedIn]               = useState(false);
    const [currentUserName, setCurrentUserName] = useState('');


    useEffect(() => {
            axios.get(`http://localhost:3000/login`)
                .then(res => {
                    const name = res.data;
                    console.log(res);
                    console.log('name');

                    if(res.status === 200) {
                        setLoggedIn(true);
                        setCurrentUserName(name);
                        console.log('got it');
                    }
                })
                .catch(err => {
                    console.log('an error!!!');
                    console.log(err);
                    
                })
        }, []);

    const greeting = () => {
        
        if ( loggedIn === true  ) { return <h3>Welcome back {currentUserName}!</h3> }
        if ( loggedIn === false ) { return <Link to='/login'>Login</Link>}
    }

    return (
        <div className="Greeting">

            
            { greeting() }

        </div>

    );

 
}

export default Greeting;
