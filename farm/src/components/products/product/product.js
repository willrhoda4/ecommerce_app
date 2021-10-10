import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./product.css";




const Product = () => {


  const { id } = useParams();


  const [productData, setProductData] = useState([]);



  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`)
        .then(res => {
              const productData = res.data;
              console.log(productData);
              setProductData(productData);
            })
  }, [id]);


  
  return (

    <div >

      {productData.map(p => (
                        <div id='Product' key={p.id} >
                          <p>Name: {p.name}<br />Price: {p.price}<br />Description: {p.description}</p>
                        </div>
                      ))}
     
    </div>
  );
};

export default Product;

/*


  

*/