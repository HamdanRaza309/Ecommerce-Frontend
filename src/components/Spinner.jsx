import React from 'react';

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 text-lg">Loading...</p>
        </div>
    );
};

export default Spinner;
