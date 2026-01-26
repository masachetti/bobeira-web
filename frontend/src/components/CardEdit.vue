<script setup lang="ts">
  import Button from "@/components/ui/Button.vue";
  import EditableCard from "@/components/ui/EditableCard.vue";
  import { useDeckStore } from "@/stores/deck-store";
  import { useUserStore } from "@/stores/user-store";
  import type { CardResponse } from "@/services/api";
  import { reactive } from "vue";

  const { cardId } = defineProps<{ cardId: string }>();

  const { getCard, updateCard } = useDeckStore();
  const { username } = useUserStore();

  const cardData = getCard(cardId);

  const card = reactive<Omit<CardResponse, "createdAt" | "updatedAt">>(
    cardData
      ? { ...cardData }
      : {
          title: "",
          description: "",
          score: 0,
          author: username.value,
          id: "",
        }
  );

  const emit = defineEmits<{ (e: "save"): void }>();
  const saveCard = async () => {
    if (!cardId) return;
    await updateCard(cardId, {
      description: card.description,
      score: card.score,
      title: card.title,
    });
    emit("save");
  };
</script>
<template>
  <div class="flex flex-col items-center gap-4 mt-4">
    <EditableCard
      :author="card.author"
      :is-editing-card="true"
      v-model:score="card.score"
      v-model:description="card.description"
      v-model:title="card.title"
    />
    <Button class="py-1" @click="saveCard()">Salvar</Button>
  </div>
</template>
