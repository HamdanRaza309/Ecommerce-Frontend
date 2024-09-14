import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faDollarSign, faSmile } from '@fortawesome/free-solid-svg-icons';
import Title from './Title';

const BusinessFocus = () => {
    return (
        <div className="bg-yellow-300 p-8 md:p-16">
            <div className="container mx-auto text-center px-4 md:px-6 lg:px-0">
                <Title text1={'OUR'} text2={'BUSINESS FOCUS'} />
                <p className="text-sm sm:text-base md:text-lg text-gray-500 text-gray-500 mt-4">
                    At the heart of our company, we are driven by core values that guide every decision, ensuring the best outcomes for our customers and stakeholders. We believe in providing exceptional quality, competitive pricing, and unparalleled customer satisfaction.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mt-8">
                    {/* High Quality */}
                    <div className="group relative bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div className="absolute inset-x-0 top-0 h-1 bg-blue-100 group-hover:h-full transition-all duration-500"></div>
                        <div className="relative z-10">
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                size="3x"
                                className="text-yellow-400 mb-4 md:mb-6"
                            />
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 text-blue-500">High Quality</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-500">
                                We are committed to delivering high-quality products and services that exceed expectations.
                            </p>
                        </div>
                    </div>

                    {/* Low Price */}
                    <div className="group relative bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div className="absolute inset-x-0 top-0 h-1 bg-blue-100 group-hover:h-full transition-all duration-500"></div>
                        <div className="relative z-10">
                            <FontAwesomeIcon
                                icon={faDollarSign}
                                size="3x"
                                className="text-yellow-400 mb-4 md:mb-6"
                            />
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 text-blue-500">Low Price</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-500">
                                Affordable pricing with no compromise on quality – we offer the best value in the market.
                            </p>
                        </div>
                    </div>

                    {/* Customer Satisfaction */}
                    <div className="group relative bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div className="absolute inset-x-0 top-0 h-1 bg-blue-100 group-hover:h-full transition-all duration-500"></div>
                        <div className="relative z-10">
                            <FontAwesomeIcon
                                icon={faSmile}
                                size="3x"
                                className="text-yellow-400 mb-4 md:mb-6"
                            />
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 md:mb-4 text-blue-500">Customer Satisfaction</h3>
                            <p className="text-sm sm:text-base md:text-lg text-gray-500">
                                Our priority is ensuring complete satisfaction with every interaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessFocus;
