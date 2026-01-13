<script setup lang="ts">
  import type { CardWithoutId } from "@/types/card";

  const props = defineProps<CardWithoutId>();
</script>
<template>
  <div
    class="flex flex-col items-center w-52 h-72 bg-white rounded-xl border border-gray-300 drop-shadow-gray-600 drop-shadow-md"
  >
    <p
      class="w-full text-center bg-red-500 text-white py-2 min-h-16 rounded-t-xl font-semibold grid items-center h-fit"
    >
      {{ title }}
    </p>

    <p class="flex-1 grid items-center text-center overflow-hidden">
      {{ description }}
    </p>
    <p
      class="w-full text-center text-sm bg-red-800 text-white py-px font-semibold"
    >
      Autor: {{ author }}
    </p>
    <p
      class="w-full text-center bg-red-500 text-white py-1.5 rounded-b-xl font-semibold"
    >
      Pontos: {{ score }}
    </p>
  </div>
</template>
