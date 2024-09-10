import React from 'react';
import { assets } from '../frontend_assets/assets';
import { useNavigate } from 'react-router-dom';

function Hero() {

    const navigate = useNavigate();

    return (
        <div className="mt-10 flex flex-col-reverse sm:flex-row shadow-xl">
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-16 lg:py-24 px-6 sm:px-12 lg:px-16">
                <div className='text-center sm:text-left'>
                    <div className="flex justify-center sm:justify-start mb-4">
                        <button className='btnForWhiteBg'>
                            OUR BESTSELLERS
                        </button>
                    </div>
                    <h1 className='prata-regular text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-gray-800 mb-4'>
                        Latest Arrivals
                    </h1>
                    <p className='text-gray-600 mb-6'>
                        Discover our newest collection of stylish and trendy items, perfect for your wardrobe.
                    </p>
                    <div className="flex justify-center sm:justify-start">
                        <button onClick={() => navigate('/collection')} className='btnForWhiteBg'>
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Right Side */}
            <div className='w-full sm:w-1/2 bg-yellow-400 flex items-center justify-center'>
                <img className='w-full h-auto object-cover' src={assets.hero_img} alt="hero_img" />
            </div>
        </div>
    );
}

export default Hero;
