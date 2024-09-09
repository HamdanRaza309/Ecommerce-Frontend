import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const { readProducts } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await readProducts();
                if (productsData?.length) {
                    // Filter and get the top 5 best-selling products
                    const bestProducts = productsData.filter((item) => item.bestseller).slice(0, 5);
                    setBestSeller(bestProducts);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
                setBestSeller([]);
            }
        };

        fetchProducts();
    }, [readProducts]);

    return (
        <div className="my-10 px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="text-center py-8">
                <Title text1="BEST" text2="SELLER" />
                <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4">
                    Explore our best-selling items that our customers love the most. These top-rated products
                    are known for their quality, style, and timeless appeal. Don’t miss out on what everyone’s
                    talking about!
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                {bestSeller.length > 0 ? (
                    bestSeller.map((item) => (
                        <ProductItem
                            key={item._id}
                            id={item._id}
                            images={item.images}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No best sellers available.</p>
                )}
            </div>
        </div>
    );
}

export default BestSeller;
