import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import {useState} from 'react'
import {STRIPE_PUBLIC_KEY,NODE_SERVER,MAKE_PAYMENT} from './config'


function App() {
  const [product, setProduct] = useState({
    name:"React Course",
    price:10,
    productBy:"Mentor (JOHN DOE)"
  })
  const onToken = (token) => {
    const body = {
      token,
      product
    }
    const headers ={
      "Content-type":"application/json"
    }
    fetch(`${NODE_SERVER}${MAKE_PAYMENT}`,{
      method:'POST',
      headers,
      body:JSON.stringify(body)
    }).then(async response=>{

      await console.log(response.json())
      const {status} = response
      console.log(`STATUS FROM NODE ${status}`)
      // console.log (`Response From Server FROM NODE ${JSON.stringify(response)}`);

    }).catch(error=>{
      console.log(`Error STATUS FROM NODE ${error}`)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Make Payment to Get Access over courses
        </p>
        <StripeCheckout 
        token={onToken} 
        stripeKey={STRIPE_PUBLIC_KEY} 
        name={product.name} 
        amount={product.price*100} 
        billingAddress
        />
      </header>
    </div>
  );
}

export default App;
