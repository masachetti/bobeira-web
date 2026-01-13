<script setup lang="ts">
  import UsernameModal from "@/components/UsernameModal.vue";
  import JoinRoom from "@/views/JoinRoom.vue";
  import RoomCreation from "@/views/RoomCreation.vue";
  import { useAppStore } from "@stores/app-store";
  import Deck from "@views/Deck.vue";
  import Home from "@views/Home.vue";

  const { appStore } = useAppStore();
</script>

<template>
  <div class="bg-purple-950 h-screen w-screen grid justify-items-center">
    <Home v-if="appStore.currentPage === 'home'" />
    <Deck v-else-if="appStore.currentPage === 'deck'" />
    <RoomCreation v-else-if="appStore.currentPage === 'room-creation'" />
    <JoinRoom v-else-if="appStore.currentPage === 'join-room'" />
    <UsernameModal />
  </div>
</template>
