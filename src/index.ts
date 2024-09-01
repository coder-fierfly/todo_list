// создаем интерфейс, чтобы задать тип данных для объектов
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// массив для хранения задач
let todos: Todo[] = [];

// загружаем задачи из localStorage при старте
loadTodos();

// функция для добавления новых задачек
function addTodo() {
    const input = document.getElementById("todoInput") as HTMLInputElement;
    const title = input.value.trim(); //для удаления лишних пробелов
    if (title) {
        const newTodo: Todo = {
            id: Date.now(),
            title: title,
            completed: false
        };
        todos.push(newTodo);
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

// выполнено или нет
function toggleTodoCompletion(id: number) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

//обновление списка на экране
function renderTodos() {
    const todoList = document.getElementById("todoList") as HTMLElement;
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement("li");
        todoItem.className = todo.completed ? "completed" : "";
        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodoCompletion(${todo.id})">
            <span>${todo.title}</span>
        `;
        todoList.appendChild(todoItem);
    });
}
// Добавляем обработчик для нажатия клавиши Enter
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
        addTodo();
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos();
}

(window as any).addTodo = addTodo;
(window as any).toggleTodoCompletion = toggleTodoCompletion;
(window as any).handleKeyDown = handleKeyDown;
