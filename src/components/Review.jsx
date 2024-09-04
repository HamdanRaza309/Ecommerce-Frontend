import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';

function Review({ ratings, numOfReviews }) {

    const ratingStar = Array.from({ length: 5 }, (_, index) => {
        const fullStar = index + 1;
        const halfStar = index + 0.5;

        return (
            <span key={index} className="mx-0.5">
                {ratings >= fullStar ? (
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                ) : ratings >= halfStar ? (
                    <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />
                ) : (
                    <FontAwesomeIcon icon={faStar} className="text-gray-300" />  // dull star icon
                )}
            </span>

        );
    });

    return (
        <div className="flex items-center">
            <div className="flex items-center">
                {ratingStar}
                <span className="text-yellow-400 ml-2">{ratings.toFixed(1)}</span>
            </div>
            <p className="text-gray-400 ml-4">({numOfReviews} customer reviews)</p>
        </div>
    );
}

export default Review;
