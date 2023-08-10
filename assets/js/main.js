const inputBox = document.querySelector("#input-box");
const taskContainer = document.querySelector(".todo-list");
const ekleyici = document.querySelector("#eklebtn");
const filtreleme = document.querySelectorAll('[name="filter"]');
const Leftİtem = document.querySelector(".footer-leftitem");

const LeftTask = () => {
  const itemLeft = Array.from(taskContainer.children).filter(item => item.className === "task").length;
  Leftİtem.textContent = `${itemLeft} İtem Left`;
};

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
  const originalText = todoText.textContent;
  const input = document.createElement("input");
  input.value = originalText;

  // replaceChild:ilk elementi ikincisi ile değiştir
  todoItem.replaceChild(input, todoText);
  input.focus();

  // her klavyeye basışı al enter tıklandığında işlem yap
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newText = input.value;

      // eğer boş değilse çalıştır
      if (newText.trim() !== "") {
        todoText.textContent = newText;
      }

      // replaceChild:ilk elementi ikincisi ile değiştir
      todoItem.replaceChild(todoText, input);
      saveData();
    }
  });
};


taskContainer.addEventListener("click", (tikla) => {
  // Tıklanan LI ise class ismine completed ekle
  if (tikla.target.tagName === "LI") {
    tikla.target.classList.toggle("completed");
    saveData();
    LeftTask();
  }
  // Tıklanan şeyin class ı sil ise tıklananın üst elementini sil
  else if (tikla.target.classList.contains("sil")) {
    const parentElement = tikla.target.parentElement;
    parentElement.classList = "deletedtask";
    tikla.target.parentElement.firstChild.textContent = "Deleted Task";
    setTimeout(function() {
      
      parentElement.remove();
      LeftTask()
      saveData();
    }, 900);
  }
});

// ul yi dataya kaydet
const saveData = () => {
  localStorage.setItem("data", taskContainer.innerHTML);
};

// kayıtlı datayı yükle
const loadData = () => {
  taskContainer.innerHTML = localStorage.getItem("data");
  saveData();
  LeftTask();
};



// kaç işaretlenmemiş görev kaldı yazdır
for (const filter of document.querySelectorAll('[name="filter"]')) {
  filter.addEventListener("click", function () {
    taskContainer.classList.value = `todo-list ${this.value}`;
  });
}

loadData();