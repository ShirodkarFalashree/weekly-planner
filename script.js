document.addEventListener('DOMContentLoaded', function () {
    loadTasks();

    document.querySelectorAll('.push').forEach(function (button) {
      button.onclick = function () {
        var dayBox = this.closest('.daybox');
        var newTaskInput = dayBox.querySelector('.new-task input');
        var tasksContainer = dayBox.querySelector('.tasks');

        if (newTaskInput.value.length == 0) {
          alert("Please enter a task");
        } else {
          var taskHTML = `
            <div class="task">
              <span class="task-name">
                ${newTaskInput.value}
              </span>
              <button class="delete">
                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
              </button>
            </div>
          `;

          tasksContainer.innerHTML += taskHTML;

          var deleteButtons = tasksContainer.querySelectorAll(".delete");
          deleteButtons.forEach(function (deleteButton) {
            deleteButton.onclick = function () {
              this.parentNode.remove();
              saveTasks();
            };
          });

          var tasks = tasksContainer.querySelectorAll(".task");
          tasks.forEach(function (task) {
            task.onclick = function () {
              this.classList.toggle('compleated');
              saveTasks();
            };
          });

          newTaskInput.value = "";
          saveTasks();
        }
      };
    });
  });

  function saveTasks() {
    var tasks = [];
    document.querySelectorAll('.daybox .tasks .task').forEach(function (taskElement) {
      tasks.push({
        name: taskElement.querySelector('.task-name').innerText,
        completed: taskElement.classList.contains('compleated')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var tasksContainer = document.querySelector('.daybox .tasks');

    tasks.forEach(function (task) {
      var taskHTML = `
        <div class="task ${task.completed ? 'compleated' : ''}">
          <span class="task-name">
            ${task.name}
          </span>
          <button class="delete">
            <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
          </button>
        </div>
      `;
      tasksContainer.innerHTML += taskHTML;
    });

    var deleteButtons = tasksContainer.querySelectorAll(".delete");
    deleteButtons.forEach(function (deleteButton) {
      deleteButton.onclick = function () {
        this.parentNode.remove();
        saveTasks();
      };
    });

    var tasksElements = tasksContainer.querySelectorAll(".task");
    tasksElements.forEach(function (taskElement) {
      taskElement.onclick = function () {
        this.classList.toggle('compleated');
        saveTasks();
      };
    });
  }
