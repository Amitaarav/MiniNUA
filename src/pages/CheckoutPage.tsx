import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCart } from '@/features/shoppingCartSlice';
import { resetCheckout, submitOrder, submitOrderFailure, submitOrderSuccess } from '@/features/checkOutSlice';
import type { OrderItemSummary } from '@/types';

export default function CheckoutPage() {
  const { items, grandTotal } = useAppSelector((s) => s.shoppingCart);
  const checkout = useAppSelector((s) => s.checkout);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = () => {
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
    return name.trim().length > 1 && emailOk && address.trim().length > 5;
  };

  const placeOrder = async () => {
    setTouched(true);
    if (!isValid()) {
      dispatch(submitOrderFailure('Please fill all fields correctly.'));
      return;
    }
    dispatch(submitOrder());
    try {
      // Simulate an API call delay
      await new Promise((r) => setTimeout(r, 800));
      const orderItems: OrderItemSummary[] = items.map((i) => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity }));
      // Normally you would POST to a server here.
      console.log('Order placed', { name, email, address, orderItems, total: grandTotal });
      dispatch(submitOrderSuccess());
      dispatch(clearCart());
    } catch (e) {
      dispatch(submitOrderFailure('Failed to place order.'));
    }
  };

  if (checkout.success) {
    return (
      <div className='py-8'>
        <h2 className='text-2xl font-semibold mb-2'>Order Confirmed</h2>
        <p>Thank you, {name}. A confirmation has been sent to {email}.</p>
        <button className='mt-4 underline text-blue-600' onClick={() => dispatch(resetCheckout())}>Continue shopping</button>
      </div>
    );
  }

  return (
    <section className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2 border p-4 rounded'>
        <h2 className='text-xl font-semibold mb-4'>Shipping Details</h2>
        <div className='space-y-3'>
          <div>
            <label className='block mb-1'>Name</label>
            <input className='border px-3 py-2 rounded w-full' value={name} onChange={(e) => setName(e.target.value)} />
            {touched && name.trim().length <= 1 && <div className='text-red-600 text-sm mt-1'>Enter your name</div>}
          </div>
          <div>
            <label className='block mb-1'>Email</label>
            <input className='border px-3 py-2 rounded w-full' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            {touched && !/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email) && <div className='text-red-600 text-sm mt-1'>Enter a valid email</div>}
          </div>
          <div>
            <label className='block mb-1'>Address</label>
            <textarea className='border px-3 py-2 rounded w-full' rows={3} value={address} onChange={(e) => setAddress(e.target.value)} />
            {touched && address.trim().length <= 5 && <div className='text-red-600 text-sm mt-1'>Enter your address</div>}
          </div>
        </div>
        {checkout.error && <div className='text-red-600 mt-3'>{checkout.error}</div>}
        <button
          className='mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded'
          disabled={checkout.isSubmitting}
          onClick={placeOrder}
        >
          {checkout.isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>

      <aside className='border p-4 rounded h-fit'>
        <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
        <ul className='space-y-2 mb-4'>
          {items.map((it) => (
            <li key={it.id} className='flex justify-between'>
              <span className='line-clamp-1'>{it.title}</span>
              <span>
                {it.quantity} x ${it.price.toFixed(2)} = ${(it.price * it.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className='flex justify-between font-semibold'>
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </aside>
    </section>
  );
} 