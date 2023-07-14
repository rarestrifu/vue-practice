async function loadExternalData() {
    const response = await fetch('https://dummyjson.com/todos?limit=5');
    const json = await response.json();
    const todos = json.todos;
    const data = [];
    todos.forEach(element => {
        const item = createNewToDoItem(element.todo, element.completed);
        data.push(item);
    });
    return data;
};

function loadData() {
    const data = [];
    data.push(createNewToDoItem("Buy eggs"));
    data.push(createNewToDoItem("Do the dishes", true));
    return data;
};

function createNewToDoItem(itemText, itemCompleted) {
    return {
        id: _generateNextId(),
        title: itemText,
        completed: itemCompleted
    }
};

function _generateNextId() {
    window.nextId = window.nextId ? window.nextId + 1 : 1;
    return window.nextId;
}

async function addTodoPost() {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    let randomBool = () => {
        const nr = Math.floor(Math.random()*2);
        return nr === 0;
    }
    const response =  await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            todo: randomString,
            completed: randomBool(),
            userId: Math.floor(Math.random()*100)
        })
    });
    const todo = await response.json();
    return todo;
}

async function updateTodoContent() {
    const response = await fetch('https://dummyjson.com/todos?limit=5');
    const json = await response.json();
    const todos = json.todos;
    return todos;
}

export { loadData, createNewToDoItem, loadExternalData, addTodoPost, updateTodoContent }