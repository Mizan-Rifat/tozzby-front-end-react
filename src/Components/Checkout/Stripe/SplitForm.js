import React,{useContext} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import {AppContext} from '../../../App';



export default function CheckoutForm(){

  const { cartItems, setCartItems} = useContext(AppContext);


  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };


  const handleFormSubmit = async ev => {
    ev.preventDefault();
    if (!stripe || !elements) {
     
      return;
    }


    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post(`${process.env.REACT_APP_DOMAIN}/api/stripe/payment_intents`, {
        
      },
      {
        withCredentials:true
      });
      console.log({clientSecret})

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        // billing_details: billingDetails
      });


      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      console.log({result})
  
      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const { data: order } = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/stripe/success`,
          {
            withCredentials:true
          });          

        }
      }

  
    } catch (err) {
      // setCheckoutError(err.message);

    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <CardElement 
        options={{
          hidePostalCode:true
        }}
     
         
      />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};