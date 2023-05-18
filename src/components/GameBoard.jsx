import { useSelector } from "react-redux";
import Card from "./Card";

function GameBoard() {
  const { cards } = useSelector((state) => state.game);

  return (
    <div
      className="game-board grid grid-cols-2 md:grid-cols-4"
      role="list"
      aria-label="Memory Game Board"
    >
      {cards.map((card) => (
        <div role="listitem" key={card.uuid}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
