





//import                     './cart.css';
import    React, 
        { useState, 
          useEffect }    from 'react';
import  { Link,      
          useHistory }   from 'react-router-dom';
import    Axios          from 'axios';



export default function Cart({user, cartCount, setCartCount}) {

    const [cart,           setCart]           = useState([]);
    const [total,          setTotal]          = useState(0);
    const [newAmount,      setNewAmount]      = useState(6);
    const [checkoutStatus, setCheckoutStatus] = useState(null);

    let history = useHistory();
 

    useEffect(() => {

        if (user === null) { setCart(null); }

        if (user)          { Axios({             method: "GET",
                                                   data: { username: user },
                                        withCredentials: true,
                                                    url: "http://localhost:3000/cart",
                          }).then((res) => {
                            
                                                const cartData = res.data;
                                                cartData.forEach(p => {p.newAmount = ''});
                                                setCart(cartData);

                                            });
    }}, [user]);

    useEffect(() => {

        if (cart)  { 

            console.log(cart);

            let count          = 0;
            let subtotals      = [];
            let initialState   = cart.map(p => p.newAmount);


            for ( let i = 0; i < cart.length; i++ ) {
                subtotals.push(parseFloat(cart[i].subtotal));
                count = count + parseFloat(cart[i].quantity);
            }
            let total          = (subtotals.reduce((a, b) => a + b, 0)).toFixed(2);

        
            setNewAmount(initialState);
            setCartCount(count);
            setTotal(total);
            console.log(subtotals);
            console.log(total);
        }   

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);




    const userCart = () => {
        if (user === null)  { return <p>You need to <Link to="/login" >Login</Link> </p>}
        if (cart === null)  { return <p>Your cart is empty!</p> }
        if (cart)           { return <p>You have {cart.length} products and {cartCount}  items in your cart for a total of {total}.<br /> {newAmount}</p> }
    };

    const cartDetails = () => {
        
        if (cart === null)  { return null }
        if (cart)           {
        
            return (
                <div>
                    <ul>
                        {cart.map((p, index) => (

                                <ls id='selection'  key={ p.product_id}>

                                    <p>
                                    Index: {index}<br />
                                    Name: {p.product}<br />
                                    Price: {p.unit_price}<br />
                                    Quantity: {p.quantity}<br />
                                    Subtotal: {p.subtotal}<br />
                                    </p>
                            

                                    <div>   
                                        <input
                                            placeholder="new amount"
                                            value={newAmount[index]}
                                            onChange={ (e) => {  
                                                                  let newArr    = [...newAmount];
                                                                  newArr[index] = e.target.value;
                                                                  setNewAmount(newArr);
                                                              }} 
                                        />

                                        <button  onClick={(e) => {   

                                                                    Axios({          method: "PUT",
                                                                                        url: "http://localhost:3000/cart",
                                                                            withCredentials: true,
                                                                                       data: {   quantity: newAmount[index],
                                                                                               product_id: p.product_id,     },

                                                                 }).then((res) => {  console.log('whutwhut');
                                                                                     const cartData = res.data;
                                                                                     cartData.forEach(p => {p.newAmount = ''});
                                                                                     setCart(cartData);
                                                                    
                                                                    });
                                        }} >Update Amount</button>
                                    </div> 
                                </ls>
                        ))}   
                    </ul>

                </div>
            )}
    };

   


 const checkout = () => {
        
        if (cart === null)  { return null }
        if (cart)           {
        
            return (
                <div>
                    
                    <button  onClick={(e) => {   Axios({
                                                                 method: "POST",
                                                                    url: "http://localhost:3000/cart/checkout",
                                                        withCredentials: true,

                                              }).then((res) => {  if ( res.status === 200 ) { setCart([]); history.push('/products'); }
                                            }).catch((err) =>   {               console.log('made it here...');
                                                                                console.log(err.response);
                                                                    if ( err.response.status === 404 ) { setCheckoutStatus('You need to put some items in your cart!'); }
                                                                    if ( err.response.status === 402 ) { setCheckoutStatus('You\'re a little short on cash!');          } 
                                                                
                                        });
                    }} >Checkout</button>

                    <p>{checkoutStatus}</p>

                </div>
            )}
    };



    

    return  (
        <div>
            <h1>Cart</h1>
            {userCart()}
            {cartDetails()}
            {checkout()}
        </div>        
    )
};





  /*  
    useEffect(() => {

        if (user === null) { setCart(null); }

        if (user)          { Axios({             method: "GET",
                                                   data: { username: user },
                                        withCredentials: true,
                                                    url: "http://localhost:3000/cart",
                          }).then((res) => {
                                                let cartData    = res.data;

                                                if (cartData.length === 0 || null) { return console.log('your cart is empty!'); }
                                                else                               { cartData.forEach(p => {p.newAmount = 0});
                                                                                     setCart(cartData);                                                    console.log(cart);
                                                                                    }

                                                let count       = 0;
                                                let subtotals   = [];
                                                let total       = (subtotals.reduce((a, b) => a + b, 0)).toFixed(2);
                                                let newAmount   = cart.map(p => p.newAmount);


                                                for ( let i = 0; i < cart.length; i++ ) {
                                                    subtotals.push(parseFloat(cart[i].subtotal));
                                                    count = count + parseFloat(cart[i].quantity);
                                                }

                                                setCartCount(count);
                                                setTotal(total);
                                                setNewAmount(newAmount);


                                                console.log(cartData);
                                                console.log(newAmount);
                                                console.log(cart);
                                            });
    }});











    
    useEffect(() => {

        if (user === null) { setCart(null); }

        if (user)          { Axios({             method: "GET",
                                                   data: { username: user },
                                        withCredentials: true,
                                                    url: "http://localhost:3000/cart",
                          }).then((res) => {
                                                const cartData = res.data;
                                                console.log(cartData);
                                                cartData.forEach(p => {p.newAmount = 0});
                                                console.log(cartData);
                                                console.log(cart);
                                                setCart(cartData);
                                            });
    }}, [user,]);


    useEffect(() => {

        if (cart) { 

            let subtotals = [];
            let count = 0;
    
            console.log(cart);
            for ( let i = 0; i < cart.length; i++ ) {
                subtotals.push(parseFloat(cart[i].subtotal));
                count = count + parseFloat(cart[i].quantity);
            }
            let total = (subtotals.reduce((a, b) => a + b, 0)).toFixed(2);
        

            setCartCount(count);
            setTotal(total);

            



    }}, [cart, setCartCount, user]);

    useEffect(() => {

        if (cart) { 

            const initialState = cart.map(p => p.newAmount);
            setNewAmount(initialState);
            console.log(newAmount);
            console.log(cart);

    }}, [cart, newAmount] );

*/
