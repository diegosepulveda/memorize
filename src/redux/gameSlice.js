import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk("game/fetchCards", async () => {
  const response = await fetch(
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
  );
  const data = await response.json();
  return data.entries.slice(-4);
});

function findDuplicateCard(cards) {
  const sortedList = cards.map((card) => card.title).sort();
  for (let i = 0; i < sortedList.length - 1; i++) {
    if (sortedList[i] === sortedList[i + 1]) {
      return cards.find((card) => card.title === sortedList[i]);
    }
  }
  return null;
}

function duplicateAndShuffleCards(cards) {
  const duplicatedCards = cards.flatMap((card) => [
    card,
    { ...card, uuid: card.uuid + "_2" },
  ]);

  // Shuffle
  // for (let i = duplicatedCards.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [duplicatedCards[i], duplicatedCards[j]] = [
  //     duplicatedCards[j],
  //     duplicatedCards[i],
  //   ];
  // }

  return duplicatedCards;
}

const gameSlice = createSlice({
  name: "game",
  initialState: {
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
      const cardId = action.payload;
      const card = state.cards.find((card) => card.uuid === cardId);
      if (card && card.isMatched === false) {
        card.isFlipped = !card.isFlipped;
        state.flippedCards.push(card);
      }
    },
    checkMatch: (state) => {
      if (state.flippedCards.length >= 2) {
        const repeatedCard = findDuplicateCard(state.flippedCards);
        if (repeatedCard) {
          state.score.success += 1;
          state.cards.forEach((card) => {
            if (card.url === repeatedCard.url) {
              card.isMatched = true;
              state.matchCards.push(card);
            }
          });
          state.flippedCards = state.flippedCards.filter(
            (card) => card.url !== repeatedCard.url
          );
        } else if (state.flippedCards.length > 2) {
          state.score.error += 1;
          const [card1, card2] = state.flippedCards;
          state.cards.forEach((card) => {
            if (card.uuid === card1.uuid || card.uuid === card2.uuid) {
              card.isFlipped = false;
              state.flippedCards.shift();
            }
          });
        }
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
