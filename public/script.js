// Main entry: fetch tasks and set up modal when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  fetchTasks();
  setupCreateTaskModal();
});

// Fetch all tasks from the API and render them
function fetchTasks() {
  fetch("http://localhost:3000/api/tasks")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      addTasks(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Render all tasks as cards in the main section
function addTasks(data) {
  const mainSection = document.querySelector(".main-section");
  if (!mainSection) return;

  // Remove existing task cards before loading new ones
  mainSection.querySelectorAll(".task-card").forEach((card) => card.remove());

  // For each task, create a card and add event listeners
  data.forEach((task) => {
    const isChecked = task.Status === "Completed" ? "checked" : "";
    const card = document.createElement("article");
    card.className = "task-card";
    card.innerHTML = `
      <span class="title-and-checkbox">
        <input type="checkbox" ${isChecked} data-task-id="${task.TaskId}" class="task-status" />
        <h2>${task.TaskName}</h2>
      </span>
      <div class="dates">
        <span><p>Start date: ${new Date(task.StartDate).toLocaleDateString()}</p></span>
        <span><p>Estimated end date: ${new Date(task.EstimatedDate).toLocaleDateString()}</p></span>
      </div>
      <p>${task.Description}</p>
      <div class="status-and-priority">
        <p><strong>Status:</strong> <span class="statusText">${task.Status}</span></p>
        <p><strong>Priority:</strong> ${task.Priority}</p>
      </div>
      <button class="delete-task-btn">Delete</button>
    `;

    // Add event listener to the checkbox for status update
    const checkbox = card.querySelector(".task-status");
    addCheckboxListener(checkbox, card, task);

    // Add event listener to the delete button for deleting the task
    const deleteBtn = card.querySelector(".delete-task-btn");
    addDeleteButtonListener(deleteBtn, card, task);

    mainSection.appendChild(card);
  });
}

// Add event listener to the delete button to delete the task
function addDeleteButtonListener(deleteBtn, card, task) {
  deleteBtn.addEventListener("click", function () {
    // Confirm before deleting
    if (confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:3000/api/tasks/${task.TaskId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete task");
          }
          // Remove the card from the DOM if successful
          card.remove();
        })
        .catch((error) => {
          alert("Error deleting task: " + error.message);
        });
    }
  });
}

// Add event listener to the checkbox to update task status
function addCheckboxListener(checkbox, card, task) {
  checkbox.addEventListener("change", function () {
    const updatedStatus = this.checked ? "Completed" : "Pending";
    // Prepare the updated task object
    const updatedTask = {
      TaskId: task.TaskId,
      TaskName: task.TaskName,
      Description: task.Description,
      Status: updatedStatus,
      Priority: task.Priority,
      StartDate: task.StartDate,
      EstimatedDate: task.EstimatedDate,
      UserId: task.UserId,
    };
    // Send PUT request to update the task status
    fetch(`http://localhost:3000/api/tasks/${task.TaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task status");
        }
        // Update the status text in the card
        card.querySelector(
          ".statusText"
        ).textContent = `${updatedStatus}`;
      })
      .catch((error) => {
        console.error("Update error:", error);
        // Revert checkbox if update fails
        this.checked = !this.checked;
      });
  });
}

// Set up the modal for creating a new task
function setupCreateTaskModal() {
  const createTaskBtn = document.getElementById("createTaskBtn");
  const modal = document.getElementById("taskModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const createTaskForm = document.getElementById("createTaskForm");

  // Open modal on button click
  createTaskBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Close modal on close button click
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Handle form submission in a separate function
  createTaskForm.addEventListener("submit", handleCreateTaskFormSubmit);
}

// Handle the create task form submission, including validation and POST request
function handleCreateTaskFormSubmit(e) {
  e.preventDefault();
  const taskName = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDesc").value;
  const priority = document.getElementById("taskPriority").value;
  const startDate = document.getElementById("taskStartDate").value;
  const estimatedDate = document.getElementById("taskEstimatedDate").value;

  // Validate estimatedDate is not before today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const estimated = new Date(estimatedDate);

  if (estimated < today) {
    alert("The estimated end date can't be before today.");
    return false;
  }

  // Prepare the new task object
  const task = {
    TaskName: taskName,
    Description: description,
    Status: "Pending",
    Priority: parseInt(priority, 10),
    StartDate: startDate,
    EstimatedDate: estimatedDate,
    UserId: 1, // Change as needed for your app
  };

  // Send POST request to create the new task
  fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to create task");
      return response.json();
    })
    .then(() => {
      // Close modal and reset form
      document.getElementById("taskModal").style.display = "none";
      document.getElementById("createTaskForm").reset();
      // Reload tasks using the reusable fetchTasks function
      fetchTasks();
    })
    .catch((error) => {
      alert("Error creating task: " + error.message);
    });
}
