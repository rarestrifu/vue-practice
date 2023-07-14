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