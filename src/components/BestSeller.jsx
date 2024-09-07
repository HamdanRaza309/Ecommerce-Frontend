import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const { readProducts } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const productsData = await readProducts();
                if (productsData && productsData.length > 0) {
                    const bestProduct = productsData.filter((item) => item.bestseller);
                    setBestSeller(bestProduct.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
                setBestSeller([])
            }
        };

        fetchedProducts();
    }, [readProducts]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore our best-selling items that our customers love the most. These top-rated products are known for their quality, style, and timeless appeal. Don’t miss out on what everyone’s talking about!
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        images={item.images}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div >
    );
}

export default BestSeller;
