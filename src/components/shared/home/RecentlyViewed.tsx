import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';

const KEY = 'recentlyViewed';

type ViewedItem = Pick<Product, 'id' | 'title' | 'image' | 'price'>;

export default function RecentlyViewed() {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ViewedItem[];
        if (Array.isArray(parsed)) setItems(parsed.slice(0, 10));
      }
    } catch {}
  }, []);

  if (items.length === 0) return null;

  return (
    <section className='mt-8'>
      <h3 className='h1-bold mb-3'>Recently Viewed</h3>
      <div className='flex gap-4 overflow-x-auto pb-2'>
        {items.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className='min-w-[180px] border rounded p-3 hover:shadow'>
            <img src={p.image} alt={p.title} className='w-full h-28 object-contain mb-2 bg-white' />
            <div className='text-xs line-clamp-2 mb-1'>{p.title}</div>
            <div className='text-sm font-semibold'>${p.price.toFixed(2)}</div>
          </Link>
        ))}
      </div>
    </section>
  );
} 