const inputBox = document.querySelector("#input-box");
const taskContainer = document.querySelector(".todo-list");
const ekleyici = document.querySelector("#eklebtn");
const filtreleme = document.querySelectorAll('[name="filter"]');
const leftItem = document.querySelector(".footer-leftitem");
const rightItem = document.querySelector(".footer-rightitem");

const LeftTask = () => {
  const itemLeft = [...taskContainer.children].filter(item => item.className === "task").length;
  leftItem.textContent = `${itemLeft} Item Left`;
};


function clearCompleted() {
  const completedItems = Array.from(taskContainer.querySelectorAll('.completed'));
  if (completedItems.length > 0) {
    rightItem.textContent = "Clear Completed";
    rightItem.addEventListener("click", () => {
      for (const item of completedItems) {
        item.remove();
      }
      rightItem.textContent = "";
      LeftTask();
      saveData();
    });
  } else {
    rightItem.textContent = "";
    rightItem.removeEventListener("click", null);
  }
}

const addTask = () => {
  if (inputBox.value === "") {
    inputBox.classList.add("warn");
    inputBox.focus();
  } else {
    const taskHTML = `
      <li class="task">${inputBox.value}
        <span class="sil">×</span>
      </li>
    `;
    inputBox.value = "";
    inputBox.focus();
    taskContainer.insertAdjacentHTML("beforeend", taskHTML);
    inputBox.classList.remove("warn");
    saveData();
    LeftTask();
  }
};

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

taskContainer.addEventListener("dblclick", (t) => {
  if (t.target.tagName === "LI") {
    enableEdit(t.target);
  }
});

const enableEdit = (todoItem) => {
  const todoText = todoItem.firstChild;
  const input = document.createElement("input");
  input.value = todoText.textContent.trim();

  todoItem.replaceChild(input, todoText);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (input.value.trim() !== "") {
        todoText.textContent = input.value;
      }
      todoItem.replaceChild(todoText, input);
      saveData();
    }
  });
};

taskContainer.addEventListener("click", (tikla) => {
  if (tikla.target.tagName === "LI") {
    tikla.target.classList.toggle("completed");
    clearCompleted();
    saveData();
    LeftTask();
  } else if (tikla.target.classList.contains("sil")) {
    const parentElement = tikla.target.parentElement;
    parentElement.classList = "deletedtask";
    tikla.target.parentElement.firstChild.textContent = "Deleted Task";
    setTimeout(function() {
      parentElement.remove();
      clearCompleted();
      LeftTask();
      saveData();
    }, 900);
  }
});

const saveData = () => {
  localStorage.setItem("data", taskContainer.innerHTML);
};

const loadData = () => {
  taskContainer.innerHTML = localStorage.getItem("data");
  LeftTask();
};

for (const filter of document.querySelectorAll('[name="filter"]')) {
  filter.addEventListener("click", function () {
    taskContainer.classList.value = `todo-list ${this.value}`;
  });
}

loadData();
