import React from 'react'

function NewsLetterBox() {

    const onSubmitHandler = (e) => {
        e.preventDefault();

    }

    return (
        <div className="text-center">
            <p className='text-2xl font-medium text-gray-800'>Subsribe now & get 20% Off</p>
            <p className="text-gray-400 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt autem aliquid, similique delectus numquam vitae exercitationem dolorum molestiae rerum facere!
            </p>
            <form onClick={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='Enter Your Email' required />
                <button type='submit' className='bg-black text-white text-xs py-4 px-10'>Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetterBox