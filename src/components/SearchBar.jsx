import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

function SearchBar() {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);

    useEffect(() => {
        if (showSearch && visible && searchRef.current) {
            const offset = 80;
            const elementPosition = searchRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, [visible, showSearch]);

    return showSearch && visible ? (
        <div ref={searchRef} className="py-4">
            <div className="flex items-center justify-center px-4">
                <div className="relative w-full md:w-2/3 lg:w-1/2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-3 pl-10 pr-4 rounded-none border-t border-l border-b border-gray-300 focus:border-yellow-500 outline-none text-sm"
                        type="text"
                        placeholder="Search for products..."
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                </div>
                <button
                    onClick={() => setShowSearch(false)}
                    className="py-3 px-6 text-sm font-semibold tracking-wide text-white bg-red-500 border border-transparent rounded-none shadow-[inset_0_0_0_50px_#ef4444] transition ease-in-out duration-300 hover:text-red-500 hover:bg-transparent hover:border-red-500 hover:shadow-[inset_0_0_0_0_#ef4444]"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    ) : null;
}

export default SearchBar;
