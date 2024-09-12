import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import Title from './Title';

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
        <div className='shadow-lg  py-12'>
            <div className='text-center my-5'>
                <Title text1={'OUR'} text2={'ACHIEVEMENTS'} />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12">
                {data.map((achievement) => (
                    <div
                        key={achievement.id}
                        className="relative w-60 h-60 bg-yellow-400 rounded-full shadow-lg flex flex-col justify-center items-center transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:rotate-6"
                        style={{ perspective: 1000 }}
                    >
                        <FontAwesomeIcon
                            icon={achievement.icon}
                            size="3x"
                            className="text-white mb-2 transform transition-transform duration-500 hover:rotate-12 hover:scale-125"
                        />
                        <h3 className="text-2xl font-semibold text-gray-700 tracking-wider">{achievement.title}</h3>
                        <p className="text-3xl font-extrabold text-white">{achievement.value}</p>
                        <p className="text-sm text-gray-700 text-center absolute bottom-4 w-40">{achievement.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
