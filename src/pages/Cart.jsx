import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";
import { assets } from '../frontend_assets/assets';
import CartTotal from '../components/CartTotal';

function Cart() {
    const { getCartItems, getUser, currency, deleteCartItem, updateCartItem, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchUserAndCartItems = async () => {
            try {
                const fetchedCartItems = await getCartItems();
                setCartData(fetchedCartItems);
            } catch (error) {
                console.error("Failed to fetch user or cart items", error);
                setCartData([]);
            }
        };

        fetchUserAndCartItems();
    }, [getCartItems, getUser]);

    return (
        <div className="container mx-auto px-4 py-8">
            <Title text1={'YOUR'} text2={'CART'} className="text-3xl font-bold mb-8 text-center" />

            {cartData.length > 0 ? (
                <div className="space-y-6">
                    {cartData.map((item, index) => {
                        if (!item.product) {
                            return <div key={index} className='py-4 text-gray-700'>Product not found</div>;
                        }

                        return (
                            <div
                                key={index}
                                className='flex items-center bg-white shadow-sm p-4 transition-transform transform hover:shadow-lg hover:bg-gray-50 hover:cursor-pointer duration-200'
                            >
                                <img
                                    src={item.product.images && item.product.images.length > 0 ? item.product.images[0] : 'https://via.placeholder.com/150?text=No+Images'}
                                    alt='product'
                                    className='w-24 h-24 object-cover rounded-lg'
                                />
                                <div className='flex-1 ml-4'>
                                    <p className='text-lg font-semibold'>{item.product.name}</p>
                                    <p className='text-gray-800 mt-1'>{currency}{item.product.price}</p>
                                    <p className='text-gray-500 mt-1'>Size: {item.productSize}</p>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <input
                                        onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateCartItem(item._id, Number(e.target.value))}
                                        className='border border-gray-300 rounded-lg w-16 py-1 px-2 text-center'
                                        type="number"
                                        min={1}
                                        defaultValue={item.quantity}
                                    />
                                    <img
                                        onClick={() => deleteCartItem(item._id)}
                                        className='w-6 h-6 cursor-pointer'
                                        src={assets.bin_icon}
                                        alt="Remove"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='text-center'>
                    <img
                        src='https://via.placeholder.com/200?text=Empty+Cart'
                        alt='Empty Cart'
                        className='mx-auto mb-4'
                    />
                    <p className='text-gray-500 text-xl'>Your cart is currently empty</p>
                </div>
            )
            }
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button onClick={() => navigate('/place-order')} className='bg-black text-white my-8 px-8 py-3 text-sm active:bg-gray-700'>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Cart;
