// alert("hey")

const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        createTodoItem(todoText);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem); 
    })
}
function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
            <label class="custom-checkbox" for="${todoId}">
                <img src="icons/check.svg" alt="Check">
            </label>   

            <label for="${todoId}" class="todo-text">
                ${todoText}
            </label>
            <button class="delete-button">
                <img src="icons/delete.svg" alt="Delete">
            </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !==todoIndex);
    saveTodos();
    updateTodoList();
}



function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos" , todoJson);
}

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}