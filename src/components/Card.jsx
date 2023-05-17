import { useDispatch } from "react-redux";
import { flipCard } from "../redux/gameSlice";

function Card({ card }) {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(flipCard(card.id));
  };

  return (
    <div
      className={`card p-2 m-2 bg-white shadow rounded ${
        card.isFlipped ? "bg-blue-500" : ""
      }`}
      onClick={handleCardClick}
    >
      <img
        className="card__image w-32 h-32 object-cover rounded"
        src={card.url}
        alt={card.title}
      />
    </div>
  );
}

export default Card;
