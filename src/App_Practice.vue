<script setup>
import ToDoList from "./components/ToDoList.vue";
import ControlsContainer from "./components/ControlsContainer.vue";
import { ref, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import {
  addTodoPost,
  loadData,
  loadExternalData,
  updateTodoContent,
} from "./data/loaddata";

const todos = ref(loadData());

const nrOfTodos = computed(() => todos.value.length);
const isDeleteAllButtonDisabled = computed(() => nrOfTodos.value === 0);
const showCompleted = ref(false);
const todosFiltered = computed(() =>
  showCompleted.value
    ? todos.value.filter((todo) => todo.completed)
    : todos.value
);

async function addRandomToDo(newToDo) {
  const addedTodo = await addTodoPost();
  todos.value.push({
    id: addedTodo.userId,
    title: addedTodo.todo,
    completed: addedTodo.completed,
  });
}

function addToDo(newToDo) {
  if (nrOfTodos.value === 0) {
    newToDo.id = 1;
    todos.value.push(newToDo);
  } else {
    const nextId = todos.value[nrOfTodos.value - 1].id;
    newToDo.id = nextId + 1;
    todos.value.push(newToDo);
  }
}

function deleteAll() {
  while (todos.value.length > 0) {
    todos.value.pop();
  }
}

function toggleCompleted(shouldDisplayCompleted) {
  showCompleted.value = shouldDisplayCompleted;
}

function updateToDo(newCompletedState, todoId) {
  const updatedtTodo = todos.value.find((todo) => todo.id === todoId);
  if (updatedtTodo) {
    updatedtTodo.completed = newCompletedState;
  }
}

function deleteToDo(todoId) {
  todos.value = todos.value.filter((todo) => todo.id !== todoId);
}

async function onLoadExternalData() {
  // todos.value = [];
  // const newTodos = await loadExternalData();
  // if(newTodos.length>0){
  //   todos.value = [...newTodos];
  // }

  const newTodos = await loadExternalData();
  newTodos.forEach((element) => {
    todos.value.push(element);
  });
}

async function updateTodoContentMain(todoId) {
  updateTodoContent().then(function (updatedTodo) {
    const index = todos.value.findIndex((todo) => todo.id === todoId);
    todos.value[index] = {
      id: todoId,
      completed: updatedTodo.completed,
      title: updatedTodo.title,
    };
  });
}
</script>

<template>
  <Suspense>
    <div style="display: flex; align-items: center; justify-content: center;">
      <header>
        <div class="wrapper">
          <nav class="nav-bar">
            <RouterLink class="link" to="/">Todo List</RouterLink>
            <RouterLink class="link" to="/my-todos">My Todos</RouterLink>
          </nav>
        </div>
      </header>
    </div>
  </Suspense>
  <div class="todos-app-container">
    <h1>ToDoList</h1>
    <ControlsContainer
      :delete-all-button-disabled="isDeleteAllButtonDisabled"
      @addRandomToDo="addRandomToDo"
      @addToDo="addToDo"
      @deleteAll="deleteAll"
      @show-completed="toggleCompleted"
      @load-external-data="onLoadExternalData"
    />
    <ToDoList
      :todos="todosFiltered"
      @update-todo="updateToDo"
      @delete-todo="deleteToDo"
      @update-todo-button="updateTodoContentMain"
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
