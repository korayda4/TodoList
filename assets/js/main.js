const inputBox = document.getElementById("input-box");
const taskContainer = document.getElementById("taskContainer");

// görev ekle fonksiyonu başlangıç
let sil = document.createElement("span");
let degis = document.createElement("span");
function AddTask() {
  if (inputBox.value === "") {
    alert("Görev yazmanız gerekiyor.");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.className = "task";
    inputBox.value = "";
    
    degis.classList.add("last-child");
    degis.innerHTML = "&#8803";
    sil.innerHTML = "\u00d7";
    li.appendChild(sil);
    li.appendChild(degis);
    taskContainer.appendChild(li);
    savedata();
  }
}

// görev ekle fonksiyonu bitiş

// işaretle fonksiyonu başlangıç

taskContainer.addEventListener("click",function(tikla){
    if(tikla.target.tagName === "LI"){
      tikla.target.classList.toggle("checked");
      savedata ();
    }
    else if (tikla.target.tagName === "SPAN"){
      tikla.target.parentElement.remove();
      savedata ();
    }
}, false)

// işaretle fonksiyonu bitiş

// düzenleme fonksiyonu başlangıç

taskContainer.addEventListener("click", function(event) {
  var duzenle = event.target;

  if (duzenle.className === "last-child") {
    
  inputBox.value = duzenle.parentElement.firstChild.textContent;
  duzenle.parentElement.remove();
  savedata();
  } 
  else if (duzenle.tagName === "SPAN") {
  duzenle.parentElement.remove();
  savedata();

  }
});

// düzenleme fonksiyonu bitiş

// kaydet ve yükle fonksiyonları başlangıç

function savedata() {
  localStorage.setItem("data", taskContainer.innerHTML);
}

function loaddata() {
  taskContainer.innerHTML = localStorage.getItem("data");
}

loaddata();

// kaydet ve yükle fonksiyonları bitiş

// function GetChecked() {
//   console.log("çalıştı");
//   var checkedTasks = [];
//   var tasks = document.querySelectorAll(".task");
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].classList.contains("checked")) {
//       checkedTasks.push(tasks[i]);
//     }
//   }
//   return checkedTasks;
// }