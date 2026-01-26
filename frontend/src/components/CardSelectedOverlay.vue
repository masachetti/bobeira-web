<script setup lang="ts">
  import PencilIcon from "@assets/pencil.svg";
  import DeleteIcon from "@assets/delete.svg";
  import StatisticsIcon from "@assets/statistics.svg";
  import CloseIcon from "@assets/close.svg";
  import CardEdit from "@/components/CardEdit.vue";
  import Modal from "@/components/ui/Modal.vue";
  import Button from "@/components/ui/Button.vue";
  import { useDeckStore } from "@/stores/deck-store";

  const { cardId } = defineProps<{ cardId: string }>();
  const { deleteCard } = useDeckStore();

  const emit = defineEmits<{
    (e: "close"): void;
  }>();
</script>
<template>
  <div
    class="absolute w-full h-full top-0 left-0 bg-gray-800 opacity-70 rounded-lg grid place-items-center"
  ></div>
  <div class="absolute w-full h-full top-0 left-0 grid place-items-center">
    <div class="size-33 rounded-full absolute border-37 border-gray-400"></div>

    <Modal closable>
      <template #default="{ closeModal }">
        <CardEdit
          :card-id="cardId"
          @save="() => closeModal() || emit('close')"
        />
      </template>
      <template #trigger="{ openModal }">
        <div
          class="absolute size-32 rounded-full border-33 border-gray-50 cliped_circle1 cursor-pointer hover:border-gray-200 hover:border-34 hover:scale-103"
          @click="openModal"
        >
          <PencilIcon class="absolute size-5 -left-7 bottom-4" />
        </div>
      </template>
    </Modal>

    <div
      class="absolute size-32 rounded-full border-33 border-blue-500 cliped_circle2 cursor-pointer hover:border-blue-600 hover:border-34 hover:scale-103"
    >
      <StatisticsIcon class="absolute size-6 left-[70%] -bottom-5" />
    </div>
    <Modal closable>
      <template #default="{ closeModal }">
        <div class="flex flex-col items-center gap-2">
          <p>Deseja realmente deletar essa carta?</p>
          <Button
            class="bg-red-500 py-1.5 hover:bg-red-700 flex relative pl-9"
            @click="
              async () => {
                await deleteCard(cardId);
                closeModal();
                emit('close');
              }
            "
          >
            <DeleteIcon class="size-6 absolute left-2" />
            Deletar
          </Button>
        </div>
      </template>
      <template #trigger="{ openModal }">
        <div
          class="absolute size-32 rounded-full border-33 border-red-400 cliped_circle3 cursor-pointer hover:border-red-500 hover:border-34 hover:scale-103"
          @click="openModal"
        >
          <DeleteIcon class="absolute size-6 left-[60%] -top-6" />
        </div>
      </template>
    </Modal>
    <div
      class="bg-gray-600 size-14.5 rounded-full absolute grid place-items-center cursor-pointer hover:scale-105"
      @click="emit('close')"
    >
      <CloseIcon class="size-9 text-gray-300" />
    </div>
  </div>
</template>

<style scoped>
  .cliped_circle1 {
    clip-path: polygon(49% 50%, 5.5% 0%, 0% 0%, 0% 100%, 24% 100%);
  }
  .cliped_circle2 {
    clip-path: polygon(51% 51%, 26% 100%, 100% 100%, 100% 42.6667%);
  }
  .cliped_circle3 {
    clip-path: polygon(50% 49%, 100% 40.667%, 100% 0%, 8.33% 0%);
  }
</style>
