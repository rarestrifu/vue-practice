<script setup>
import { computed, reactive, ref } from 'vue';

const buttonLabel = ref("Click me");
const buttonId = "btn1";
const text = computed(() => isTextDisplayed.value ? "Text Displayed" : "Text not displayed");
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
        <span>{{ isTextDisplayed }}</span>
        <span>
            {{ text }}
        </span>
    </div>
</template>

<style scoped>
.container {
    height: 100px;
    display: flex;
    align-items: center;
    > * {
        margin-left: 10px;
    }
}
</style>