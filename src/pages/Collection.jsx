import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Collection() {
    const { readProducts, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevent');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const productsData = await readProducts();
                setProducts(productsData);
                setFilterProducts(productsData || []);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setProducts([]);
                setFilterProducts([]);
            }
        };

        fetchedProducts();
    }, []);

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const applyFilter = () => {
        let productCopy = [...products];

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productCopy);
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);

    const sortProducts = () => {
        let filterProductsCopy = [...filterProducts];

        switch (sortType) {
            case 'low-high':
                filterProductsCopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                filterProductsCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                applyFilter();
                return;
        }

        setFilterProducts(filterProductsCopy);
    };

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    const handleSelectPage = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(filterProducts.length / 30) && selectedPage !== page) {
            setPage(selectedPage);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Left Side */}
            <div className="sm:w-60 w-full sm:min-w-[15rem]">
                <p onClick={() => setShowFilter(!showFilter)} className='cursor-pointer flex gap-2 items-center my-2 text-xl'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
                </p>

                <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Men`} onChange={toggleCategory} /> Men
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Women`} onChange={toggleCategory} /> Women
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Kids`} onChange={toggleCategory} /> Kids
                        </p>
                    </div>
                </div>

                <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFilter ? '' : 'hidden'}`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Topwear`} onChange={toggleSubCategory} /> Topwear
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Bottomwear`} onChange={toggleSubCategory} /> Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Winterwear`} onChange={toggleSubCategory} /> Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex flex-col lg:flex-row justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
                        <option value="relevent">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.slice(page * 30 - 30, page * 30).map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            images={item.images}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
                {filterProducts.length > 0 && (
                    <div className='flex flex-col items-center'>
                        <div className="flex justify-center items-center mt-6 space-x-2">
                            <span
                                onClick={() => handleSelectPage(page - 1)}
                                className={`cursor-pointer text-lg sm:text-xl p-2 rounded-full ${page === 1 ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} transition duration-200 ${page === 1 ? 'pointer-events-none' : ''}`}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </span>
                            {
                                [...Array(Math.ceil(filterProducts.length / 30))].map((_, i) => (
                                    <span
                                        onClick={() => handleSelectPage(i + 1)}
                                        key={i}
                                        className={`cursor-pointer text-center w-8 sm:w-10 px-2 sm:px-3 py-1 text-sm sm:text-lg ${page === i + 1 ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white'} transition duration-200`}
                                    >
                                        {i + 1}
                                    </span>
                                ))
                            }
                            <span
                                onClick={() => handleSelectPage(page + 1)}
                                className={`cursor-pointer text-lg sm:text-xl p-2 rounded-full ${page === Math.ceil(filterProducts.length / 30) ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} transition duration-200 ${page === Math.ceil(filterProducts.length / 30) ? 'pointer-events-none' : ''}`}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </span>
                        </div>
                        <h1 className="text-sm">Products from {Math.min(page * 30 - 29, filterProducts.length)} to {Math.min(page * 30, filterProducts.length)}</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Collection;
