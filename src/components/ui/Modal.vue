<script setup lang="ts">
  import { onClickOutside, onKeyUp } from "@vueuse/core";
  import { useTemplateRef, watch } from "vue";
  import CloseIcon from "@assets/close.svg";
  import { twMerge } from "tailwind-merge";

  const props = defineProps<{
    closable?: boolean;
    class?: string;
  }>();

  const emit = defineEmits<{ (e: "close"): void }>();

  const model = defineModel({ default: false });
  watch(model, () => {
    if (!model.value) {
      emit("close");
    }
  });
  const openModal = () => {
    model.value = true;
  };
  const closeModal = () => (model.value = false);
  const target = useTemplateRef("target");
  if (props.closable) {
    onClickOutside(target, closeModal);
  }

  onKeyUp("Escape", closeModal);
</script>
<template>
  <div v-if="$slots.trigger" class="contents">
    <slot name="trigger" :openModal="openModal"></slot>
  </div>
  <Teleport to="#app">
    <div
      :class="
        twMerge(
          'bg-gray-100 w-fit h-fit px-5 pt-8 pb-5 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10',
          props.class
        )
      "
      v-if="model"
      ref="target"
    >
      <div>
        <CloseIcon
          v-if="closable"
          class="absolute top-1 right-1 size-8 text-gray-600 cursor-pointer"
          @click="closeModal"
        />
      </div>
      <slot :closeModal="closeModal"></slot>
    </div>
    <div
      class="bg-gray-500 opacity-60 w-screen h-screen absolute top-0 left-0"
      v-if="model"
    />
  </Teleport>
</template>
