import React, { useContext, useState } from 'react';
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from '../frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';

function PlaceOrder() {

    const { navigate } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            {/* Left Side */}
            <div className="flex-flex-col gap-4 w-full max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className="flex gap-3">
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="text" placeholder='First Name' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="text" placeholder='Last Name' />
                </div>
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="email" placeholder='Email Adress' />
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="text" placeholder='Street' />
                <div className="flex gap-3">
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="text" placeholder='City' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="text" placeholder='State' />
                </div>
                <div className="flex gap-3">
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="number" placeholder='Zipcode' />
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="text" placeholder='Country' />
                </div>
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3' type="number" placeholder='Phone ' />
            </div>

            {/* Right Side */}
            <div className='mt-8 '>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className="mt-8">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* Payment Method Selection */}
                    <div className="flex flex-col lg:flex-row gap-3">
                        <div onClick={() => setPaymentMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-600' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe_logo" />
                        </div>
                        <div onClick={() => setPaymentMethod('razorPay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'razorPay' ? 'bg-green-600' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="razorpay_logo" />
                        </div>
                        <div onClick={() => setPaymentMethod('cashOnDelivery')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cashOnDelivery' ? 'bg-green-600' : ''}`}></p>
                            <p className='text-gray-600 text-sm font-bold mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className="w-full text-end mt-8">
                        <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm active:bg-gray-700'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder