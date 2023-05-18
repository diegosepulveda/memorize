import { useSelector } from "react-redux";
import "./ScoreBoard.css";

function ScoreBoard() {
  const { playerName, score, gameState } = useSelector((state) => state.game);
  return (
    <section className="score-board" aria-label="Score Board">
      <h2 className="score-board__player">Player: {playerName}</h2>
      <p className="score-board__score" role="status">
        Success: {score.success}
      </p>
      <p className="score-board__error" role="status">
        Error: {score.error}
      </p>
      {gameState === "finished" && (
        <div className="score-board__winner winner-banner" role="alert">
          Congratulations {playerName}! <div>You finish the game 🎉 </div>
        </div>
      )}
    </section>
  );
}

export default ScoreBoard;
