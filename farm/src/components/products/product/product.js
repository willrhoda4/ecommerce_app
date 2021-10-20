





import                   './product.css';
import    React, 
        { useState, 
          useEffect } from 'react';
import  { useParams } from 'react-router-dom';
import    Axios       from 'axios';
import    AddButton   from '../addButton/addButton';




const Product = ({cartCount, setCartCount}) => {


    const { id } = useParams();
    const [productData, setProductData] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:3000/product/${id}`)
             .then(res => {
                    const productData = res.data;
                    console.log(productData);
                    setProductData(productData);
              })
    }, [id]);

    const set6 = () => { setCartCount(6) }
    const set9 = () => { setCartCount(9) }

    



  
    return (

        <div >
                  <button onClick={set9} >9</button>
                <button onClick={set6} >6</button>
            {productData.map(p => (

                <div id='Product' key={p.id} >
                    <p>Name: {p.name}<br />Price: {p.price}<br />Description: {p.description}</p>
                    <AddButton productData  ={productData} 
                               setCartCount ={setCartCount} 
                                  cartCount ={cartCount}/>
                </div>

            ))}       
        </div>
    );
};

export default Product;