## **📜 JavaScript Code Functionality Breakdown**  

### **1️⃣ Selecting DOM Elements**  
```js
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
```
🔹 **What it does?**  
- Retrieves references to the **form**, **input field**, and **unordered list (UL)** where tasks will be displayed.  

🔹 **Why it's used?**  
- Needed to handle user input and dynamically update the to-do list.

---

### **2️⃣ Initializing the To-Do List**
```js
let allTodos = getTodos();
updateTodoList();
```
🔹 **What it does?**  
- Fetches saved to-dos from `localStorage` using `getTodos()`.  
- Calls `updateTodoList()` to render the saved tasks when the page loads.

🔹 **Why it's used?**  
- Ensures the to-do list persists across page reloads.

---

### **3️⃣ Handling Form Submission**
```js
todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})
```
🔹 **What it does?**  
- Prevents the default form submission behavior.  
- Calls `addTodo()` to add a new task.

🔹 **Why it's used?**  
- Prevents page refresh on form submission and allows JavaScript to handle task addition dynamically.

---

### **4️⃣ Adding a New To-Do**
```js
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
```
🔹 **What it does?**  
- Gets the **user input** and removes unnecessary spaces (`trim()`).
- Creates a new **to-do object** with text and completion status.
- Adds the task to `allTodos`, updates the UI, and saves it.

🔹 **Why it's used?**  
- Ensures empty tasks are not added.  
- Stores tasks in an array to manage them efficiently.

---

### **5️⃣ Updating the To-Do List UI**
```js
function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem); 
    })
}
```
🔹 **What it does?**  
- Clears the existing task list (`innerHTML = ""`).
- Loops through `allTodos`, creates **list items**, and appends them to the UL.

🔹 **Why it's used?**  
- Ensures the UI always reflects the latest task list.

---

### **6️⃣ Creating a To-Do List Item**
```js
function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <img src="icons/check.svg" alt="Check">
        </label>   
        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>
        <button class="delete-button">
            <img src="icons/delete.svg" alt="Delete">
        </button>
    `
```
🔹 **What it does?**  
- Dynamically creates an `<li>` with:
  - **Checkbox** for marking tasks complete.
  - **Labels** for styling.
  - **Delete button** to remove tasks.

🔹 **Why it's used?**  
- Allows interactive task management by adding UI elements dynamically.

---

### **7️⃣ Handling Task Deletion**
```js
const deleteButton = todoLI.querySelector(".delete-button");
deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
});
```
🔹 **What it does?**  
- Adds a **click event listener** to delete a task.

🔹 **Why it's used?**  
- Allows users to remove unwanted tasks.

```js
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}
```
🔹 **What it does?**  
- Removes the task by filtering out the selected index.
- Saves the updated list and refreshes the UI.

🔹 **Why it's used?**  
- Ensures proper deletion of tasks while maintaining the list structure.

---

### **8️⃣ Handling Task Completion**
```js
const checkbox = todoLI.querySelector("input");
checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
});
checkbox.checked = todo.completed;
```
🔹 **What it does?**  
- Listens for checkbox changes.
- Updates the **completed status** of the corresponding task in `allTodos`.
- Saves the changes to `localStorage`.

🔹 **Why it's used?**  
- Allows users to **mark tasks as complete/incomplete** persistently.

---

### **9️⃣ Saving To-Dos to Local Storage**
```js
function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todoJson);
}
```
🔹 **What it does?**  
- Converts `allTodos` into a JSON string and stores it in `localStorage`.

🔹 **Why it's used?**  
- Ensures **tasks persist** even after the page is refreshed.

---

### **🔟 Retrieving To-Dos from Local Storage**
```js
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
```
🔹 **What it does?**  
- Fetches **saved tasks** from `localStorage`.
- If no tasks exist, returns an **empty array** (`[]`).

🔹 **Why it's used?**  
- Ensures the to-do list loads with previously saved tasks.

---

## **💡 Summary**
| Functionality       | Purpose |
|--------------------|------------------------------------------------|
| `addTodo()`        | Adds a new task to the list |
| `updateTodoList()` | Renders the latest tasks dynamically |
| `createTodoItem()` | Creates a single list item with UI elements |
| `deleteTodoItem()` | Removes a task from the list |
| `saveTodos()`      | Saves tasks in `localStorage` for persistence |
| `getTodos()`       | Retrieves saved tasks from `localStorage` |
| Event Listeners    | Handle form submission, checkbox clicks, and deletions |

---

### **🔥 Final Thoughts**
Your to-do list is **efficient, user-friendly, and persistent** thanks to:
✅ **Dynamic UI updates**  
✅ **Local Storage** for saving tasks  
✅ **Event Listeners** for user interactions  

Let me know if you need any improvements! 🚀🔥