<script setup>
import CustomButton from './CustomButton.vue';
import {ref, computed, onMounted, watch} from 'vue';

const props = defineProps({
    deleteAllButtonDisabled:Boolean
})

const emits = defineEmits(['addRandomToDo', 'showCompleted', 'deleteAll', 'addToDo']);
const inputRef = ref("");
const toDoText = ref("");
const showCompleted = ref(false);

const isAddButtonDisabled = computed(() => toDoText.value === "")

function addToDo() {
    const newToDo = {
        title: toDoText.value,
        completed: false
    }
    emits('addToDo', newToDo);
}

function addRandomToDo() {
    const newToDo = {
        title: toDoText.value,
        completed: false
    }

    emits('addRandomToDo', newToDo);
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
            id="add-random-todo-button"
            label="Add"
            class="add-button"
            @click="addToDo"
            :disabled="isAddButtonDisabled"
            
        />
        <CustomButton 
            id="add-to-do"
            label="Add Random"
            class="add-random-button"
            @click="addRandomToDo"
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

.input {
    border-radius: 5px;
}

.add-button {
    background-color: brown;
    border-radius: 5px;
}

.add-random-button {
    background-color: blue;
    border-radius: 5px;
    color: aliceblue;
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
   
