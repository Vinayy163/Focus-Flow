let taskList = [];
        let timerInterval;
        let timeLeft = 25 * 60; // 25 minutes in seconds
        let isRunning = false;
        let cycles = 0;

        // Load tasks from localStorage
        window.onload = function() {
            const stored = JSON.parse(localStorage.getItem('tasks')) || [];
            taskList = stored;
            renderTasks();
        }

        // Add a new task
        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const task = taskInput.value.trim();
            if (task) {
                taskList.push({ text: task, completed: false });
                taskInput.value = "";
                saveAndRender();
            }
        }

        // Toggle task completed
        function toggleTask(index) {
            taskList[index].completed = !taskList[index].completed;
            saveAndRender();
        }

        // Delete task
        function deleteTask(index) {
            taskList.splice(index, 1);
            saveAndRender();
        }

        // Save tasks and render
        function saveAndRender() {
            localStorage.setItem('tasks', JSON.stringify(taskList));
            renderTasks();
        }

        // Render task list
        function renderTasks() {
            const list = document.getElementById("taskList");
            list.innerHTML = "";
            taskList.forEach((task, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
                    <span class="${task.completed ? "completed" : ""}">${task.text}</span>
                    <button onclick="deleteTask(${index})">❌</button>
                `;
                list.appendChild(li);
            });
        }

        // Timer Functions
        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById("timer").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function startTimer() {
            if (!isRunning) {
                timerInterval = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timerInterval);
                        isRunning = false;
                        cycles++;
                        document.getElementById("cycles").innerText = cycles;
                        alert("Pomodoro cycle completed! Take a break.");
                        timeLeft = 5 * 60; // Switch to break
                        updateTimerDisplay();
                    }
                }, 1000);
                isRunning = true;
            }
        }

        function pauseTimer() {
            clearInterval(timerInterval);
            isRunning = false;
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = 25 * 60;
            updateTimerDisplay();
        }

        updateTimerDisplay();