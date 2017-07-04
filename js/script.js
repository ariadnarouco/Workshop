var taskList=[];
var id = 0;

//Shows the new task form
function onCreateTask() {

    var section =document.getElementsByTagName("section")[0];
    var but =document.getElementById("createTask");

    if(section.style.display ==="block"){
      section.style.display= "none";
      but.textContent= "Add task";
    }else{
      section.style.display = "block";
      but.textContent= "Close New task form";
    }
    document.getElementById("form").reset();
    resetForm();

}

function resetForm() {
  document.getElementById("titleLabel").classList.remove("has-error");
  document.getElementById("descriptionLabel").classList.remove("has-error");
  document.getElementById("form").reset();
}

function onAddTask() {

  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var completed = document.getElementById("completed").value;


  if(!isBlankOrNull(title) && !isBlankOrNull(description)){
    var t = new Task(id,title, description,completed);
    taskList.push(t);
    showTaskOnScreen(t);
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

function onEditTask(event){

  resetForm();
  var task = event.currentTarget.parentElement;

  for (var variable in taskList) {
    if (taskList[variable].id == task.id) {
      taskList.splice(variable,1);
    }
  }

}

function onShowAll(){
  var section =document.getElementsByTagName("section")[1];
  var but =document.getElementById("showAll");

  if(section.style.display ==="block"){
    section.style.display= "none";
    but.textContent= "Show all tasks";
  }else{
    section.style.display = "block";
    but.textContent= "Hide all tasks";
  }
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

function showTaskOnScreen(t){
  var section =document.getElementsByTagName("section")[1];

  var article = document.createElement("div");
  article.classList.add("card");
  article.id = id;

  var h1Titlulo = document.createElement("h1");
  h1Titlulo.appendChild(document.createTextNode(t.title));
  article.appendChild(h1Titlulo);

  var smallGenero = document.createElement("small");
  smallGenero.appendChild(document.createTextNode(t.completed === "on" ? "Completed" : "Incomplete"));
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
