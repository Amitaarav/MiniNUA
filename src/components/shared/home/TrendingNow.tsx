import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/features/productListingSlice';
import { addItem } from '@/features/shoppingCartSlice';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';

export default function TrendingNow() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((s) => s.productListing);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch]);

  const top = useMemo(() => {
    const list = (products as Product[]).slice();
    return list
      .sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
      .slice(0, 8);
  }, [products]);

  return (
    <section className='mt-6'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='h1-bold'>Trending Now</h3>
        <Link to='/search?q=trending' className='text-sm underline'>Explore</Link>
      </div>
      {loading ? (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='border rounded p-3 animate-pulse'>
              <div className='w-full h-40 bg-gray-200 mb-2' />
              <div className='h-4 bg-gray-200 mb-1' />
              <div className='h-4 bg-gray-200 w-1/2' />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {top.map((p: Product) => (
            <div key={p.id} className='border rounded p-3 hover:shadow flex flex-col'>
              <Link to={`/product/${p.id}`} className='flex-1'>
                <img src={p.image} alt={p.title} className='w-full h-40 object-contain mb-2 bg-white' />
                <div className='text-sm line-clamp-2 mb-1'>{p.title}</div>
                <div className='font-semibold'>${p.price.toFixed(2)}</div>
              </Link>
              <button
                className='mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 py-2 rounded'
                onClick={() => dispatch(addItem({ id: p.id, title: p.title, price: p.price, image: p.image, quantity: 1 }))}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 