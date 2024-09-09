import React from 'react';

function Title({ text1, text2 }) {
    return (
        <div className="inline-flex items-center mb-4">
            <p className='text-gray-600 text-3xl'>
                {text1}{' '}
                <span className='text-red-600 font-semibold'>{text2}</span>
            </p>
            <div className="flex items-center ml-3">
                <p className='w-1 h-[3px] bg-red-600'></p>
                <p className='w-5 sm:w-6 h-[3px] bg-red-600 ml-1'></p>
            </div>
        </div>
    );
}

export default Title;
