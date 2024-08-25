import React from 'react'
import { assets } from '../frontend_assets/assets'

function Footer() {
    return (
        <>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img className='mb-5 w-52' src={assets.logo} alt="logo" />
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto et vero rerum, est reprehenderit in voluptas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium similique minima dicta minus quasi, commodi suscipit dolores ullam nesciunt repudiandae?</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>HOME</li>
                        <li>ABOUT</li>
                        <li>DELIVERY</li>
                        <li>PRIVACY POLICY</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+10-293-8475</li>
                        <li>my123@gmai.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ title.com - All Rights Reserved</p>
            </div>
        </>
    )
}

export default Footer