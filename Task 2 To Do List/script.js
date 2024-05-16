const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const clearTasksBtn = document.getElementById('clear-tasks');
const searchBtn = document.getElementById('search-btn');
const addTaskModal = document.getElementById('addTaskModal');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  const filteredTasks = searchInput.value.trim() === '' ? tasks : tasks.filter(task => task.text.toLowerCase().includes(searchInput.value.trim().toLowerCase()));

  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'animate__animated', 'animate__fadeInUp');
    if (task.checked) {
      listItem.classList.add('checked');
    }

    const taskText = document.createElement('span');
    taskText.textContent = `${task.text} (${task.time})`;

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'mr-2', 'animate__animated', 'animate__zoomIn');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener('click', () => editTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'animate__animated', 'animate__zoomIn');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
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
    $('#addTaskModal').modal('hide');
    showToast('Task added successfully', 'success');
  } else {
    showToast('Please enter a task', 'warning');
  }
}

function editTask(index) {
  const newTaskText = prompt('Enter the new task text', tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== '') {
    tasks[index].text = newTaskText.trim();
    saveTasksToLocalStorage();
    renderTasks();
    showToast('Task edited successfully', 'success');
  } else if (newTaskText === null) {
    // Do nothing
  } else {
    showToast('Please enter a valid task', 'warning');
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
  showToast('Task deleted successfully', 'success');
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
  showToast('Checked tasks cleared', 'success');
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.classList.add('toast', `animate__animated`, `animate__fadeInUp`, `toast-${type}`);
  toast.innerHTML = `
    <div class="toast-header">
      <strong class="mr-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;
  document.body.appendChild(toast);
  $('.toast').toast('show');
  setTimeout(() => {
    $('.toast').toast('hide');
  }, 3000);
}

addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', renderTasks);
clearTasksBtn.addEventListener('click', clearCheckedTasks);

renderTasks();