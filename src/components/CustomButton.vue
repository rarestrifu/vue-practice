<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';

const  props = defineProps({
    id: String,
    label: String,
    disabled: Boolean
});

defineEmits(['click'], ['deleteAll']);
</script>

<template>
    <button
        :id="id"
        :disabled="disabled"
        @click="$emit('click'), $emit('deleteAll')"
    >
    {{ label }}
    </button>
    
</template>

<style scoped>
.container {
    height: 10px;
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