import { duplicateAndShuffleCards } from "../utils/utils";

describe("duplicateAndShuffleCards", () => {
  it("should return an array with twice the length of the input array", () => {
    const cards = [
      { uuid: "1", otherProps: "..." },
      { uuid: "2", otherProps: "..." },
    ];
    const result = duplicateAndShuffleCards(cards);
    expect(result).toHaveLength(cards.length * 2);
  });

  it("should duplicate each card with a _2 appended to the uuid and shuffle the cards", () => {
    const cards = [
      { uuid: "1", otherProps: "..." },
      { uuid: "2", otherProps: "..." },
      { uuid: "3", otherProps: "..." },
      { uuid: "4", otherProps: "..." },
      { uuid: "5", otherProps: "..." },
    ];
    const result = duplicateAndShuffleCards(cards);
    expect(result).not.toEqual(cards);
  });

  it("should provide new cards with IDs concatenated with _2", () => {
    const cards = [
      { uuid: "1", otherProps: "..." },
      { uuid: "2", otherProps: "..." },
      { uuid: "3", otherProps: "..." },
      { uuid: "4", otherProps: "..." },
      { uuid: "5", otherProps: "..." },
    ];
    const result = duplicateAndShuffleCards(cards);
    const duplicatedCards = result.filter((card) => card.uuid.includes("_2"));

    for (const card of duplicatedCards) {
      const originalCard = cards.find(
        (c) => c.uuid === card.uuid.replace("_2", "")
      );
      expect(card).toEqual({ ...originalCard, uuid: originalCard.uuid + "_2" });
    }
  });
});
