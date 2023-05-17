import { useSelector } from "react-redux";

function ScoreBoard() {
  const { playerName, score } = useSelector((state) => state.game);

  return (
    <div className="score-board">
      <h2 className="score-board__player-name">{playerName}</h2>
      <p className="score-board__score">Success: {score.success}</p>
      <p className="score-board__score">Error: {score.error}</p>
    </div>
  );
}

export default ScoreBoard;
