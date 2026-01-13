<script setup lang="ts">
  import Button from "@components/ui/Button.vue";
  import { useAppStore } from "@stores/app-store";

  const { goTo } = useAppStore();
</script>
<template>
  <div class="flex flex-col gap-3 justify-center w-fit h-full">
    <Button
      class="text-gray-100 font-bold cursor-pointer hover:bg-blue-500"
      @click="goTo('room-creation')"
    >
      Criar sala
    </Button>
    <Button
      class="text-gray-100 font-bold cursor-pointer hover:bg-blue-500"
      @click="goTo('join-room')"
    >
      Entrar numa sala
    </Button>
    <Button
      class="text-gray-100 font-bold cursor-pointer hover:bg-blue-500"
      @click="goTo('deck')"
    >
      Minhas cartas
    </Button>
  </div>
</template>
