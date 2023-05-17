import { useDispatch } from "react-redux";
import { flipCard, checkMatch, checkGameState } from "../redux/gameSlice";

function Card({ card }) {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(flipCard(card.uuid));
    dispatch(checkMatch());
    dispatch(checkGameState());
  };

  return (
    <div className={`card p-4 m-2 shadow rounded`} onClick={handleCardClick}>
      {card.isFlipped ? (
        <img
          className="card__image w-32 h-32 object-cover rounded"
          src={card.url}
          alt={card.title}
        />
      ) : (
        <div className="card__placeholder flex items-center justify-center bg-black w-32 h-32 rounded text-white text-2xl">
          ?
        </div>
      )}
    </div>
  );
}

export default Card;
