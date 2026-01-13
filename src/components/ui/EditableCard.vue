<script setup lang="ts">
  import { useAppStore } from "@/stores/app-store";
  import { ref, watch } from "vue";

  export type Props = {
    maxScore?: number;
    isEditingCard?: boolean;
  };

  const { appStore } = useAppStore();
  const username = ref(appStore.username);

  const { maxScore = 10, isEditingCard = true } = defineProps<Props>();

  const title = defineModel("title", { default: "" });
  const description = defineModel("description", { default: "" });
  const score = defineModel<number>("score");

  const _score = ref("");
  watch(
    _score,
    () => {
      const numericValue = parseInt(_score.value.replace(/[^0-9]/g, ""));
      if (numericValue < 0 || isNaN(numericValue)) {
        score.value = 0;
        _score.value = "0";
        return;
      }
      if (numericValue > maxScore) {
        score.value = maxScore;
        _score.value = "" + maxScore;
        return;
      }
      score.value = numericValue;
      if ("" + numericValue !== _score.value) {
        _score.value = "" + numericValue;
      }
    },
    { immediate: true }
  );
</script>
<template>
  <div
    class="flex flex-col items-center w-52 h-72 bg-white rounded-xl border border-gray-300 drop-shadow-gray-600 drop-shadow-md text-center"
  >
    <textarea
      class="w-full text-center resize-none bg-red-500 text-white py-2 min-h-16 rounded-t-xl font-semibold grid items-center h-fit focus:outline-none focus:ring-0"
      v-model="title"
      @focus.once="() => (isEditingCard ? null : (title = ''))"
    />

    <textarea
      class="flex-1 resize-none grid items-center text-center overflow-hidden focus:outline-none focus:ring-0"
      v-model="description"
      @focus.once="() => (isEditingCard ? null : (description = ''))"
    />
    <p
      class="w-full text-center text-sm bg-red-800 text-white py-px font-semibold"
    >
      Autor: {{ username }}
    </p>
    <input
      class="w-full resize-none text-center bg-red-500 text-white py-1.5 rounded-b-xl font-semibold focus:outline-none focus:ring-0"
      v-model="_score"
    />
  </div>
</template>
