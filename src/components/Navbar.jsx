import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';

function Navbar() {
    const [visible, setVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { decodeToken, setShowSearch, getCartCount } = useContext(ShopContext);
    const navigate = useNavigate();
    const [bgColor, setBgColor] = useState('bg-red-600');
    const [textColor, setTextColor] = useState('text-white');
    const [hoverTextColor, setHoverTextColor] = useState('hover:text-black');
    const [height, setHeight] = useState('h-28');

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

    useEffect(() => {
        const handleScrollEvent = () => {
            if (window.scrollY >= 100) {
                setBgColor('bg-white');
                setTextColor('text-black');
                setHoverTextColor('hover:text-red-600');
                setHeight('h-16');
            } else {
                setBgColor('bg-red-600');
                setTextColor('text-white');
                setHoverTextColor('hover:text-black');
                setHeight('h-28');
            }
        };

        window.addEventListener('scroll', handleScrollEvent);

        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <div className={`sticky top-0 z-10 ${bgColor} ${textColor} ${height} flex items-center justify-between font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] transition-all duration-300 ease-in-out`}>
            <Link to='/'>
                <img className='w-32 h-20' src={assets.logo} alt="logo" />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden sm:flex gap-5 text-sm">
                <NavLink to='/' className={`flex flex-col gap-1 items-center ${hoverTextColor} transition duration-300 hover:scale-110`}>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] hidden' />
                </NavLink>
                <NavLink to='/collection' className={`flex flex-col gap-1 items-center ${hoverTextColor} transition duration-300 hover:scale-110`}>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] hidden' />
                </NavLink>
                <NavLink to='/about' className={`flex flex-col gap-1 items-center ${hoverTextColor} transition duration-300 hover:scale-110`}>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] hidden' />
                </NavLink>
                <NavLink to='/contact' className={`flex flex-col gap-1 items-center ${hoverTextColor} transition duration-300 hover:scale-110`}>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-3">
                <FontAwesomeIcon
                    icon={faSearch}
                    className={`w-10 h-6 cursor-pointer ${hoverTextColor} transition duration-300 hover:scale-110`}
                    onClick={() => setShowSearch(true)}
                />
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faUser}
                        className={`w-10 h-6 cursor-pointer ${hoverTextColor} transition duration-300 hover:scale-110`}
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

                <Link to='/cart' className='relative w-9 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110'>
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className={`w-10 h-6 ${hoverTextColor} transition duration-300 ease-in-out transform`}
                    />
                    <span className='absolute -right-1 bottom-3 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg'>
                        {getCartCount()}
                    </span>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu_icon" className={`w-6 cursor-pointer ${hoverTextColor} sm:hidden`} />
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`fixed top-0 left-0 right-0 bottom-0 bg-white z-20 transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 hover:scale-110`}>
                <div className="flex flex-col text-gray-600 h-full">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="dropdown_icon" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-4 pl-6 text-lg hover:text-red-600 transition duration-300 hover:scale-110'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-4 pl-6 text-lg hover:text-red-600 transition duration-300 hover:scale-110'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-4 pl-6 text-lg hover:text-red-600 transition duration-300 hover:scale-110'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-4 pl-6 text-lg hover:text-red-600 transition duration-300 hover:scale-110'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
