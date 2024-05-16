const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const clearTasksBtn = document.getElementById('clear-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  const filteredTasks = searchInput.value.trim() === '' ? tasks : tasks.filter(task => task.text.includes(searchInput.value.trim()));

  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (task.checked) {
      listItem.classList.add('checked');
    }

    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (${task.time})`;

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.checked = task.checked;
    checkboxInput.addEventListener('change', () => toggleTaskChecked(index));

    listItem.appendChild(checkboxInput);
    listItem.appendChild(taskText);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    tasks.push({ text: taskText, time: currentTime, checked: false });
    taskInput.value = '';
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function editTask(index) {
  const newTaskText = prompt('Enter the new task text', tasks[index].text);
  if (newTaskText !== null) {
    tasks[index].text = newTaskText.trim();
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleTaskChecked(index) {
  tasks[index].checked = !tasks[index].checked;
  saveTasksToLocalStorage();
  renderTasks();
}

function clearCheckedTasks() {
  tasks = tasks.filter(task => !task.checked);
  saveTasksToLocalStorage();
  renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', renderTasks);
clearTasksBtn.addEventListener('click', clearCheckedTasks);

renderTasks();