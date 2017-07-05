var taskList=[];
var id = 0;

//Shows the task form to create a task
function onShowHideForm() {

  resetForm();
  var section =document.getElementsByTagName("section")[0];

  if(section.style.display ==="block"){
    hideForm();
  }else{
    showForm();
  }
}


//Private Methods used in onShowHideForm
function hideForm() {
  var section =document.getElementsByTagName("section")[0];
  var but =document.getElementById("showHideForm");
  section.style.display= "none";
  but.textContent= "Add task";
}
function showForm() {
  var section =document.getElementsByTagName("section")[0];
  var but =document.getElementById("showHideForm");
  section.style.display = "block";
  but.textContent= "Close New task form";
}

//Private Method to reset all the field values and validations in the form
function resetForm() {
  document.getElementById("titleLabel").classList.remove("has-error");
  document.getElementById("descriptionLabel").classList.remove("has-error");
  document.getElementById("form").reset();
}

//Adds or Edits a task when the button "Add task" is clicked
function onAddEditTask() {
  var taskToEdit = localStorage.getItem("taskToEdit");
  if(isBlankOrNull(taskToEdit)){
    createTask();
  }else{
    editTask(taskToEdit);
  }
}

//Private methods used but onAddEditTas
function createTask() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var completed = document.getElementById("completed").checked;
  if(!isBlankOrNull(title) && !isBlankOrNull(description)){
    var t = new Task(id,title, description,completed);
    taskList.push(t);
    addTaskToScreen(t);
    alert("Task has been successfully added");
    resetForm();
  }else{
    if(isBlankOrNull(title)){
      document.getElementById("titleLabel").classList.add("has-error");
    }
    if(isBlankOrNull(description)){
      document.getElementById("descriptionLabel").classList.add("has-error");
    }
  }
  id = id + 1;
}

function editTask(taskToEdit) {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var completed = document.getElementById("completed").checked;

  for (var variable in taskList) {
    if (taskList[variable].id == taskToEdit) {
      taskList[variable].title = title;
      taskList[variable].completed = completed;
      taskList[variable].description = description;
      var htmlTask = document.getElementById(variable);
      htmlTask.querySelector("h1").innerText = title ;
      htmlTask.querySelector("small").innerText = (completed ? "Completed": "Incomplete") ;
      htmlTask.querySelector("p").innerText = description ;
    }
  }
  localStorage.removeItem("taskToEdit");
  alert("Task has been successfully updated");
  resetForm();
}



function onEditTask(event){

  var taskToEditId = event.currentTarget.parentElement.id;
  resetForm();
  showForm();

  var task = getTaskFromTaskList(taskToEditId);

  document.getElementById("title").value= task.title;
  document.getElementById("completed").checked= task.completed;
  document.getElementById("description").value= task.description;
  localStorage.setItem("taskToEdit", taskToEditId);
}


function getTaskFromTaskList(taskToEditId) {
  for (var variable in taskList) {
    if (taskList[variable].id == taskToEditId) {
      return taskList[variable];
    }
  }
}

function onShowHideAll(){
  var section =document.getElementsByTagName("section")[1];

  if(section.style.display ==="block"){
    hideAllTasks();
  }else{
    showAllTasks();
  }
}

function showAllTasks() {
  var section =document.getElementsByTagName("section")[1];
  var but =document.getElementById("showHideAll");
  section.style.display = "block";
  but.textContent= "Hide all tasks";

}

function hideAllTasks() {
  var section =document.getElementsByTagName("section")[1];
  var but =document.getElementById("showHideAll");
  section.style.display= "none";
  but.textContent= "Show all tasks";

}

function findByTitle(){
  //TODO:
}

function onDeleteTask(event){
  if(confirm("Do you want to delete this task?")){
    var task = event.currentTarget.parentElement;

    for (var variable in taskList) {
      if (taskList[variable].id == task.id) {
        taskList.splice(variable,1);
      }
    }
    task.remove();
  }
}


//Private functions
function isBlankOrNull(variable){
  return (variable === "" || variable === null || variable === undefined );
}

function addTaskToScreen(t){
  var section =document.getElementsByTagName("section")[1];

  var article = document.createElement("div");
  article.classList.add("card");
  article.id = id;

  var h1Titlulo = document.createElement("h1");
  h1Titlulo.appendChild(document.createTextNode(t.title));
  article.appendChild(h1Titlulo);

  var smallGenero = document.createElement("small");
  smallGenero.appendChild(document.createTextNode(t.completed ? "Completed" : "Incomplete"));
  article.appendChild(smallGenero);

  var pSinopsis = document.createElement("p");
  pSinopsis.appendChild(document.createTextNode(t.description));
  article.appendChild(pSinopsis);

  var editButton = document.createElement("button");
  editButton.classList.add("btn");
  editButton.classList.add("btn-primary");
  editButton.classList.add("glyphicon");
  editButton.classList.add("glyphicon-pencil");
  editButton.addEventListener("click", function (event) {
    onEditTask(event);
  });
  article.appendChild(editButton );

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-primary");
  deleteButton.classList.add("glyphicon");
  deleteButton.classList.add("glyphicon-trash");
  deleteButton.addEventListener("click", function (event) {
    onDeleteTask(event);
  });
  article.appendChild(deleteButton );

  section.appendChild(article);
}
