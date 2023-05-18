import { useSelector } from "react-redux";
import "./ScoreBoard.css";

function ScoreBoard() {
  const { playerName, score, gameState } = useSelector((state) => state.game);
  return (
    <div className="score-board">
      <p className="score-board__score">Success: {score.success}</p>
      <p className="score-board__error">Error: {score.error}</p>
      {gameState === "finished" && (
        <div className="score-board__winner winner-banner">
          {" "}
          Congratulations {playerName}! <div>You finish the game 🎉 </div>
        </div>
      )}
    </div>
  );
}

export default ScoreBoard;
