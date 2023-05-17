import { useSelector } from "react-redux";
import "./ScoreBoard.css";

function ScoreBoard() {
  const { playerName, score, gameState } = useSelector((state) => state.game);
  return (
    <div className="score-board">
      <h2 className="score-board__player-name">{playerName}</h2>
      <p className="score-board__score">Success: {score.success}</p>
      <p className="score-board__error">Error: {score.error}</p>
      {gameState === "finished" && (
        <div className="score-board__winner">
          {" "}
          You finish, Congratulations!{" "}
        </div>
      )}
    </div>
  );
}

export default ScoreBoard;
