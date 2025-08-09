import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, fetchCategories, setFilter, setSort, type SortMode } from '@/features/productListingSlice';
import type { Product } from '@/types';
import { Link, useSearchParams } from 'react-router-dom';

export default function ProductListPage() {
  const dispatch = useAppDispatch();
  const { products, categories, loading, error, filter, sort } = useAppSelector((s) => s.productListing as any);
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState(filter.title);
  const [category, setCategory] = useState(filter.category);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    const c = searchParams.get('category') ?? '';
    setTitle(q);
    setCategory(c === 'all' ? '' : c);
    dispatch(setFilter({ title: q, category: c === 'all' ? '' : c }));
  }, [searchParams, dispatch]);

  const filtered = useMemo(() => {
    const list = (products as Product[]).filter((p: Product) => {
      const matchesTitle = p.title.toLowerCase().includes(title.toLowerCase());
      const matchesCategory = !category || p.category === category;
      return matchesTitle && matchesCategory;
    });
    switch (sort as SortMode) {
      case 'price-asc':
        return [...list].sort((a: Product, b: Product) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a: Product, b: Product) => b.price - a.price);
      case 'rating-desc':
        return [...list].sort((a: Product, b: Product) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
      default:
        return list;
    }
  }, [products, title, category, sort]);

  return (
    <section>
      <div className='flex flex-wrap gap-2 items-center mb-4'>
        <input
          className='border px-3 py-2 rounded w-full max-w-md'
          placeholder='Search products...'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            dispatch(setFilter({ title: e.target.value, category }));
          }}
          aria-label='Search products'
        />
        <select
          className='border px-3 py-2 rounded'
          value={category}
          onChange={(e) => {
            const v = e.target.value;
            setCategory(v);
            dispatch(setFilter({ title, category: v }));
          }}
          aria-label='Filter by category'
        >
          <option value=''>All</option>
          {(categories as string[]).map((c: string) => (
            <option key={c} value={c} className='capitalize'>
              {c}
            </option>
          ))}
        </select>
        <select
          className='border px-3 py-2 rounded'
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value as SortMode))}
          aria-label='Sort products'
        >
          <option value='relevance'>Relevance</option>
          <option value='price-asc'>Price: Low to High</option>
          <option value='price-desc'>Price: High to Low</option>
          <option value='rating-desc'>Rating</option>
        </select>
      </div>

      {loading && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' aria-busy='true'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='border rounded p-3 animate-pulse'>
              <div className='w-full h-48 bg-gray-200 mb-2' />
              <div className='h-4 bg-gray-200 mb-1' />
              <div className='h-4 bg-gray-200 w-1/2' />
            </div>
          ))}
        </div>
      )}
      {error && (
        <div role='alert' className='py-4 text-red-600'>
          {error}
        </div>
      )}

      {!loading && (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filtered.map((p: Product) => (
            <Link to={`/product/${p.id}`} key={p.id} className='border rounded p-3 hover:shadow'>
              <img src={p.image} alt={p.title} className='w-full h-48 object-contain mb-2 bg-white' />
              <div className='text-sm line-clamp-2 mb-1'>{p.title}</div>
              <div className='font-semibold'>${p.price.toFixed(2)}</div>
            </Link>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className='py-8 text-gray-600'>No products found.</div>
      )}
    </section>
  );
}
