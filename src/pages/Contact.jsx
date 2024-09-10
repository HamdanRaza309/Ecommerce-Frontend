import React, { useState } from 'react';
import Title from "../components/Title";
import { assets } from "../frontend_assets/assets";
import NewsLetterBox from '../components/NewsLetterBox';
import { toast } from 'react-toastify';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // used web3react form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        formData.append("access_key", "77aa2997-d815-4289-9c54-24ac2fc2d4be");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            // console.log("Success", res);
            toast.success('Your form has been submitted, Stay tuned for reply.');
            setFormData({
                name: '',
                email: '',
                message: ''
            })
        }
    };

    return (
        <div className="px-4">
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>
            <div className='my-10 mb-28 gap-10 flex flex-col justify-center md:flex-row'>
                <img className='w-full md:max-w-[480px] object-cover' src={assets.contact_img} alt="Fashion Closet Store" />
                <div className='flex flex-col justify-center items-start gap-6 px-4 md:px-0'>
                    <p className='font-semibold text-xl text-blue-500'>Visit Our Store</p>
                    <p className='text-gray-500'>Maini Topi, Swabi <br /> Khyber Pakhtoon Khwa, Pakistan</p>
                    <p className='text-gray-500'>Phone: +10-293-8475 <br /> Email: fashioncloset@gmail.com</p>
                    <p className='font-semibold text-xl text-blue-500'>Join Our Team</p>
                    <p className='text-gray-500'>Discover more about our team and available job opportunities at Fashion Closet.</p>
                    <button className='btnForWhiteBg'>
                        Explore Jobs
                    </button>
                    <div className='flex gap-4 mt-6'>
                        <a href="https://facebook.com/fashioncloset" target="_blank" rel="noopener noreferrer" className='text-gray-500 hover:text-blue-600'>
                            Facebook
                        </a>
                        <a href="https://twitter.com/fashioncloset" target="_blank" rel="noopener noreferrer" className='text-gray-500 hover:text-blue-400'>
                            Twitter
                        </a>
                        <a href="https://instagram.com/fashioncloset" target="_blank" rel="noopener noreferrer" className='text-gray-500 hover:text-pink-500'>
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-10 items-center'>
                <div className='my-10 w-full'>
                    <div className='text-center text-xl font-semibold text-gray-600 mb-4'>
                        <Title text1={"LET'S"} text2={'TALK'} />
                    </div>
                    <form className='flex flex-col items-center gap-4' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full md:w-4/5 lg:w-2/3 p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full md:w-4/5 lg:w-2/3 p-2 border border-gray-300 rounded"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            className="w-full md:w-4/5 lg:w-2/3 p-2 border border-gray-300 rounded"
                            rows="5"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="btnForWhiteBg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <hr />

            <div className='my-10'>
                <div className='text-center text-xl font-semibold text-gray-600 mb-4'>
                    <Title text1={'FIND US '} text2={'ON THE MAP'} />
                </div>
                <div className='w-full h-[400px]'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11167.760572186914!2d73.414155579098!3d34.134713379129065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df83ecf098e4f1%3A0x8f9c8b264cd1a691!2sMaini%20Topi%2C%20Swabi%2C%20Khyber%20Pakhtunkhwa!5e0!3m2!1sen!2s!4v1684235739151!5m2!1sen!2s"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Store Location"
                    ></iframe>
                </div>
            </div>

            <NewsLetterBox />
        </div>
    );
}

export default Contact;
