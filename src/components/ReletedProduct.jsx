import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function ReletedProduct({ category, subCategory }) {

    const { products } = useContext(ShopContext);
    const [releted, setReleted] = useState([]);

    useEffect(() => {

        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

            // Shuffle and take a random slice of 5
            const getRandomSlice = (array, size) => {
                const shuffled = array.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, size);
            };

            const randomProducts = getRandomSlice(productsCopy, 5);
            setReleted(randomProducts);
        }

    }, [products])


    return (
        <div className="my-24">
            <div className="text-center py-8 text-3xl">
                <Title text1={'RELETED'} text2={'PRODUCTS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, illum earum nisi dolorem eaque hic praesentium labore. Dolore ullam, quasi, iste error recusandae ut provident alias enim perspiciatis nihil neque.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    releted.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default ReletedProduct