import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faEdit, faTrash, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

function ProductReviews({ productId }) {
    const { decodeToken } = useContext(ShopContext)
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState(0);
    const [comment, setComment] = useState('');
    const [editingReview, setEditingReview] = useState(null);

    const token = localStorage.getItem('token');
    const decoded = decodeToken(token);
    const userId = decoded?.user?.id;

    const config = {
        headers: {
            'auth-token': token,
        },
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/ratings/products/${productId}/fetchreviews`
            );
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const addOrUpdateReview = async () => {
        try {
            if (editingReview) {
                await axios.put(
                    `http://localhost:5000/api/ratings/products/${productId}/updatereview/${editingReview._id}`,
                    { ratings, comment },
                    config
                );
                setEditingReview(null);
                toast.success('Your feedback is updated successfully');
            } else {
                await axios.post(
                    `http://localhost:5000/api/ratings/products/${productId}/addreview`,
                    { ratings, comment },
                    config
                );
                toast.success('Your feedback has been submitted successfully');
            }
            fetchReviews();
            setRatings(0);
            setComment('');
        } catch (error) {
            console.error('Error adding/updating review:', error);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/ratings/products/${productId}/deletereview/${reviewId}`,
                config
            );
            fetchReviews();
            toast.error('Your feedback has been deleted.');
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const startEditing = (review) => {
        setRatings(review.ratings);
        setComment(review.comment);
        setEditingReview(review);
    };

    return (
        token && (
            <div className="max-w-2xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>

                {reviews.length > 0 ? (
                    <div>
                        {reviews.map((review, index) => (
                            <div
                                key={review._id}
                                className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105"
                            >
                                <div>
                                    <div className="flex items-center">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FontAwesomeIcon
                                                key={i}
                                                icon={
                                                    review.ratings >= i + 1
                                                        ? faStar
                                                        : review.ratings >= i + 0.5
                                                            ? faStarHalfAlt
                                                            : faStar
                                                }
                                                className={
                                                    review.ratings >= i + 1 || review.ratings >= i + 0.5
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300'
                                                }
                                            />
                                        ))}
                                        <span className="text-gray-700 ml-2">{review.ratings}</span>
                                    </div>
                                    <p className="text-lg text-gray-600 mt-2">{review.comment}</p>
                                    <div className="flex mt-3">
                                        <div className="flex space-x-2 ml-3">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                            <small className="text-gray-600 font-medium">{review.name}</small>
                                        </div>
                                        <div className="flex space-x-2 ml-3">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                                            <small className="text-gray-600 font-medium">{review.date}</small>
                                        </div>
                                    </div>
                                </div>
                                {userId === review.user
                                    ?
                                    (<div className="flex space-x-3">
                                        <button
                                            onClick={() => startEditing(review)}
                                            className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition duration-300"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => deleteReview(review._id)}
                                            className="text-red-500 hover:text-red-700 transform hover:scale-110 transition duration-300"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>)
                                    :
                                    ' '}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">
                        {editingReview ? 'Update Review' : 'Add a Review'}
                    </h3>
                    <div className="flex items-center mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setRatings(i + 1)}
                                className={`text-2xl transform hover:scale-110 transition duration-300 ${ratings > i ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                            >
                                <FontAwesomeIcon icon={faStar} />
                            </button>
                        ))}
                    </div>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review..."
                    ></textarea>
                    <button
                        onClick={addOrUpdateReview}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300"
                    >
                        {editingReview ? 'Update Review' : 'Submit Review'}
                    </button>
                </div>
            </div>
        )
    );
}

export default ProductReviews;
