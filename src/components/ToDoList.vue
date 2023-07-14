<script setup>
import ToDoItem from './ToDoItem.vue';
defineProps({
    todos:Array
})

const emits = defineEmits(['update-todo', 'delete-todo']);

function updateToDo(newCompletedState, toDoId) {
    emits('update-todo', newCompletedState, toDoId);
}

function deleteToDo(todoId) {
    emits('delete-todo', todoId);
}

</script>

<template>
    <div class="todo-list-container">
        <ToDoItem
            v-for="(todo, index) in todos"
            :key="todo.id"
            :id="todo.id"
            :completed="todo.completed"
            :title="todo.title"
            @toggle-completed="updateToDo"
            @delete-button="deleteToDo"
        />
    </div>
</template>

<style scoped>
.todo-list-container {
    display: flex;
    flex-direction: column;
}
</style>