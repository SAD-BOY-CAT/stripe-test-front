import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
 
export const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const cardElement = elements?.getElement(CardElement);
 
    if (!stripe || !elements || !cardElement) {
      return;
    }
 
    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });
 
    const { error, paymentMethod } = stripeResponse;
    console.log(error)
 
    if (error || !paymentMethod) {
      return;
    }
 
    const paymentMethodId = paymentMethod.id;
    const priceId = "price_1PneWT063KVruw0w517PxQNM";
    fetch(`http://localhost:4200/subscriptions/create`, {
      method: 'POST',
      body: JSON.stringify(({
        paymentMethodId: paymentMethodId,
        priceId: priceId
      })),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MjM3ODgwNDMsImV4cCI6MTcyMzg3NDQ0M30.NKbsc-c_1KkdQU6zb29ow-5poiUu6ZJ9zTjj1mgZPbw'
      },
    })
 
  };
 
  return {
    handleSubmit
  }
}
