import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flipCard, checkMatch, checkGameState } from "../redux/gameSlice";
import "./Card.css";

function Card({ card }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.game);

  const handleCardClick = () => {
    if (!loading) {
      dispatch(flipCard(card.uuid));
    }
  };

  useEffect(() => {
    if (card.isFlipped) {
      setTimeout(() => {
        dispatch(checkMatch());
        dispatch(checkGameState());
      }, 300);
    }
  }, [card.isFlipped, dispatch]);

  return (
    <div
      className={`card p-2 m-2 shadow rounded tilt-shaking ${
        card.isMatched ? "card--success" : ""
      }`}
      onClick={handleCardClick}
      role="button"
      tabIndex="0"
      aria-label={`Flip card ${card.title}`}
    >
      <div
        className="card__content"
        style={{
          transform: card.isFlipped ? "rotateY(180deg)" : "",
          transition: "transform 0.5s",
        }}
      >
        <div
          className={`card__front flex items-center justify-center w-32 h-32 rounded text-white text-2xl ${
            loading ? "bg-gray-600" : "bg-black"
          }`}
        >
          ?
        </div>
        <img
          className="card__back w-32 h-32 object-cover rounded"
          src={card.url}
          alt={`Card picture representing ${card.title}`}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    isFlipped: PropTypes.bool.isRequired,
    isMatched: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
