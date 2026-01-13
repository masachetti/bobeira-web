<script setup lang="ts">
  import Button from "@/components/ui/Button.vue";
  import Input from "@/components/ui/Input.vue";
  import { DataConnection, Peer } from "peerjs";
  import { ref } from "vue";

  const passKey = ref("");
  const peerBase = ref();
  const peerConnections = ref<Array<DataConnection>>([]);
  const createRoom = () => {
    const peer = new Peer(passKey.value);
    peerBase.value = peer;

    peer.on("connection", (conn) => {
      peerConnections.value.push(conn);
      conn.on("data", (data) => {
        console.log("Received data", data);
      });
      conn.on("open", () => {
        conn.send("Hello from host!");
      });
    });
  };
</script>
<template>
  <div class="text-gray-100">
    <h1>Criar uma sala</h1>
    <p>Digite um palavra-chave para a sala</p>
    <Input v-model="passKey"></Input>
    <Button @click="createRoom">Criar sala</Button>
  </div>
</template>
