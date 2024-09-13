import React from 'react'

function NewsLetterBox() {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    }

    return (
        <div className="text-center mt-20 px-4">
            {/* Main Heading */}
            <p className='text-2xl sm:text-3xl md:text-4xl font-medium'>
                Subscribe now & get <span className='text-blue-500'>20%</span> Off
            </p>

            {/* Subtext */}
            <p className="text-gray-400 mt-3 text-sm sm:text-base md:text-lg">
                Join our mailing list for exclusive offers, the latest trends, and 20% off your first order.
            </p>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border rounded-lg p-2'>
                <input
                    className='w-full sm:flex-1 outline-none p-3 border-b sm:border-none'
                    type="email"
                    placeholder='Enter Your Email'
                    required
                />
                <button
                    type='submit'
                    className='btnForWhiteBg px-6 py-3 mt-3 sm:mt-0 w-full sm:w-auto'>
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsLetterBox;
