import type { UserCard } from "@/types/card";
import { useLocalStorage } from "@vueuse/core";

const initialCards: Array<UserCard> = [
  {
    title: "Silvio Santos",
    description: "Dono do SBT",
    score: 1,
    id: crypto.randomUUID(),
  },
  {
    title: "Bob Esponja aaaa",
    description: "Calça Quadrada",
    score: 2,
    id: crypto.randomUUID(),
  },
  {
    title:
      "Duble de filme porno contracenando com a gretchen dasdasdasdasd dasdasdasds",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra, turpis et accumsan porttitor, nisi purus faucibus risus, ac tempor risus metus in augue.",
    score: 5,
    id: crypto.randomUUID(),
  },
];

const deckStorage = useLocalStorage<Array<UserCard>>("user-deck", initialCards);

export const useDeckStore = () => {
  const addCard = (card: Omit<UserCard, "id">) => {
    deckStorage.value.push({ ...card, id: crypto.randomUUID() });
  };
  const getCard = (cardId: string) => {
    return deckStorage.value.find(({ id }) => id === cardId);
  };
  const updateCard = (cardId: string, cardData: Omit<UserCard, "id">) => {
    const card = getCard(cardId);
    if (!card) return;
    card.description = cardData.description;
    card.title = cardData.title;
    card.score = cardData.score;
  };
  const deleteCard = (cardId: string) => {
    const cardIndex = deckStorage.value.findIndex(({ id }) => id === cardId);
    if (cardIndex < 0) return;
    deckStorage.value.splice(cardIndex, 1);
  };
  return { deckStore: deckStorage, addCard, getCard, updateCard, deleteCard };
};
