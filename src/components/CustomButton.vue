<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';

const  props = defineProps({
    label: String,
    id: Number
});

const emits = defineEmits(['orice']);


const buttonLabel = ref("Click me");
const buttonId = "btn1";
const text = computed(() => isTextDisplayed.value ? "Text Displayed" : "Text not displayed");
const isTextDisplayed = ref(true);
const isButtonDisabled = false;
const fontSize = computed(() => isTextDisplayed.value ? 8 : 16);

const reactiveObj = reactive({
    title: 'reactive object'
});

function clickHandler() {
    isTextDisplayed.value = !isTextDisplayed.value;
    emits('click');
}


onBeforeMount(() => {
    console.log("on before mounted");
})


onMounted(() => {
    console.log("mounted");
}) 

</script>

<template>
    <div 
    class="container" 
    :class="{'displayed': isTextDisplayed}"
    >
        <button :id="`buttonId-${buttonId}`" :disabled="isButtonDisabled" v-on:click="clickHandler">
            {{ buttonLabel }}
        </button>
        <span :style="{fontSize: fontSize + 'px'}">{{ isTextDisplayed }}</span>
        <span>
            {{ label }}
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

.container.displayed {
    border-width: 10px;
    border-style: dashed;
}
</style>