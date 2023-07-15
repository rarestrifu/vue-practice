<script setup>
import { loadExternalDataFromServer } from "./data/LoadDataServer.js";

async function loadData(id) {
  const data = await loadExternalDataFromServer(1);
  console.log(data);
}
</script>

<template>
  <div class="main-page-container">
    <h1>Users</h1>

    <button id="console" @click="loadData">load</button>
  </div>
</template>

<style>
.main-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
