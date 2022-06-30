const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const toDosWrapper = document.querySelector(".todos-wrapper");
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"));

let toDoItemElem = []

function Task(description) {
  this.description = description;
  this.comlited = false;
}
const createTemplate = (tasks, index) => {
  return `
  <div class="todo-item ${tasks.comlited ? 'checked' : ''}">
<div class="descriptions">${tasks.description}</div>
<div class="buttons">
    <input onclick="compliteTask(${index})" class="btn-complite" type="checkbox" ${tasks.comlited ? 'checked': ''}>
    <button onclick="deliteTask(${index})" class="btn-delite">Удалить</button>
</div>
</div>
  `;
}
  const filtrTasks =() =>{
    const activeTasks = tasks.length && tasks.filter(item => item.comlited == false)
    const comlitedTasks = tasks.length && tasks.filter(item => item.comlited == true)
tasks = [...activeTasks,...comlitedTasks]  }

const fillHtmlList = () => {
  toDosWrapper.innerHTML = "";
  if (tasks.length > 0)
   {filtrTasks();
    tasks.forEach((item, index) => {
      toDosWrapper.innerHTML += createTemplate(item, index);
    });
    toDoItemElem = document.querySelectorAll('.todo-item')
  }
};

fillHtmlList()

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const compliteTask = index => {
  console.log(index)
  tasks[index].comlited = !tasks[index].comlited
  if (tasks[index].comlited){
    toDoItemElem[index].classList.add('checked')
  }
  else{
    toDoItemElem[index].classList.remove('checked')
  }
  updateLocal()
  fillHtmlList()
}

addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  fillHtmlList()
  deskTaskInput.value = ''
});
 

const deliteTask = index => {
 toDoItemElem[index].classList.add('delition')
  setTimeout(() =>{tasks.splice(index,1),
    updateLocal(),
    fillHtmlList() 
    },300)
}
