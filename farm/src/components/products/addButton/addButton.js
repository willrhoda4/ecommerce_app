
//import './AddButton.css';
import   React from 'react';
import   Axios from 'axios';


function AddButton({productData, cartCount, setCartCount}) {

const addToCart = () => {
    console.log(productData);
    console.log(productData[0].id);
   

    Axios({
        method: "POST",
        data: {
          product_id: productData[0].id,
          quantity: "1",
        },
        withCredentials: true,
        url: "http://localhost:3000/cart",
      }).then((res) => {
          setCartCount(cartCount +1);
          console.log('heyhey');
          console.log(res.status);
          console.log('heyhey');
          
      });
      
}

const set6 = () => { setCartCount(6) }
const set9 = () => { setCartCount(9) }

  return  (
            <div>
                    <button onClick={addToCart} >+</button>;
                   <button onClick={set9} >9</button>
                    <button onClick={set6} >6</button>
                </div>
  );
}



export default AddButton;
