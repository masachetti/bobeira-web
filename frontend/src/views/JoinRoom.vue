<script setup lang="ts">
  import Button from "@/components/ui/Button.vue";
  import Input from "@/components/ui/Input.vue";
  import { Peer } from "peerjs";
  import { ref } from "vue";

  const passKey = ref("");
  const peerBase = ref();
  const connection = ref();
  const joinRoom = () => {
    const peer = new Peer("dasdad");
    peerBase.value = peer;

    const conn = peer.connect(passKey.value);
    connection.value = conn;
    conn.on("open", () => {
      conn.send("Hi from room member");
    });
    conn.on("data", (data) => {
      console.log("Received data", data);
    });
  };
</script>
<template>
  <div class="text-gray-100">
    <h1>Entrar numa sala</h1>
    <p>Digite a palavra-chave da sala</p>
    <Input v-model="passKey"></Input>
    <Button @click="joinRoom">Entrar na sala</Button>
  </div>
</template>
