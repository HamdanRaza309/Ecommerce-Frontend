import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

function SearchBar() {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);

    return showSearch && visible ? (
        <div className="py-4">
            <div className="flex items-center justify-center">
                <div className="relative w-2/3 sm:w-1/2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-3 pl-10 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
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
                    className="relative right-8 p-2 rounded-full text-red-600 hover:text-red-700 transition-all duration-200 ease-in-out"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    ) : null;
}

export default SearchBar;
