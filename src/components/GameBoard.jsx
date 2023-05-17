import { useSelector } from "react-redux";
import Card from "./Card";

function GameBoard() {
  const { cards } = useSelector((state) => state.game);

  return (
    <div className="game-board grid grid-cols-2 md:grid-cols-4 ">
      {cards.map((card) => (
        <Card key={card.uuid} card={card} />
      ))}
    </div>
  );
}

export default GameBoard;
