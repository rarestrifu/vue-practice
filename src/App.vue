<script setup>
import CustomButton from './components/CustomButton.vue';

function handleClickFromCustom() {
  console.log("dd");
}
</script>

<template>
  <CustomButton
  label = "click"
  @click="handleClickFromCustom"/>
</template>

<style>
body {
  height: 100vh;
  width: 100vw;
}
</style>
