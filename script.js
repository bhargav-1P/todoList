const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');

// Load from localStorage
let tasks = JSON.parse(localStorage.getItem('myTodoList')) || [];

// Save to localStorage
function saveTasks() {
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}

// Render tasks on screen
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = task;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    
    counter.textContent = tasks.length;
}
// Add task
addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;
    
    tasks.push(text);
    saveTasks();
    renderTasks();
    input.value = '';
});

// Enter key support
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

// Initial render
renderTasks();