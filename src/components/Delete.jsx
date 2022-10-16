import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti';

export default function Delete(props) {

  const deleteReview = () => {
    axios.delete(`http://localhost:3030/reviews/${props.id}`)
      .then((res) => {
        props.setReviews(
          props.reviews.filter((item) => {
            return item.id !== props.id;
          })
        );
      });
  };

  return (
    <div>
      <TiDeleteOutline
        onClick={deleteReview}
        className="ml-auto mr-0 cursor-pointer text-red-600 text-xl"
      />
    </div>
  );
};