import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner'

function Collection() {
    const { readProducts, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevent');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const productsRef = useRef();

    useEffect(() => {
        const fetchedProducts = async () => {
            setLoading(true);
            try {
                const productsData = await readProducts();
                setProducts(productsData);
                setFilterProducts(productsData || []);
            } catch (error) {
                console.error("Failed to fetch products", error);
                setProducts([]);
                setFilterProducts([]);
            } finally {
                setLoading(false);
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
        const offset = 150;
        const elementPosition = productsRef.current.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    };

    return (
        <>
            <div className="flex flex-col min-h-[500px] lg:flex-row justify-between items-center bg-white p-8 rounded-lg shadow-lg">
                {/* Left Section - Text */}
                <div className="lg:w-1/2 space-y-6">
                    <h3 className="text-yellow-500 text-sm font-medium">Fashion Closet</h3>
                    <h1 className="text-4xl font-bold text-blue-500">
                        New Collections <br /> For You
                    </h1>
                    <p className="text-gray-500">
                        Phaesellus sed elit efficitur, gravida libero sit amet, scelerisque mauris.
                        Vivamus ornare augue lorem at volutpat.
                    </p>
                    <button className="btnForWhiteBg">
                        <Link to={'/about'}>
                            ABOUT US
                        </Link>
                    </button>
                </div>

                {/* bubbles */}
                <div className="hidden lg:block">
                    <p className='relative top-0 left-20 bg-yellow-400 w-20 h-20 rounded-full'></p>
                    <p className='relative bottom-32 right-10 bg-blue-500 w-24 h-24 rounded-full'></p>
                    <p className='relative bottom-20 right-10 bg-yellow-400 w-32 h-32 rounded-full'></p>
                    <p className='relative bottom-0 right-0 bg-blue-500 w-12 h-12 rounded-full'></p>
                    <p className='relative top-6 right-40 bg-yellow-400 w-14 h-14 rounded-full'></p>
                </div>

                {/* Right Section - Image */}
                <div className="relative lg:w-1/2 flex justify-center lg:mt-0 mt-10">
                    <img
                        src={assets.collection_img}
                        alt="Lady Model"
                        className="w-6/7 min-h-[400px] rounded-lg"
                    />

                    {/* Overlay Elements */}
                    <div className="hidden sm:block absolute bottom-3 left-0 lg:left-10 bg-white p-2 rounded-full shadow-md">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs lg:text-sm font-medium text-yellow-500">Customer Ratings</span>
                            <div className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 lg:bottom-14 lg:right-10 bg-white p-2 rounded-full shadow-md">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs lg:text-sm font-medium text-yellow-500">100% Secure Payment</span>
                            <div className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center min-h-[500px]">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div>
                        <SearchBar />
                    </div>
                    <div ref={productsRef} className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
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
                                        <button
                                            onClick={() => handleSelectPage(page - 1)}
                                            className={`cursor-pointer text-lg sm:text-xl p-2 rounded-full ${page === 1 ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} transition duration-200 ${page === 1 ? 'pointer-events-none' : ''}`}
                                        >
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        {
                                            [...Array(Math.ceil(filterProducts.length / 30))].map((_, i) => (
                                                <button
                                                    onClick={() => handleSelectPage(i + 1)}
                                                    key={i}
                                                    className={`w-8 sm:w-10 px-2 py-1 text-sm lg:text-base ${page === i + 1 ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white'} transition duration-200`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))
                                        }
                                        <button
                                            onClick={() => handleSelectPage(page + 1)}
                                            className={`cursor-pointer text-lg sm:text-xl p-2 rounded-full ${page === Math.ceil(filterProducts.length / 30) ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'} transition duration-200 ${page === Math.ceil(filterProducts.length / 30) ? 'pointer-events-none' : ''}`}
                                        >
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                    </div>
                                    <h1 className="text-sm">Products from {Math.min(page * 30 - 29, filterProducts.length)} to {Math.min(page * 30, filterProducts.length)}</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Collection;