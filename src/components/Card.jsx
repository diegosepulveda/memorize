import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flipCard, checkMatch, checkGameState } from "../redux/gameSlice";
import "./Card.css";

function Card({ card }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.game);

  const handleCardClick = () => {
    dispatch(flipCard(card.uuid));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(checkMatch());
      dispatch(checkGameState());
    }, 1000);
  }, [card.isFlipped, dispatch]);

  return (
    <div
      className={`card p-2 m-2 shadow rounded tilt-shaking ${
        card.isMatched ? "card_success__animation" : ""
      }`}
      onClick={!loading ? handleCardClick : undefined}
    >
      <div
        className="content"
        style={{
          transform: card.isFlipped ? "rotateY(180deg)" : "",
          transition: "transform 0.5s",
        }}
      >
        <div
          className={`front card__placeholder flex items-center justify-center w-32 h-32 rounded text-white text-2xl ${
            loading ? "bg-gray-900" : "bg-black"
          }`}
        >
          ?
        </div>
        <img
          className="back card__image w-32 h-32 object-cover rounded"
          src={card.url}
          alt={card.title}
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
