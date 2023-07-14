<script setup>
import {ref, watch} from 'vue';
const props = defineProps({
    id: Number,
    title: String,
    completed: Boolean
})

const isCompleted = ref(props.completed);

const emits = defineEmits(['toggle-completed', 'delete-button', 'update-todo-content']);

watch(isCompleted, (newValue) => {
    emits('toggle-completed', newValue, props.id);
});

function deleteToDo() {
    emits('delete-button', props.id);
}

function updateTodoContent() {
    emits('update-todo-content', props.id)
}

</script>

<template>
    <div 
    class="todo-container" 
    :class="{completed: isCompleted}">
        <label 
            :for="`completed-checkbox-${id}`"
            class="title">
            <input 
                type="checkbox"
                :id="`completed-checkbox-${id}`"
                v-model="isCompleted"
            />
            {{ title }}
        </label>
        <button
            class="update-todo-button"
            @click="updateTodoContent"
        > Update </button>
        <button
            class="delete-todo-button"
            @click="deleteToDo"
        >Delete To Do</button>
    </div>
</template>

<style scoped>
.todo-container {
    padding: 10px;
    margin: 5px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    background-color: darkblue;
    &.completed {
        background-color: aquamarine;
    }

}
.title {
    user-select: none;
}

.delete-todo-button{
    background-color: red;
    margin-left: 2px;
}

.update-todo-button{
    background-color: green;
    margin-left: auto;
}
</style>