import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductDetail } from '@/features/productDetailsSlice';
import { addItem } from '@/features/shoppingCartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((s) => s.productDetail);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) dispatch(fetchProductDetail(id));
  }, [id, dispatch]);

  if (loading) return <div className='py-8'>Loading...</div>;
  if (error) return <div className='py-8 text-red-600'>{error}</div>;
  if (!product) return <div className='py-8'>Product not found.</div>;

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='bg-white p-4 border rounded'>
        <img src={product.image} alt={product.title} className='w-full h-96 object-contain' />
      </div>
      <div>
        <h1 className='text-2xl font-semibold mb-2'>{product.title}</h1>
        <div className='text-gray-600 mb-4 capitalize'>{product.category}</div>
        <div className='text-xl font-bold mb-4'>${product.price.toFixed(2)}</div>
        <div className='mb-4'>
          <span className='font-medium'>Rating:</span> {product.rating?.rate ?? '-'} ({product.rating?.count ?? 0})
        </div>
        <p className='mb-6 text-sm leading-6'>{product.description}</p>

        <div className='flex items-center gap-3 mb-4'>
          <label htmlFor='qty' className='font-medium'>Quantity</label>
          <select
            id='qty'
            className='border px-2 py-1 rounded'
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <button
          className='bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded'
          onClick={() =>
            dispatch(
              addItem({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: qty })
            )
          }
        >
          Add to Cart
        </button>

        <div className='mt-4'>
          <Link className='underline text-blue-600' to='/cart'>Go to Cart</Link>
        </div>
      </div>
    </section>
  );
} 