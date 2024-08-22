import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

function Collection() {

    const { products } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([])

    useEffect(() => {
        setFilterProducts(products);
    }, [])


    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Left Side */}
            {/* Filter Options */}
            <div className="min-w-60">
                <p onClick={() => setShowFilter(!showFilter)} className='cursor-pointer gap-2 items-center my-2 text-xl'>FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
                </p>

                {/* Category Filters */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Men`} /> Men
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Women`} /> Women
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Kids`} /> Kids
                        </p>
                    </div>
                </div>
                {/* Sub-Category Filters */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFilter ? '' : 'hidden'}`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Topwear`} /> Topwear
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Bottomwear`} /> Bottomwear
                        </p>
                        <p className="flex gap-2">
                            <input className='w-3' type="checkbox" value={`Winterwear`} /> Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* Product Sort */}
                    <select className='border border-gray-300 text-sm px-2'>
                        <option value="relevent">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection