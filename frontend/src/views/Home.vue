<script setup lang="ts">
  import { onMounted } from "vue";
  import Button from "@components/ui/Button.vue";
  import { useAppStore } from "@stores/app-store";
  import { getPrivateData } from "@/services/api";

  const { goTo } = useAppStore();

  onMounted(async () => {
    try {
      const data = await getPrivateData();
      console.log("Backend protected endpoint response:", data);
    } catch (error) {
      console.error("Failed to fetch protected data:", error);
    }
  });
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
