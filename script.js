let tasks = [];
let id = 0;

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  document.getElementById('total').textContent = `Total: ${total}`;
  document.getElementById('completed').textContent = `Completed: ${completed}`;
  document.getElementById('pending').textContent = `Pending: ${pending}`;
  document.getElementById('clearBtn').disabled = completed === 0;
}

function render() {
  const list = document.getElementById('taskList');
  if (tasks.length === 0) {
    list.innerHTML = '<div class="empty">No tasks added.</div>';
    updateStats();
    return;
  }

  list.innerHTML = '';
  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text' + (task.completed ? ' completed' : '');
    span.onclick = () => toggleTask(task.id);

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => deleteTask(task.id);

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.appendChild(del);

    div.appendChild(span);
    div.appendChild(actions);

    list.appendChild(div);
  });

  updateStats();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: id++, text, completed: false });
  input.value = '';
  render();
}

function toggleTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    render();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  render();
}
