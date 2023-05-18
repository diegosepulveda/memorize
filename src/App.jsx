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
      <div className="App min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center text-white px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl mb-4 font-extrabold md:w-[350px]">
          Welcome to Memory Game{" "}
        </h1>
        <h5 className="mb-4 text-left w-full md:w-[350px] ">
          👋 Hi there, whats your name?
        </h5>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="mb-4 p-2 border border-gray-300 rounded bg-white text-black w-full md:w-[350px]"
        />
        <button
          onClick={handleStart}
          disabled={name.length === 0 ? true : false}
          className={`${
            name.length === 0 ? "bg-blue-200" : "bg-blue-500"
          } text-white p-2 rounded w-full md:w-[350px]`}
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="App min-h-screen  flex flex-col items-center justify-center ">
      <h1 className="text-3xl mb-4">Memory Game 🧠</h1>
      <ScoreBoard />
      <GameBoard />
    </div>
  );
}

export default App;
