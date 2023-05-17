import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk("game/fetchCards", async () => {
  const response = await fetch(
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
  );
  const data = await response.json();
  return data.entries;
});

const gameSlice = createSlice({
  name: "game",
  initialState: {
    playerName: localStorage.getItem("playerName") || "",
    score: 0,
    cards: [],
    flippedCards: [],
    gameState: "idle", // idle, playing, finished
  },
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
      localStorage.setItem("playerName", action.payload);
    },
    flipCard: (state, action) => {
      const cardId = action.payload;
      const card = state.cards.find((card) => card.uuid === cardId);
      if (card) {
        card.isFlipped = !card.isFlipped;
        state.flippedCards.push(card);
      }
    },
  },
  extraReducers: {
    [fetchCards.fulfilled]: (state, action) => {
      state.cards = action.payload.map((card) => ({
        ...card.fields.image,
        isFlipped: false,
        isMatched: false,
      }));
    },
  },
});

export const { setPlayerName, flipCard, checkMatch, checkGameState } =
  gameSlice.actions;

export default gameSlice.reducer;
