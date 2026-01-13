<script setup lang="ts">
  import Button from "@/components/ui/Button.vue";
  import Input from "@/components/ui/Input.vue";
  import Modal from "@/components/ui/Modal.vue";
  import { useUserStore } from "@/stores/user-store";

  const { username, isEditingUsername, setUsername } = useUserStore();
</script>
<template>
  <Modal v-model="isEditingUsername" :closable="!!username">
    <form class="w-full flex flex-col items-center h-full justify-center gap-2">
      <p>Entre com um username:</p>
      <Input placeholder="Lula Molusco" v-model="username" />
      <Button
        class="text-gray-100 font-semibold py-1 mt-1 text-sm rounded-lg"
        :disabled="username.length <= 4"
        @click="() => setUsername(username)"
      >
        Confirmar
      </Button>
    </form>
  </Modal>
</template>
