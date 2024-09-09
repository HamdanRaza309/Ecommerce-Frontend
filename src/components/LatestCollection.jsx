import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
    const { readProducts } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await readProducts();
                if (productsData?.length) {
                    // Get the latest 10 products
                    const latestItems = productsData.slice(-10);
                    setLatestProducts(latestItems);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
                setLatestProducts([]);
            }
        };

        fetchProducts();
    }, [readProducts]);

    return (
        <div className="my-10 px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <div className="text-center py-8">
                <Title text1="LATEST" text2="COLLECTION" />
                <p className="w-full sm:w-3/4 lg:w-2/3 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4">
                    Discover our latest collection featuring trendy styles, premium fabrics, and must-have designs.
                    From casual to chic, our new arrivals are crafted to elevate your wardrobe and keep you on top
                    of the latest fashion trends.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                {latestProducts.length > 0 ? (
                    latestProducts.map((item) => (
                        <ProductItem
                            key={item._id}
                            id={item._id}
                            images={item.images}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
}

export default LatestCollection;
