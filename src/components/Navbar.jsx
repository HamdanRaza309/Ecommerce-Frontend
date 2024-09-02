import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';

function Navbar() {
    const [visible, setVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { decodeToken, setShowSearch, getCartCount } = useContext(ShopContext);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decoded = decodeToken(token);
    const userRole = decoded?.user?.role;
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleAddProduct = () => {
        navigate('/addProduct');
    };

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    const dropdownRef = useRef(null);

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdown);
        return () => document.removeEventListener('mousedown', closeDropdown);
    }, []);

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to='/'>
                <img className='w-48' src={assets.logo} alt="logo" />
            </Link>
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to='/' className='flex flex-col gap-1 items-center'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col gap-1 items-center'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col gap-1 items-center'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col gap-1 items-center'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search_icon" className='w-5 cursor-pointer' />
                <div className="relative">
                    <img
                        src={assets.profile_icon}
                        alt="profile_icon"
                        className='w-5 cursor-pointer'
                        onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 shadow-lg rounded-md z-10">
                            <div className="flex flex-col gap-2">
                                {isLoggedIn ? (
                                    <>
                                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                                        <p className='cursor-pointer hover:text-black'>Orders</p>
                                        {userRole === 'admin' && (
                                            <p onClick={handleAddProduct} className='cursor-pointer hover:text-black'>Add Product</p>
                                        )}
                                        <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                                    </>
                                ) : (
                                    <p onClick={handleLogin} className='cursor-pointer hover:text-black'>Login</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <Link to='/cart' className='relative w-5 cursor-pointer'>
                    <img src={assets.cart_icon} alt="cart_icon" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu_icon" className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="dropdown_icon" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
