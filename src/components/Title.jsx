import React from 'react';

function Title({ text1, text2 }) {
    return (
        <div className="inline-flex items-center mb-6">
            {/* Text Section */}
            <p className='text-gray-600 text-2xl sm:text-3xl lg:text-4xl'>
                {text1}{' '}
                <span className='text-blue-500 font-semibold'>{text2}</span>
            </p>

            {/* Line Decorations */}
            <div className="flex items-center ml-3">
                <p className='w-1 h-[2px] sm:w-1 sm:h-[3px] lg:w-1 lg:h-[3px] bg-blue-600'></p>
                <p className='w-5 sm:w-6 lg:w-8 h-[2px] sm:h-[3px] lg:h-[3px] bg-blue-600 ml-1'></p>
            </div>
        </div>
    );
}

export default Title;
