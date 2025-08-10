import { APP_NAME } from "@/lib/constant";
import { Menu } from "./Menu";
import { Search } from "./Search";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import data from "@/lib/data";
import { useState } from "react";
import Sidebar from "./SideBar";
import ThemeToggle from "./ThemeToggle";

export const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950 text-white w-full">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="px-2 w-full">
                <div className="flex items-center justify-between py-2">
                    {/* Logo & App Name */}
                    <Link
                        to="/"
                        className="flex items-center header-button font-extrabold text-2xl gap-2"
                    >
                        <img
                            src="/icons/logo-nua.svg"
                            alt={`${APP_NAME} logo`}
                            width={40}
                            height={40}
                            className="mr-2"
                        />
                        <span>{APP_NAME}</span>
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 justify-center max-w-xl">
                        <Search />
                    </div>

                    {/* Menu */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Menu />
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden py-2">
                    <Search />
                </div>
            </div>

            {/* Navigation Menus */}
            <nav className="flex items-center px-3 bg-gray-800 w-full">
                <Button
                    variant="ghost"
                    className="header-button flex items-center gap-1 text-base [&_svg]:size-6"
                    onClick={() => setSidebarOpen(true)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                >
                    <MenuIcon />
                    All
                </Button>
                <div className="flex items-center flex-wrap gap-3 overflow-x-auto max-h-[42px] ml-2">
                    {data.headerMenus.map((menu) => (
                        <Link
                            to={menu.href}
                            key={menu.href}
                            className="header-button !p-2 whitespace-nowrap"
                        >
                            {menu.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
};