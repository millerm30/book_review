import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add';
import Edit from './components/Edit';
import Delete from './components/Delete';
import uuid from 'react-uuid';

const App = () => {
  const [reviews, setRewviews] = useState([]);

  const getAllReviews = () => {
    axios
      .get('http://localhost:3030/reviews')
      .then((res) => {
        setRewviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div>
      <Add reviews={reviews} setReviews={setRewviews} />
      {!reviews.length ? (
        <h1 className="text-center text-2xl font-bold mt-6">No reviews added!</h1>
      ) : (
        <div className="grid grid-cols-1 ml-auto mr-auto md:grid-cols-2 lg:grid-cols-4 my-6">
          {reviews.map((review) => (
            <div
              key={uuid()}
              className="bg-white border-2 shadow-md rounded-lg overflow-hidden m-4 p-1"
            >
              <Delete
                review={review}
                reviews={reviews}
                setReviews={setRewviews}
                id={review.id}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {review.book_title}
                </div>
                <p className="text-gray-700 text-base">{review.book_review}</p>
              </div>
              <div className="px-6 py-2">
                <span className="inline-block bg-amber-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {review.book_rating}
                </span>
              </div>
              <div className="px-6 p-2">
                <Edit
                  review={review}
                  reviews={reviews}
                  setReviews={setRewviews}
                  id={review.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App
