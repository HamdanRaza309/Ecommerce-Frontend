import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {

    const { readProducts } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const fetchedProducts = async () => {
            try {
                const productsData = await readProducts();
                if (productsData && productsData.length > 0) {
                    setLatestProducts(productsData.slice(productsData.length - 10, productsData.length))

                }
            } catch (error) {
                console.error("Failed to fetch products", error);
                setLatestProducts([])
            }
        };

        fetchedProducts();
    }, [readProducts]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTION'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover our latest collection featuring trendy styles, premium fabrics, and must-have designs. From casual to chic, our new arrivals are crafted to elevate your wardrobe and keep you on top of the latest fashion trends.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default LatestCollection;