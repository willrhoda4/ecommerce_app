





//import                   './profile.css';
import    React, 
        { useState, 
          useEffect } from 'react';
import    Axios       from 'axios';




const Profile = ({user}) => {


    const [profileData, setProfileData] = useState([]);



        






    useEffect(() => {

        if (user === null) { setProfileData(null); }

        if (user)          { Axios({             method: "GET",
                                                   data: { username: user },
                                        withCredentials: true,
                                                    url: "http://localhost:3000/user/:username",
                          }).then((res) => {
                                                const profileData = res.data;
                                                console.log(profileData);
                                                setProfileData(profileData);
                                            });
    }}, [user]);

    const userProfile = () => {

        if (user)   { return <div >
                                {profileData.map(p => (
                                    <div id='Profile' key={p.id} >
                                        <p>Name: {p.name}<br />email: {p.email}<br />password: {p.password}</p>
                                    </div>
                                ))}       
                             </div>
                            } 
        return <p>You need to log in!</p>;
    }

  
    return ( 
        <div>
            <h2>Profile</h2>
            {userProfile()}
        </div>

        
    );
};

export default Profile;