document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterBtn = document.getElementById('filter-btn');
    const sortBtn = document.getElementById('sort-btn');
  
    let tasks = [];
    let filterCompleted = false;
  
    function addTask(name, date, priority) {
      const task = {
        id: Date.now(),
        name,
        date,
        priority,
        completed: false
      };
      tasks.push(task);
      displayTasks();
    }
  
    function displayTasks() {
      taskList.innerHTML = '';
      const filteredTasks = tasks.filter(task => 
        filterCompleted ? task.completed : true
      );
  
      const sortedTasks = filteredTasks.sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(a.date) - new Date(b.date);
        }
        return a.priority.localeCompare(b.priority);
      });
  
      sortedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item', `task-priority-${task.priority}`);
        if (task.completed) taskItem.classList.add('completed');
  
        taskItem.innerHTML = `
          <span>${task.name} - ${task.date}</span>
          <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
          <button onclick="editTask(${task.id})">Editar</button>
          <button onclick="deleteTask(${task.id})">Excluir</button>
        `;
  
        taskList.appendChild(taskItem);
      });
    }
  
    function toggleComplete(id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        displayTasks();
      }
    }
  
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      displayTasks();
    }
  
    function editTask(id) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        const newName = prompt("Editar Nome da Tarefa:", task.name);
        const newDate = prompt("Editar Data de Conclusão:", task.date);
        const newPriority = prompt("Editar Prioridade (alta, media, baixa):", task.priority);
        if (newName) task.name = newName;
        if (newDate) task.date = newDate;
        if (newPriority) task.priority = newPriority;
        displayTasks();
      }
    }
  
    filterBtn.addEventListener('click', () => {
      filterCompleted = !filterCompleted;
      displayTasks();
    });
  
    sortBtn.addEventListener('click', () => {
      tasks.sort((a, b) => {
        if (a.priority === b.priority) {
          return new Date(a.date) - new Date(b.date);
        }
        return a.priority.localeCompare(b.priority);
      });
      displayTasks();
    });
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskName = document.getElementById('task-name').value;
      const taskDate = document.getElementById('task-date').value;
      const taskPriority = document.getElementById('task-priority').value;
  
      addTask(taskName, taskDate, taskPriority);
      taskForm.reset();
    });
  
    displayTasks();
  });
  