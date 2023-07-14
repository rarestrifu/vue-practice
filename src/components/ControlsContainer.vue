<script setup>
import CustomButton from './CustomButton.vue';
import {ref, computed, onMounted, watch} from 'vue';

const props = defineProps({
    deleteAllButtonDisabled:Boolean
})

const emits = defineEmits(['addToDo', 'showCompleted', 'deleteAll']);
const inputRef = ref("");
const toDoText = ref("");
const showCompleted = ref(false);
const isAddButtonDisabled = computed(() => toDoText.value ? false : true)

function addToDo() {
    const newToDo = {
        title: toDoText.value,
        completed: false
    }

    emits('addToDo', newToDo);
}

function deleteAll() {
    emits('deleteAll');
}


watch(showCompleted, (newValue) => {
    if(newValue) {
        emits('showCompleted', true);
    } else {
        emits('showCompleted', false);
    }
})

onMounted(() => {
    inputRef.value.focus();
})

</script>

<template>
    <div class="controls-container">
        <input 
            ref="inputRef"
            v-model="toDoText"
            class="input"
            @keydown.enter="addToDo"
        />
        <CustomButton
            id="add-todo-button"
            label="Add"
            class="add-button"
            @click="addToDo"
            
        />
        <CustomButton
            id="delete-all-todos-button"
            label="Delete All"
            class="delete-all-button"
            :disabled="deleteAllButtonDisabled"
            @click="deleteAll"
        />
        <label for="show-completed-checkbox">
            <input 
                v-model="showCompleted"
                id="show-completed-checkbox"
                type="checkbox"
            />  
            Show Completed
        </label>
        <CustomButton 
            id="load external data"
            label="Load external data"
            class="load-external-data"
            @click="$emit('load-external-data')"
        />
    </div>
</template>

<style scoped>

.controls-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.add-button {
    background-color: brown;
    border-radius: 5px;
}

.delete-all-button {
    background-color: darkkhaki;
    border-radius: 5px;
}

.load-external-data{
    background-color: greenyellow;
    border-radius: 5px;
}
  
</style>
   
