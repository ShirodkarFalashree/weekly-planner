document.querySelectorAll('.push').forEach(function(button) {
    button.onclick = function () {
        var dayBox = this.closest('.daybox');
        var newTaskInput = dayBox.querySelector('.new-task input');
        var tasksContainer = dayBox.querySelector('.tasks');

        if (newTaskInput.value.length == 0) {
            alert("Please enter a task");
        } else {
            tasksContainer.innerHTML += `
                <div class="task">
                    <span class="task-name">
                        ${newTaskInput.value}
                    </span>
                    <button class="delete">
                        <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                    </button>
                </div>
            `;

            var deleteButtons = tasksContainer.querySelectorAll(".delete");
            deleteButtons.forEach(function(deleteButton) {
                deleteButton.onclick = function () {
                    this.parentNode.remove();
                };
            });

            var tasks = tasksContainer.querySelectorAll(".task");
            tasks.forEach(function(task) {
                task.onclick = function () {
                    this.classList.toggle('compleated');
                }
            });

            newTaskInput.value = "";
        }
    };
});
