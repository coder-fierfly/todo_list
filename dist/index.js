"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// массив для хранения задач
var todos = [];
// загружаем задачи из localStorage при старте
loadTodos();
// функция для добавления новых задачек
function addTodo() {
    var input = document.getElementById("todoInput");
    var title = input.value.trim(); //для удаления лишних пробелов
    if (title) {
        var newTodo = {
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
function toggleTodoCompletion(id) {
    todos = todos.map(function (todo) {
        return todo.id === id ? __assign(__assign({}, todo), { completed: !todo.completed }) : todo;
    });
    saveTodos();
    renderTodos();
}
//обновление списка на экране
function renderTodos() {
    var todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.forEach(function (todo) {
        var todoItem = document.createElement("li");
        todoItem.className = todo.completed ? "completed" : "";
        todoItem.innerHTML = "\n            <input type=\"checkbox\" ".concat(todo.completed ? "checked" : "", " onchange=\"toggleTodoCompletion(").concat(todo.id, ")\">\n            <span>").concat(todo.title, "</span>\n        ");
        todoList.appendChild(todoItem);
    });
}
// Добавляем обработчик для нажатия клавиши Enter
function handleKeyDown(event) {
    if (event.key === "Enter") {
        addTodo();
    }
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos() {
    var storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos();
}
window.addTodo = addTodo;
window.toggleTodoCompletion = toggleTodoCompletion;
window.handleKeyDown = handleKeyDown;
