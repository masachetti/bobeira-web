import { cardApi, type CardDto, type CardResponse } from "@/services/api";
import { reactive, readonly, toRefs } from "vue";

interface DeckState {
  cards: CardResponse[];
  loading: boolean;
  error: string | null;
}

const state = reactive<DeckState>({
  cards: [],
  loading: false,
  error: null,
});

export const useDeckStore = () => {
  const fetchCards = async () => {
    state.loading = true;
    state.error = null;
    try {
      const response = await cardApi.getAll();
      state.cards = response.data;
    } catch (err) {
      state.error = "Failed to fetch cards";
      console.error(err);
    } finally {
      state.loading = false;
    }
  };

  const addCard = async (card: CardDto) => {
    state.error = null;
    try {
      const response = await cardApi.create(card);
      state.cards.push(response.data);
      return response.data;
    } catch (err) {
      state.error = "Failed to create card";
      console.error(err);
      throw err;
    }
  };

  const getCard = (cardId: string) => {
    return state.cards.find(({ id }) => id === cardId);
  };

  const updateCard = async (cardId: string, cardData: CardDto) => {
    state.error = null;
    try {
      const response = await cardApi.update(cardId, cardData);
      const index = state.cards.findIndex(({ id }) => id === cardId);
      if (index !== -1) {
        state.cards[index] = response.data;
      }
      return response.data;
    } catch (err) {
      state.error = "Failed to update card";
      console.error(err);
      throw err;
    }
  };

  const deleteCard = async (cardId: string) => {
    state.error = null;
    try {
      await cardApi.delete(cardId);
      const index = state.cards.findIndex(({ id }) => id === cardId);
      if (index !== -1) {
        state.cards.splice(index, 1);
      }
    } catch (err) {
      state.error = "Failed to delete card";
      console.error(err);
      throw err;
    }
  };

  const deleteCards = async (cardIds: string[]) => {
    state.error = null;
    try {
      await Promise.all(cardIds.map((id) => cardApi.delete(id)));
      state.cards = state.cards.filter(({ id }) => !cardIds.includes(id));
    } catch (err) {
      state.error = "Failed to delete cards";
      console.error(err);
      throw err;
    }
  };

  return {
    ...toRefs(readonly(state)),
    fetchCards,
    addCard,
    getCard,
    updateCard,
    deleteCard,
    deleteCards,
  };
};
