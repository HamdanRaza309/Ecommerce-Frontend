import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Review({ ratings, numOfReviews }) {
    const ratingStar = Array.from({ length: 5 }, (_, index) => {

        // value of index after each iteration: i = 0, i = 1, i = 2, i = 3, i = 4
        const fullStar = index + 1;
        const halfStar = index + 0.5;

        return (
            <span key={index} className="mx-1 transition-transform transform hover:scale-110">
                {ratings >= fullStar ? (
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                ) : ratings >= halfStar ? (
                    <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
                ) : (
                    <FontAwesomeIcon icon={faStar} className="text-gray-300" />
                )}
            </span>
        );
    });

    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                {ratingStar}
                <span className="text-yellow-500 text-lg font-semibold">{ratings.toFixed(1)}</span>
            </div>
            <p className="text-gray-500 text-sm">({numOfReviews} customer reviews)</p>
        </div>
    );
}

export default Review;
