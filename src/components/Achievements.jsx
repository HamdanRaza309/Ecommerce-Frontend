import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import Title from './Title';
import { assets } from '../frontend_assets/assets';

const Achievements = () => {

    const data = [
        {
            id: 1,
            icon: faDollarSign,
            title: 'Sales',
            value: '1M+',
            description: 'Sales Achieved',
        },
        {
            id: 2,
            icon: faUsers,
            title: 'Customers',
            value: '500k+',
            description: 'Happy Customers Worldwide',
        },
        {
            id: 3,
            icon: faStar,
            title: 'Reviews',
            value: '10k+',
            description: 'Positive Reviews Received',
        },
    ];

    return (
        <div className='bg-yellow-300 shadow-lg pt-8 pb-16'>
            <div className='flex flex-col justify-center items-center mt-10 mb-16 p-4 md:p-6 lg:p-10'>
                <Title text1={'OUR'} text2={'ACHIEVEMENTS'} />
                <p className='text-center text-md md:text-lg lg:text-lg mt-4 text-gray-600'>
                    Achievements that reflect our growth, customer satisfaction, and performance over the years.
                </p>
            </div>

            {/* Achievements Section */}
            <div className="flex flex-wrap justify-center items-center gap-12">
                {data.map((achievement, index) => (
                    <div
                        key={achievement.id}
                        className={`flex flex-col md:flex-row items-center justify-between w-full md:w-2/3 lg:w-1/2 p-6 border bg-blue-100 transform transition-transform duration-500 hover:scale-105 relative ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}
                        style={{ perspective: 1000 }}
                    >
                        <div className='flex-1 text-center md:text-left p-4'>
                            <FontAwesomeIcon
                                icon={achievement.icon}
                                size="3x"
                                className="text-yellow-400 mb-4 transform transition-transform duration-500 hover:rotate-12 hover:scale-125"
                            />
                            <h3 className="text-2xl font-bold text-gray-700 tracking-wider">{achievement.title}</h3>
                            <p className="text-3xl font-bold text-blue-500">{achievement.value}</p>
                            <p className="text-lg text-gray-600">{achievement.description}</p>
                        </div>
                        <div className='flex-1 relative transform -rotate-6'>
                            <img src={assets.about_img} alt="" className='h-48 w-48 object-cover transform transition-transform duration-500 hover:rotate-3 hover:scale-105' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
