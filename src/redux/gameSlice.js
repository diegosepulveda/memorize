import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { duplicateAndShuffleCards } from "../utils/utils";

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
    loading: false,
    playerName: localStorage.getItem("playerName") || "",
    score: {
      success: 0,
      error: 0,
    },
    cards: [],
    flippedCards: [],
    matchCards: [],
    gameState: "playing", // playing, finished
  },
  reducers: {
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
      localStorage.setItem("playerName", action.payload);
    },
    flipCard: (state, action) => {
      state.loading = true;
      const cardId = action.payload;
      const card = state.cards.find((card) => card.uuid === cardId);
      if (card && card.isMatched === false) {
        card.isFlipped = !card.isFlipped;
        if (card.isFlipped) {
          state.flippedCards.push(card);
        } else {
          state.flippedCards = state.flippedCards.filter(
            (c) => c.uuid !== cardId
          );
        }
      }
    },
    checkMatch: (state) => {
      state.loading = false;
      if (state.flippedCards.length === 2) {
        const [c1, c2] = state.flippedCards;
        const card1 = state.cards.find((card) => card.uuid === c1.uuid);
        const card2 = state.cards.find((card) => card.uuid === c2.uuid);
        if (card1.url === card2.url) {
          card1.isMatched = card2.isMatched = true;
          state.matchCards.push(card1, card2);
          state.score.success += 1;
        } else {
          card1.isFlipped = card2.isFlipped = false;
          state.score.error -= 1;
        }
        state.flippedCards = [];
      }
    },
    checkGameState: (state) => {
      if (state.cards.length === state.matchCards.length) {
        state.gameState = "finished";
      }
    },
  },
  extraReducers: {
    [fetchCards.fulfilled]: (state, action) => {
      const cards = duplicateAndShuffleCards(
        action.payload.map((card) => ({
          ...card.fields.image,
          isFlipped: false,
          isMatched: false,
        }))
      );
      state.cards = cards;
    },
  },
});

export const { setPlayerName, flipCard, checkMatch, checkGameState } =
  gameSlice.actions;

export default gameSlice.reducer;
