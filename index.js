document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const deleteCheckedBtn = document.getElementById("deleteChecked");
    const deleteAllBtn = document.getElementById("deleteAll");
    const filterUncheckedBtn = document.getElementById("filterUnchecked");
    const clockDisplay = document.getElementById("clock");

    // Load tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => addTaskToUI(task.text, task.checked));
    }

    // Save tasks to local storage
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push({
                text: task.textContent,
                checked: task.classList.contains("checked")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Live Clock
    function updateClock() {
        let now = new Date();
        clockDisplay.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Add task to UI
    function addTaskToUI(taskText, checked = false) {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = checked;

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));

        if (checked) li.classList.add("checked");

        taskList.appendChild(li);
    }

    // Add New Task (Function)
    function addTask() {
        let taskText = taskInput.value.trim();
        if (taskText === "") return;

        addTaskToUI(taskText);
        saveTasks();

        taskInput.value = "";
    }

    // Add Task Button Click
    addTaskBtn.addEventListener("click", addTask);

    // Add Task on "Enter" Key Press
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Mark Task as Checked
    taskList.addEventListener("change", function (e) {
        if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
            e.target.parentElement.classList.toggle("checked");
            saveTasks();
        }
    });

    // Delete Checked Tasks
    deleteCheckedBtn.addEventListener("click", function () {
        document.querySelectorAll("li.checked").forEach(task => task.remove());
        saveTasks();
    });

    // Delete All Tasks
    deleteAllBtn.addEventListener("click", function () {
        taskList.innerHTML = "";
        localStorage.removeItem("tasks");
    });

    // Filter Unchecked Tasks
    filterUncheckedBtn.addEventListener("click", function () {
        document.querySelectorAll("li").forEach(task => {
            task.style.display = task.classList.contains("checked") ? "none" : "flex";
        });
    });

    // Load tasks when the page loads
    loadTasks();
});
