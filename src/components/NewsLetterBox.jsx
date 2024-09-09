import React from 'react'

function NewsLetterBox() {

    const onSubmitHandler = (e) => {
        e.preventDefault();

    }

    return (
        <div className="text-center border-b mt-32">
            <p className='text-4xl font-medium text-red-600'>Subsribe now & get 20% Off</p>
            <p className="text-gray-400 mt-3">
                Join our mailing list for exclusive offers, the latest trends, and 20% off your first order.
            </p>
            <form onClick={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='Enter Your Email' required />
                <button type='submit' className='btnForWhiteBg'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetterBox