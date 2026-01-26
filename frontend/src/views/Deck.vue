<script setup lang="ts">
  import CardCreationModal from "@/components/CardCreationModal.vue";
  import CardSelectedOverlay from "@/components/CardSelectedOverlay.vue";
  import Button from "@/components/ui/Button.vue";
  import { useAppStore } from "@/stores/app-store";
  import { useDeckStore } from "@/stores/deck-store";
  import Card from "@components/ui/Card.vue";
  import { onLongPress } from "@vueuse/core";
  import { onMounted, ref, useTemplateRef } from "vue";
  import ArrowLeftIcon from "@assets/arrow-left.svg";

  const { goTo } = useAppStore();
  const { cards, loading, fetchCards, deleteCards } = useDeckStore();

  onMounted(() => {
    fetchCards();
  });

  const htmlRefHook = useTemplateRef("htmlRefHook");
  const onLongPressCallbackHook = () => {
    isMultSelectionEnabled.value = true;
  };
  const isMultSelectionEnabled = ref(false);
  const multSelectionSelectedCards = ref<Array<string>>([]);
  const deleteCardFromMultSelection = async () => {
    await deleteCards(multSelectionSelectedCards.value);
    isMultSelectionEnabled.value = false;
    multSelectionSelectedCards.value.splice(
      0,
      multSelectionSelectedCards.value.length
    );
  };

  //@ts-ignore
  onLongPress(htmlRefHook, onLongPressCallbackHook, {
    modifiers: {
      prevent: true,
    },
  });

  const handleCardClick = (cardId: string) => {
    if (isMultSelectionEnabled.value) {
      if (multSelectionSelectedCards.value.includes(cardId)) {
        multSelectionSelectedCards.value.splice(
          multSelectionSelectedCards.value.indexOf(cardId),
          1
        );
      } else {
        multSelectionSelectedCards.value.push(cardId);
      }
      return;
    }
    toggleSelection(cardId);
  };

  const selectedCard = ref<string | undefined>(undefined);
  const toggleSelection = (i: string) => {
    if (selectedCard.value === i) {
      selectedCard.value = undefined;
      return;
    }
    selectedCard.value = i;
  };
  const closeCardSelected = () => (selectedCard.value = undefined);
</script>
<template>
  <div class="flex flex-col gap-4 items-center py-8 h-screen relative">
    <Button
      class="flex items-center gap-2 py-1 bg-gray-500 hover:bg-gray-700 absolute top-4 left-0"
      @click="goTo('home')"
    >
      <ArrowLeftIcon class="size-6 -ml-4"></ArrowLeftIcon>
      Voltar
    </Button>
    <CardCreationModal />
    <div class="flex gap-4" v-if="isMultSelectionEnabled">
      <Button
        class="py-1 bg-gray-500 hover:bg-gray-700"
        @click="() => (isMultSelectionEnabled = false)"
      >
        Sair da seleção
      </Button>
      <Button
        class="py-1 bg-red-500 hover:bg-red-700 disabled:bg-red-300"
        :disabled="multSelectionSelectedCards.length === 0"
        @click="deleteCardFromMultSelection"
      >
        Deletar cartas ({{ multSelectionSelectedCards.length }})
      </Button>
    </div>
    <div
      v-if="loading"
      class="flex items-center justify-center h-full"
    >
      <span class="text-gray-500">Carregando cartas...</span>
    </div>
    <div
      v-else
      class="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-x-8 gap-y-6 overflow-y-scroll h-full px-6 py-2"
    >
      <div class="relative h-fit" v-for="card in cards" :key="card.id">
        <Card
          ref="htmlRefHook"
          class="cursor-pointer"
          :title="card.title"
          :description="card.description"
          :author="card.author"
          :score="card.score"
          @click="handleCardClick(card.id)"
        />
        <div
          v-if="isMultSelectionEnabled"
          class="absolute size-6 bg-white border border-red-500 rounded-full -top-1.5 -right-1.5 grid place-items-center"
        >
          <div
            v-if="multSelectionSelectedCards.includes(card.id)"
            class="size-4 bg-green-600 rounded-full top-1/2 left-1/2"
          />
        </div>
        <CardSelectedOverlay
          v-if="selectedCard === card.id"
          :card-id="selectedCard"
          @close="closeCardSelected"
        />
      </div>
    </div>
  </div>
</template>
