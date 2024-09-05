import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { assets } from '../frontend_assets/assets';
import Title from './Title'

const socialLinks = ["#fashion", "#style", "#trends"];

const Footer = () => {
    const [currentSocialLink, setCurrentSocialLink] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleText = () => {
            const fullText = socialLinks[currentSocialLink];
            const updatedText = isDeleting ? fullText.substring(0, displayedText.length - 1) : fullText.substring(0, displayedText.length + 1);
            setDisplayedText(updatedText);

            if (!isDeleting && updatedText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setCurrentSocialLink((prevLink) => (prevLink + 1) % socialLinks.length);
            }
        };
        const timer = setTimeout(handleText, isDeleting ? 50 : 200);

        return () => {
            clearTimeout(timer);
        };
    }, [displayedText, isDeleting, currentSocialLink]);

    return (
        <>
            <div className='flex flex-col items-center py-8 text-black w-full'>
                <div className='flex flex-col items-center p-5 mb-6 mt-10 text-center'>
                    <div className="flex items-center mb-4 justify-center">
                        <div className="bg-pink-600 h-1 w-12 mx-1"></div>
                        <div className="bg-pink-600 h-1 w-1"></div>
                        <p className="text-lg font-semibold ml-2">EXPLORE THE TRENDS</p>
                    </div>
                    <div className="text-4xl">
                        <Title text1={'FOLLOW '} text2={'US FOR THE LATEST'} />
                    </div>
                    <div className='h-12'>
                        <h2 className="text-2xl md:text-4xl text-pink-600">{displayedText}</h2>
                    </div>
                </div>
                <div className='flex flex-wrap justify-center space-x-6 md:space-x-28 w-full'>
                    <div className='flex flex-col items-center'>
                        <Link target='_blank' to="https://www.facebook.com/fashion-closet" className="items-center mb-2">
                            <FontAwesomeIcon icon={faFacebook} className='text-4xl md:text-5xl mb-2 text-blue-700' />
                        </Link>
                        <p className='text-xl md:text-2xl'>Fashion-Closet</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link target='_blank' to="https://www.instagram.com/fashion-closet" className="items-center mb-2">
                            <FontAwesomeIcon icon={faInstagram} className='text-4xl md:text-5xl mb-2 text-pink-600' />
                        </Link>
                        <p className='text-xl md:text-2xl'>Fashion-Closet</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Link target='_blank' to="https://twitter.com/fashion-closet" className="items-center mb-2">
                            <FontAwesomeIcon icon={faTwitter} className='text-4xl md:text-5xl mb-2 text-blue-400' />
                        </Link>
                        <p className='text-xl md:text-2xl'>Fashion-Closet</p>
                    </div>
                </div>
            </div>
            <footer className="border-t border-gray-400 mt-8 py-12 w-full">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="flex flex-wrap justify-center lg:justify-between text-center lg:text-left">
                        {/* Left Section */}
                        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start items-center mb-4">
                                <img className='w-52' src={assets.logo} alt="Fashion Closet Brand Logo" />
                            </div>
                            <p className="text-black mb-6">
                                Discover the latest fashion trends and elevate your style with our curated collections. Shop now!
                            </p>
                        </div>
                        {/* Right Sections */}
                        <div className="w-full lg:w-2/3 flex flex-wrap justify-center lg:justify-evenly">
                            <div className="w-full sm:w-1/2 md:w-1/4 mb-6 text-center">
                                <h3 className="text-lg font-semibold mb-4">STAY CONNECTED</h3>
                                <div className="flex flex-col justify-center items-center lg:items-start">
                                    <Link target='_blank' to="https://www.facebook.com/fashion-closet" className="flex justify-between items-center text-black hover:text-gray-600 mb-2">
                                        Facebook
                                        <FontAwesomeIcon icon={faFacebook} className='ml-2' />
                                    </Link>
                                    <Link target='_blank' to="https://www.instagram.com/fashion-closet" className="flex justify-between items-center text-black hover:text-gray-600 mb-2">
                                        Instagram
                                        <FontAwesomeIcon icon={faInstagram} className='ml-2' />
                                    </Link>
                                    <Link target='_blank' to="https://twitter.com/fashion-closet" className="flex justify-between items-center text-black hover:text-gray-600 mb-2">
                                        Twitter
                                        <FontAwesomeIcon icon={faTwitter} className='ml-2' />
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/4 mb-6 text-center">
                                <h3 className="text-lg font-semibold mb-4">SHOP WITH US</h3>
                                <ul className="text-black space-y-2">
                                    <li><Link to="#" className="hover:text-gray-600 ">New Arrivals</Link></li>
                                    <li><Link to="#" className="hover:text-gray-600 ">Accessories</Link></li>
                                    <li><Link to="#" className="hover:text-gray-600 ">Sale</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-400 mt-8 pt-8 text-black text-sm text-center lg:text-left">
                        <p className="mt-2">© 2024 Fashion-Closet. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
