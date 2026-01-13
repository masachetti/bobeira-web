<script setup lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { InputHTMLAttributes } from "vue";

  interface MyInputProps extends /* @vue-ignore */ InputHTMLAttributes {
    class?: string;
  }
  const props = defineProps<MyInputProps>();
  const model = defineModel();
</script>
<template>
  <input
    :class="
      twMerge(
        'rounded border border-gray-500 px-2 py-0.5 focus:outline-none focus:ring-0 focus:border-teal-600',
        props.class
      )
    "
    v-model="model"
  />
</template>
