import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Edit(props) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data['id'] = props.id;
    editReview(data);
    reset();
    window.location.reload();
  };

  const editReview = (data) => {
    axios.put('http://localhost:3030/reviews', data)
      .then((res) => {
        props.setReviews(
          props.reviews.map((item) => {
            return item.id === props.id? {
              id: item.id,
              book_title: item.book_title,
              book_review: item.book_review,
              book_rating: item.book_rating,
            }
          : item;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Edit Review</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <input type="text" placeholder="Book Review" {...register('book_review')} className='border-2 border-blue-500 rounded p-2 my-2' required />
        <input type="text" placeholder="Book Rating" {...register('book_rating')} className='border-2 border-blue-500 rounded p-2 my-2' required />
        <input type="submit" className='bg-cyan-700 w-1/4 py-2 rounded-xl text-white mt-6 cursor-pointer hover:bg-cyan-500'/>
      </form>
    </div>
  );
};
