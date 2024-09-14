export function getAllTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export function addTodo(todo) {
    const todos = getAllTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function removeTodo(id) {
    const todos = getAllTodos();
    const todoToRemove = todos.find((todo) => todo.id === id);
    if (!todoToRemove) {
        return {
            data: {
                ok: false,
                message: 'No such todo exists!'
            }
        };
    } else {
        todos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

export function getTodo(id) {
    const todos = getAllTodos();
    return todos.find((todo) => todo.id === id); // Returns undefined if no match is found
}

export function updateTodo(updatedTodo) {
    let todos = getAllTodos();
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
        todos[index] = updatedTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
        return {
            data: {
                ok: true,
                message: 'Todo updated successfully'
            }
        };
    } else {
        return {
            data: {
                ok: false,
                message: 'No such todo exists!'
            }
        };
    }
}