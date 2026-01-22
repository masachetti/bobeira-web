<script setup lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { ButtonHTMLAttributes } from "vue";

  interface MyButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
    class?: string;
  }

  const props = defineProps<MyButtonProps>();
</script>
<template>
  <button
    :class="
      twMerge(
        'px-6 py-1 bg-blue-600 hover:bg-blue-500 rounded-xl text-gray-100 cursor-pointer disabled:bg-blue-300 disabled:cursor-auto font-semibold',
        props.class
      )
    "
  >
    <slot></slot>
  </button>
</template>
