<script setup>
import ToDoList from "@/components/ToDoList.vue";
import ControlsContainer from "@/components/ControlsContainer.vue";
import { ref, computed } from "vue";
import {
  addTodoPost,
  loadData,
  loadExternalData,
  updateTodoContent,
} from "@/data/loaddata";

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