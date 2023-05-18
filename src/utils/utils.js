export function duplicateAndShuffleCards(cards) {
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
