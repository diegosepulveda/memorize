import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerName, fetchCards } from "./redux/gameSlice";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  const [name, setName] = useState("");
  const { playerName } = useSelector((state) => state.game);

  const [gameStart, setGameStart] = useState(false);
  const dispatch = useDispatch();

  // Fetch cards on component mount
  useEffect(() => {
    dispatch(fetchCards());
    setName(playerName);
  }, [dispatch]);

  const handleStart = () => {
    dispatch(setPlayerName(name));
    setGameStart(true);
  };

  if (!gameStart) {
    return (
      <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">Welcome to Memory Game </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleStart}
          disabled={name.length === 0 ? true : false}
          className={`${
            name.length === 0 ? "bg-blue-200" : "bg-blue-500"
          } text-white p-2 rounded`}
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Memory Game 🧠</h1>
      <ScoreBoard />
      <GameBoard />
    </div>
  );
}

export default App;
