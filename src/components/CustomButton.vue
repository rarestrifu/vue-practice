<script setup>
import { reactive, ref } from 'vue';

const buttonLabel = ref("Click me");
const buttonId = "btn1";
const text = ref("this is a text");
const isTextDisplayed = ref(true);
const isButtonDisabled = false;

const reactiveObj = reactive({
    title: 'reactive object'
});

function clickHandler() {
    isTextDisplayed.value = !isTextDisplayed.value;
}

</script>

<template>
    <div class="container">
        <button :id="`buttonId-${buttonId}`" :disabled="isButtonDisabled" v-on:click="clickHandler">
            {{ buttonLabel }}
        </button>
        <span v-if="isTextDisplayed">
            Text Displayed
        </span>
        <span v-else>
            Text not displayed
        </span>
    </div>
</template>

<style scoped></style>