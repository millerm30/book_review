import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Add(props) {

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addReview(data);
    reset();
    window.location.reload();   
  };

  const addReview = (data) => {
    const newReview = {
      book_title: data.book_title,
      book_review: data.book_review,
      book_rating: data.book_rating,
    };
    axios
      .post("http://localhost:3030/reviews", newReview)
      .then((res) => {
        console.log(res);
        props.setReviews([...props.reviews, newReview]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
      
  return (
    <div className='w-3/4 ml-auto mr-auto mt-6 bg-[#f8f8f8] p-6 rounded-lg shadow-lg border-2 md:w-1/2 lg:w-1/3'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <input type="text" placeholder="Book Title" {...register('book_title')} className='border-2 border-blue-500 rounded p-2 my-2' required />
        <input type="text" placeholder="Book Review" {...register('book_review')} className='border-2 border-blue-500 rounded p-2 my-2' required />
        <input type="text" placeholder="Book Rating" {...register('book_rating')} className='border-2 border-blue-500 rounded p-2 my-2' required />
        <input type="submit" className='bg-cyan-700 w-1/4 py-2 rounded-xl text-white mt-6 cursor-pointer hover:bg-cyan-500' />
      </form>
    </div>
  );
};

