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
  id = id + 1;

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

}

function onEditTask(event){

  // resetForm();
  // var section =document.getElementsByTagName("section")[0];
  // var but =document.getElementById("createTask");
  //
  // section.style.display = "block";
  // but.textContent= "Close New task form";
  // var task = getCurrentTask(event.currentTarget);
  //
  // document.getElementById("title").value = task.title;
  // document.getElementById("description").value = task.description;
  // //TODO: document.getElementById("completed").value = task.completed;

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
  for (var t in taskList) {
  //showTaskOnScreen(taskList[t]);
  }
}

function findByTitle(){
  //TODO:
}

function onDeleteTask(event){
  var id = event.currentTarget.name;

  for (var variable in taskList) {
    if (taskList[variable].id == id) {
      taskList.remove(taskList[variable]);
    }
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
  editButton.name=t.id;
  article.appendChild(editButton );

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-primary");
  deleteButton.classList.add("glyphicon");
  deleteButton.classList.add("glyphicon-trash");
  deleteButton.addEventListener("click", function (event) {
    onDeleteTask(event);
  });
  deleteButton.name=t.id;
  article.appendChild(deleteButton );

  section.appendChild(article);
}
