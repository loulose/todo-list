// Click on delete button to hide the current list item
let del = document.getElementsByClassName("delete");
for (let i = 0; i < del.length; i++) {
  del[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
    let id = div.id;
    console.log(id);
  }
}

// Create a new list item based off of values pulled from backend
function newElement(id, taskName, taskStatus) {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.className = "vertSplit";

  let span2 = document.createElement("span");
  span2.className = "vertSplit2";

  let span3 = document.createElement("span");
  span3.className = "taskText";

  if(taskStatus==1){ // If task is marked complete, set checked task
    li.className = "checked task";
  }else{ // Not complete, just set as normal task
    li.className = "task";
  }
  // Set task ID, as we'll need this for re-arranging order via drag&drop + deleting from DB
  li.id = id;
  li.draggable = "true"; // Make the items dragable.

  let inputValue = taskName; //document.getElementById("taskTitle").value

  let t = document.createTextNode(inputValue);
  li.appendChild(span);
  li.appendChild(span2);
  li.appendChild(span3);
  span3.appendChild(t);
/*
  if (inputValue === '') {
    alert("You must enter text to create a task!");
  } else {
    document.getElementById("taskUL").appendChild(li);
  }*/
  document.getElementById("taskUL").appendChild(li);
  document.getElementById("taskTitle").value = "";

  let checkBox = document.createElement("DIV");
  checkBox.setAttribute('id', 'customCheckbox');
  checkBox.setAttribute('class', 'customCheckbox');
  li.insertBefore(checkBox, li.firstChild);

  let trash = document.createElement("IMG");
  trash.setAttribute('src', './assets/media/trash.png');
  trash.setAttribute('height', '40px');
  trash.className = "delete";
  li.appendChild(trash);

  for (i = 0; i < del.length; i++) {
    del[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
      let id = div.id;
      console.log(id);
      deleteTask(id);
    }
  }

}

function newTask(inputText){
  let dataSend = "newTask=exec&taskTitle=" + inputText;
  return apiReq(dataSend);
}

function deleteTask(id){
  let dataSend = "deleteTask=exec&id=" + id;
  return apiReq(dataSend, 3);
}

function moveTask(id, targetID){
  let dataSend = "updateTask=exec&method=1&id=" + id + "&targetID=" + targetID;
  return apiReq(dataSend, 3);
  // Now we need to update the ID on the frontend in-case we move anything else around/delete/mark completed
  let originalListID = document.getElementbyId(id);
  let targetListID = document.getElementById(targetID);
  originalListID.setAttribute("id", targetID);
  targetListID.setAttribute("id", id);
}

function markTask(id, status){
  let dataSend = "updateTask=exec&method=2&id=" + id + "&complete=" + status;
  return apiReq(dataSend, 3);
}

// Creates new element (line item) when hitting enter
document.getElementById('taskTitle').onkeydown = function(event) {
    if (event.keyCode == 13) {
      let inputText = document.getElementById("taskTitle").value;
      if (inputText === '') {
        alert("You must enter text to create a task!");
      } else {
        newTask(inputText);
      }
    }
}

// Add a check symbol when clicking on a custom checkbox (marks parent line item as checked)
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  let cb = ev.target;
  if (cb.tagName === 'DIV') {
    cb = cb.parentNode;
    cb.classList.toggle('checked');
    let checkStatus = cb.classList.contains('checked');
    markTask(cb.id, checkStatus);
  }
}, false);

// Drag and drop line item
let dragged;
let id;
let index;
let indexSwitch;
let dragList;

  document.addEventListener("dragstart", ({target}) => {
      dragged = target;
      id = target.id;
      dragList = target.parentNode.children;
      for(let i = 0; i < dragList.length; i += 1) {
        if(dragList[i] === dragged){
          index = i;
        }
      }
  });

  document.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  document.addEventListener("drop", ({target}) => {
   if(target.className == "task" && target.id !== id) {
       dragged.remove( dragged );
      for(let i = 0; i < dragList.length; i += 1) {
        if(dragList[i] === target){
          indexSwitch = i;
        }
      }
      moveTask(id, target.id); // Update database to reflect order of tasks
      //console.log(index, indexSwitch, target.id, id); // index/indexSwitch will be used for backend tomorrow
      if(index > indexSwitch) {
        target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });



  /***** BACKEND CONNECTIONS *****/
let reqFile = "../backend/api.php";
function apiReq(data, type = 1) { // Type 1 = push, type 2 == pull (Actually, either way we need to repull)
  let request = new XMLHttpRequest();
  if(type=="2"){
    request.onreadystatechange = function(){
        if(this.readyState==4){
        let list = JSON.parse(this.responseText);
        console.log(list);
        for (var record of list.records){
             newElement(record.taskOrder, record.taskName, record.status);
          }
       }
   }
  }else if(type=="1"){
    request.onreadystatechange = function(){
      if(this.readyState==4){
        let response = JSON.parse(this.responseText);
        newElement(response.taskOrder, response.name, 0);
        console.log(response);
      }
     }
  } else{
    request.onreadystatechange = function(){
      if(this.readyState==4){
        let response = JSON.parse(this.responseText);
        console.log(response);
      }
     }
  }
  request.open("POST", reqFile, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(data);
}

// Get Todo list from backend in JSON format, send to newElement() to popularize list.
function getList(){
  // Re-add list items with any new information
  let dataSend = "pullTasks=all";
  let data = apiReq(dataSend, 2);
}

getList();
