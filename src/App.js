import './App.css';
import { Elements, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { usePaymentForm } from './usePaymentForm';

const stripePromise = loadStripe('pk_test_51Pmz9E063KVruw0woX9wffn7v7L61K75PEZPYodyusPpcgz6Vg8lppVtqyZIocS4po6IGgZDA3Bu17Vpvd9Od3oa00g57PZWJW');

function App() {
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
  );
}

const PaymentForm = () => {
  const { handleSubmit } = usePaymentForm();
 
  return (
    <form>
      <CardElement />
      <button onClick={handleSubmit}>Pay</button>
    </form>
  );
};

export default App;
