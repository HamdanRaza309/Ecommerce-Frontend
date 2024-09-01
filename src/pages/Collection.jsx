import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

function Collection() {
    const { readProducts, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevent');

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const productsData = await readProducts();
                // console.log(productsData);
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
        let productCopy = [...products]; // Use spread operator to copy array

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
        let filterProductsCopy = [...filterProducts]; // Use spread operator to copy array

        switch (sortType) {
            case 'low-high':
                filterProductsCopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                filterProductsCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                applyFilter();
                return; // Exit function early if default case
        }

        setFilterProducts(filterProductsCopy);
    };

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Left Side */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className='cursor-pointer gap-2 items-center my-2 text-xl'>
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
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
                        <option value="relevent">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filterProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Collection;
