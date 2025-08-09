import { ShoppingCartIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <nav className="flex gap-4 items-center">
            {/* User sign in */}
            <Link to="/signin" className="header-button flex items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <span className="font-bold">Sign in</span>
            </Link>
            {/* Shopping cart */}
            <Link to="/cart" className="header-button flex items-center gap-2">
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="font-bold">Cart</span>
            </Link>
        </nav>
    );
}