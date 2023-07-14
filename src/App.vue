<script setup>
import ToDoList from './components/ToDoList.vue';
import ControlsContainer from './components/ControlsContainer.vue';
import {ref, computed} from 'vue';

const todos = ref([
  {
    id: 1,
    title: "Buy eggs",
    completed: true
  },
  {
    id: 2,
    title: "Buy something",
    completed: false
  }
]);

const nrOfTodos = computed(() => todos.value.length)
const isDeleteAllButtonDisabled = computed(() => nrOfTodos.value === 0)
const showCompleted = ref(false);
const todosFiltered = computed(() => showCompleted.value ? todos.value.filter((todo) => todo.completed) : todos.value);
const newToDoList = ref([]);

function addToDo(newToDo){
  if(nrOfTodos.value===0){
    newToDo.id = 1;
    todos.value.push(newToDo);
  }
  else {
    const nextId = todos.value[nrOfTodos.value - 1].id;
    newToDo.id = nextId+1;
    todos.value.push(newToDo);
  }
}

function deleteAll() {
  while(todos.value.length>0){
    todos.value.pop();
  }
}

function toggleCompleted(shouldDisplayCompleted) {
  showCompleted.value = shouldDisplayCompleted;
}

function updateToDo(newCompletedState, todoId) {
  const updatedtTodo = todos.value.find(todo => todo.id === todoId);
  if(updatedtTodo){
  updatedtTodo.completed = newCompletedState;}
}

function deleteToDo(todoId) {
  todos.value = todos.value.filter(todo => todo.id !== todoId)
}

</script>

<template>
  <div class="todos-app-container">
    <h1>ToDoList</h1>
    <ControlsContainer
      :delete-all-button-disabled="isDeleteAllButtonDisabled"
      @addToDo="addToDo"
      @deleteAll="deleteAll"
      @show-completed="toggleCompleted"
    />
    <ToDoList 
      :todos="todosFiltered" 
      @update-todo="updateToDo"
      @delete-todo="deleteToDo"
    />
  </div>
</template>

<style>
body {
  height: 100vh;
  width: 100vw;
}

.todos-app-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
