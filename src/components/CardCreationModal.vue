<script setup lang="ts">
  import Button from "@/components/ui/Button.vue";
  import EditableCard from "@/components/ui/EditableCard.vue";
  import Modal from "@/components/ui/Modal.vue";
  import { useDeckStore } from "@/stores/deck-store";
  import { useAppStore } from "@stores/app-store";
  import { reactive, ref } from "vue";

  const { appStore } = useAppStore();
  const { addCard } = useDeckStore();
  const username = ref(appStore.username);

  const initialCardState = {
    score: 1,
    description: "Descrição/Dica",
    title: "Titulo",
  };
  const card = reactive({ ...initialCardState });
  const resetCardState = () => {
    card.description = initialCardState.description;
    card.score = initialCardState.score;
    card.title = initialCardState.title;
  };
  const createCard = (closeModal: () => void) => {
    addCard({
      description: card.description,
      score: card.score,
      title: card.title,
    });
    closeModal();
  };
</script>
<template>
  <Modal
    class="p-8 flex flex-col gap-4 items-center"
    closable
    @close="resetCardState"
  >
    <template #default="{ closeModal }">
      <EditableCard
        :author="username"
        :is-editing-card="false"
        v-model:score="card.score"
        v-model:description="card.description"
        v-model:title="card.title"
      />
      <Button class="py-1" @click="createCard(closeModal)">Salvar</Button>
    </template>
    <template #trigger="{ openModal }">
      <Button
        class="text-gray-100 font-semibold py-1 text-sm rounded-lg"
        @click="openModal"
      >
        Criar Carta
      </Button>
    </template>
  </Modal>
</template>
