import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeItem, updateQuantity } from '@/features/shoppingCartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, grandTotal } = useAppSelector((s) => s.shoppingCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className='py-8'>
        <p>Your cart is empty.</p>
        <Link to='/' className='underline text-blue-600'>Go shopping</Link>
      </div>
    );
  }

  return (
    <section className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='lg:col-span-2'>
        <ul className='space-y-4'>
          {items.map((it) => (
            <li key={it.id} className='flex gap-4 items-center border p-3 rounded'>
              <img src={it.image} alt={it.title} className='w-20 h-20 object-contain bg-white' />
              <div className='flex-1'>
                <div className='font-medium line-clamp-2'>{it.title}</div>
                <div className='text-sm text-gray-600'>${it.price.toFixed(2)} each</div>
                <div className='flex items-center gap-2 mt-2'>
                  <label htmlFor={`qty-${it.id}`}>Qty</label>
                  <select
                    id={`qty-${it.id}`}
                    className='border px-2 py-1 rounded'
                    value={it.quantity}
                    onChange={(e) => dispatch(updateQuantity({ id: it.id, quantity: Number(e.target.value) }))}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <button
                    className='ml-4 text-red-600 underline'
                    onClick={() => dispatch(removeItem(it.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className='font-semibold'>${(it.price * it.quantity).toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>

      <aside className='border p-4 rounded h-fit'>
        <div className='flex justify-between mb-4'>
          <div className='font-medium'>Grand Total</div>
          <div className='font-bold'>${grandTotal.toFixed(2)}</div>
        </div>
        <button
          className='w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded'
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </aside>
    </section>
  );
} 