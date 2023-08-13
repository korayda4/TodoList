const inputBox = document.querySelector("#input-box");
const taskContainer = document.querySelector(".todo-list");
const filters = document.querySelectorAll('[name="filter"]');
const leftItem = document.querySelector(".footer-leftitem");
const rightItem = document.querySelector(".footer-rightitem");
const completeAll = document.querySelector(".completeAll");
const addForm = document.querySelector(".add-form");

const LeftTask = () => {
  const itemLeft = document.querySelectorAll("li.task:not(.completed)").length;
  leftItem.innerText = itemLeft > 1 ? itemLeft + ' items left' : itemLeft + ' item left';
};

function clearCompleted() {
  const completedItems = [...taskContainer.querySelectorAll('.completed')];
  completedItems.forEach(element => {
    element.remove();
  if([...taskContainer.children].length <= 7){
      taskContainer.id = ""
  }
  });
}
rightItem.addEventListener('click', clearCompleted);
  
const addTask = (e) => {
  e.preventDefault();

  if (inputBox.value === "") {
    inputBox.classList.add("warn");
  }
  
  const taskHTML = `
  <li class="task" draggable="true">${inputBox.value}
    <span class="sil">×</span>
  </li>`

  addForm.reset();
  taskContainer.insertAdjacentHTML("beforeend", taskHTML);
  inputBox.classList.remove("warn");
  systemFunction()

  if([...taskContainer.children].length >= 7){
    taskContainer.id = "scroll"
  } else {taskContainer.id = ""}

  AddEventListenerDrag()
};
addForm.addEventListener('submit', addTask)


taskContainer.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "LI") {
    enableEdit(e.target);
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
    systemFunction()
  } else if (tikla.target.classList.contains("sil")) {
    const parentElement = tikla.target.parentElement;
    parentElement.classList = "deletedtask";
    tikla.target.parentElement.firstChild.textContent = "Deleted Task";
    setTimeout(function() {
      if([...taskContainer.children].length <= 7){
        taskContainer.id = ""
      }
      parentElement.remove();
      systemFunction()
    }, 450);
  }
});

const saveData = () => {
  localStorage.setItem("data", taskContainer.innerHTML);
};

const loadData = (e) => {
  taskContainer.innerHTML = localStorage.getItem("data");
  if([...taskContainer.children].length <= 7){
    taskContainer.id = ""
  }else {taskContainer.id = "scroll"}
  AddEventListenerDrag()
  systemFunction()
};

for (const filter of document.querySelectorAll('[name="filter"]')) {
  filter.addEventListener("click", function () {
    taskContainer.classList.value = `todo-list ${this.value}`;
  });
}

loadData();

// taskContainer.children.addEventListener("dragstart",() => {
//   console.log("çalıştı")
// });

let dragStartIndex;

function AddEventListenerDrag (){
  const draggable = taskContainer.querySelectorAll("li.task");
  
  taskContainer.addEventListener("dragstart", dragStart)
  
  draggable.forEach(e => {
    e.addEventListener("dragleave",dragLeave)
    e.addEventListener("dragover",dragOver)
    e.addEventListener("drop",dragDrop)
    e.addEventListener("dragenter",dragEnter)
  });
}
const liElements = [...taskContainer.querySelectorAll("li.task")];
function dragStart(event) {
  
  dragStartIndex = liElements.indexOf(event.target);
}

function dragOver(e){
  e.preventDefault();
  // console.log("DragOver");this.id = ""
}
function dragDrop(event){
  const dragEndIndex = liElements.indexOf(event.target)
  swapItems(dragStartIndex,dragEndIndex)
  event.target.id = ""
  
  // console.log("DragDrop");
}
function swapItems (fromIndex , toIndex){

  const itemOne = taskContainer.children[fromIndex]
  const itemTwo = taskContainer.children[toIndex]
  let makeSwap = taskContainer.children

  makeSwap[fromIndex].appendChild(itemTwo)
  makeSwap[toIndex].appendChild(itemOne)


}

function dragEnter(){
  this.id = "over"
}
function dragLeave() {
  this.id = ""
}

completeAll.addEventListener("click", () => {
  
  const notCompleted = document.querySelectorAll("li.task:not(.completed)")

  if (notCompleted.length !== 0) {
    notCompleted.forEach(e => e.classList.add("completed"));
  } else if(notCompleted.length === 0){
    document.querySelectorAll("li.task.completed").forEach(e => e.classList.remove("completed"))
  }
  systemFunction()
});


function systemFunction() {
  saveData()
  LeftTask()
}