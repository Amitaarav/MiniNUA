import { ShoppingCartIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export const Menu = () => {
    const itemCount = useAppSelector((s) => s.shoppingCart.items.reduce((sum, it) => sum + it.quantity, 0));
    return (
        <nav className="flex gap-4 items-center">
            {/* User sign in */}
            <Link to="/signin" className="header-button flex items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <span className="font-bold">Sign in</span>
            </Link>
            {/* Shopping cart */}
            <Link to="/cart" className="header-button flex items-center gap-2 relative">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="font-bold">Cart</span>
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold rounded-full px-1 min-w-5 text-center">
                        {itemCount}
                    </span>
                )}
            </Link>
        </nav>
    );
}