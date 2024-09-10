import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faCheckCircle, faHeadset } from '@fortawesome/free-solid-svg-icons';

function OurPolicy() {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center py-20 px-4 sm:px-8 text-gray-700 shadow-lg mt-5 mb-10">
            <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faExchangeAlt} className='w-12 h-12 text-yellow-400 mb-4' />
                <p className='text-lg font-semibold mb-2'>Easy Exchange</p>
                <p className='text-sm text-gray-600'>We offer hassle-free exchange policy</p>
            </div>
            <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faCheckCircle} className='w-12 h-12 text-yellow-400 mb-4' />
                <p className='text-lg font-semibold mb-2'>7 Days Return</p>
                <p className='text-sm text-gray-600'>We provide free return policy</p>
            </div>
            <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faHeadset} className='w-12 h-12 text-yellow-400 mb-4' />
                <p className='text-lg font-semibold mb-2'>Customer Support</p>
                <p className='text-sm text-gray-600'>We provide 24/7 customer support</p>
            </div>
        </div>
    );
}

export default OurPolicy;
