import React from 'react'
import Title from "../components/Title";
import { assets } from "../frontend_assets/assets";
import NewsLetterBox from '../components/NewsLetterBox'

function About() {
    return (
        <div>
            <div className='text-2xl border-t pt-8 text-center'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about_img" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>
                        Welcome to our company! We are passionate about delivering the highest quality products and services to our customers. With years of experience in the industry, we have built a reputation for excellence and a commitment to customer satisfaction. Our team of experts works tirelessly to innovate and improve, ensuring that we always offer the best solutions to meet your needs.
                    </p>
                    <p>
                        We believe in the power of collaboration and are dedicated to fostering long-term relationships with our clients, partners, and communities. Our values are centered around integrity, transparency, and a relentless pursuit of excellence in everything we do.
                    </p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>
                        Our mission is to lead the industry with cutting-edge products and services that empower our customers to achieve their goals. We are committed to sustainability, quality, and making a positive impact on the world around us. By consistently delivering exceptional value, we aim to exceed expectations and set new standards in our field.
                    </p>
                </div>
            </div>
            <div className='text-4xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>
            <div className='flex flex-col md:flex-row mb-20 text-sm'>
                <div className='border px-10 md:px-16 py-8 sm:flex flex-col gap-5'>
                    <b>Quality Assurance</b>
                    <p className='text-gray-600'>
                        We stand by the quality of our products and services. Each offering is meticulously crafted and thoroughly tested to meet the highest standards. Our commitment to quality ensures that you can trust us to deliver reliable and effective solutions every time.
                    </p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:flex flex-col gap-5'>
                    <b>Convenience</b>
                    <p className='text-gray-600'>
                        We understand that your time is valuable, which is why we strive to make your experience as convenient as possible. From our user-friendly website to our responsive customer support, we are here to make sure that your journey with us is seamless and hassle-free.
                    </p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:flex flex-col gap-5'>
                    <b>Exceptional Customer Service</b>
                    <p className='text-gray-600'>
                        Our customers are at the heart of everything we do. We go above and beyond to ensure that your needs are met with care and attention. Whether you have a question, need assistance, or are looking for advice, our dedicated customer service team is always ready to help.
                    </p>
                </div>
            </div>

            <NewsLetterBox />
        </div>
    )
}

export default About
