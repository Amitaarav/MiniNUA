import { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories } from '@/features/productListingSlice';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((s) => s.productListing);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && categories.length === 0) dispatch(fetchCategories());
  }, [open, categories.length, dispatch]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
      // Move focus to close button
      closeBtnRef.current?.focus();
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [open, onKeyDown]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        id='sidebar'
        className={`absolute left-0 top-0 h-full w-80 md:w-96 max-w-[90vw] bg-white text-black shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        role='dialog'
        aria-modal='true'
        aria-label='Navigation Menu'
      >
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-semibold'>Browse</h2>
          <button
            ref={closeBtnRef}
            aria-label='Close sidebar'
            onClick={onClose}
            className='p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <nav className='p-4 overflow-y-auto h-[calc(100%-64px)]'>
          <div className='mb-4'>
            <h3 className='font-medium mb-2'>Categories</h3>
            {loading && <div className='text-sm text-gray-600'>Loading...</div>}
            {error && <div className='text-sm text-red-600'>{error}</div>}
            <ul className='space-y-2 mt-2'>
              <li>
                <Link to={`/search?category=all`} className='block hover:underline' onClick={onClose}>
                  All
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search?category=${encodeURIComponent(c)}`}
                    className='block capitalize hover:underline'
                    onClick={onClose}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-6'>
            <h3 className='font-medium mb-2'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/search?q=best%20sellers' className='hover:underline' onClick={onClose}>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to='/search?q=new%20arrivals' className='hover:underline' onClick={onClose}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to='/cart' className='hover:underline' onClick={onClose}>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
}