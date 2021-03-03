import { TodoList } from "./Model/TodoList.js";
import { Todo } from "./Model/Todo.js";

/* 

Create a todoList. This will hold all of the Todos. All changes related 
to the tasks, will go through todoList. It is currently in the global scope, which is
bad practice, but for this exercise, I chose to keep it this way. 

*/

const todoList = new TodoList();

/**

Creates a new element based on user input. todoController will create an instance
of the class Todo, and put it into the todoList. It will also call the renderTodo-function
which creates the View. 

 * @param  {string} id
 * @param  {number} orderID
 * @param  {string} taskName
 * @param  {number} taskStatus
 */
function newElement(id, orderID, taskName, taskStatus) {
  const todo = new Todo(id, orderID, taskName, taskStatus);
  todoList.addTodo(todo);

  renderTodo(todo);
}

/**
 *
 *  todoController creates the View through this function.
 *  I have done minor tweaks to this function so that all the
 *  information goes through Todo and TodoList.
 *
 ** @param  {Todo} todo
 */
function renderTodo(todo) {
  let li = document.createElement("li");

  /* Create vertical split elements bassed on UI mockup */
  let span = document.createElement("span");
  span.className = "vertSplit";
  let span2 = document.createElement("span");
  span2.className = "vertSplit2";

  /* Task text alignment element */
  let span3 = document.createElement("span");
  span3.className = "taskText";

  if (todo.taskStatus == 1) {
    // If task is marked complete, set checked task
    li.className = "checked task";
  } else {
    // Not complete, just set as normal task
    li.className = "task";
  }

  // Set task ID, as we'll need this for re-arranging order via drag&drop + deleting from DB
  li.id = todo.id;
  li.setAttribute("data-id", todo.orderID);
  li.draggable = "true"; // Make the items dragable.

  let inputValue = todo.taskName;
  let t = document.createTextNode(inputValue);

  // Append all values
  li.appendChild(span);
  li.appendChild(span2);
  li.appendChild(span3);
  span3.appendChild(t);

  document.getElementById("taskUL").appendChild(li);
  document.getElementById("taskTitle").value = ""; //todo.taskName;

  let checkBox = document.createElement("DIV");
  checkBox.setAttribute("id", "customCheckbox");
  checkBox.setAttribute("class", "customCheckbox");
  li.insertBefore(checkBox, li.firstChild);

  let trash = document.createElement("IMG");
  trash.setAttribute("src", "./assets/media/trash.png");
  trash.setAttribute("height", "40px");
  trash.className = "delete";
  li.appendChild(trash);

  /* If I had time, I would have moved this into a separate function. Then it would not be necessary to both create the functions
  for the existing delete list and the coming delete lists. */

  for (var i = 0; i < del.length; i++) {
    del[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
      let id = div.id;
      console.log(id);
      deleteTask(id);
    };
  }
}

// Click on delete button to hide the current list item
let del = document.getElementsByClassName("delete");

for (let i = 0; i < del.length; i++) {
  del[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
    let id = div.id;
    console.log(id);
    deleteTask(id);
  };
}

// Creates new element (line item) when hitting enter
document.getElementById("taskTitle").onkeydown = function (event) {
  if (event.keyCode == 13) {
    let inputText = document.getElementById("taskTitle").value;
    if (inputText === "") {
      alert("You must enter text to create a task!");
    } else {
      newTask(inputText);
    }
  }
};

// Add a check symbol when clicking on a custom checkbox (marks parent line item as checked)
let list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    let cb = ev.target;
    if (cb.tagName === "DIV") {
      cb = cb.parentNode;
      cb.classList.toggle("checked");
      let checkStatus = cb.classList.contains("checked");
      markTask(cb.id, checkStatus);
    }
  },
  false
);

// Drag and drop line item
let dragged;
let id;
let idReal;
let index;
let indexSwitch;
let dragList;

// On dragstart
document.addEventListener("dragstart", ({ target }) => {
  dragged = target;
  id = target.getAttribute("data-id");
  idReal = target.id;
  dragList = target.parentNode.children;
  for (let i = 0; i < dragList.length; i += 1) {
    if (dragList[i] === dragged) {
      index = i;
    }
  }
});

document.addEventListener("dragover", (event) => {
  event.preventDefault();
});

// When task is repositioned (dropped), send updates to DB
document.addEventListener("drop", ({ target }) => {
  var idList = []; // We will store all potential IDs here.
  var orderList = []; // We will store all potential orderID's (positioning) here
  var newTarget = target.getAttribute("data-id");
  if (target.className == "task" && target.getAttribute("data-id") !== id) {
    dragged.remove(dragged);
    for (let i = 0; i < dragList.length; i += 1) {
      // Here we need to also change the IDs of all the items between dragged and target
      idList.push(parseInt(dragList[i].id)); // Store each orderID into an array
      orderList.push(parseInt(dragList[i].getAttribute("data-id"))); // Store each orderID into an array
      if (dragList[i] === target) {
        indexSwitch = i;
      }
    }
    /* Alright, so we need to have ID and orderID, we will set by ID but only change orderID*/
    if (index > indexSwitch) {
      // Moving a lower position to a higher position
      for (let i = 0; i < idList.length; i += 1) {
        if (
          orderList[i] >= target.getAttribute("data-id") &&
          orderList[i] < id
        ) {
          let subTarget = parseInt(orderList[i]) + 1;
          console.log(idList[i] + "  (sub) becomes " + subTarget);
          // Update the Todos in todoList.
          todoList.changeOrder(idList[i], subTarget);
          document.getElementById(idList[i]).setAttribute("data-id", subTarget);
        }
      }
      target.before(dragged);
      let originalListID = document.getElementById(idReal);
      var newID = parseInt(target.getAttribute("data-id")) - 1;
      originalListID.setAttribute("data-id", newID);
      console.log(idReal + " becomes " + newID);
    } else {
      // Moving a higher position to a lower position
      for (let i = 0; i < idList.length; i += 1) {
        if (
          orderList[i] <= target.getAttribute("data-id") &&
          orderList[i] > id
        ) {
          let subTarget = parseInt(orderList[i]) - 1;
          console.log(idList[i] + "  (sub) becomes " + subTarget);
          // Update the Todos in todoList.
          todoList.changeOrder(idList[i], subTarget);
          document.getElementById(idList[i]).setAttribute("data-id", subTarget);
        }
      }
      target.after(dragged);
      let originalListID = document.getElementById(idReal);
      var newID = parseInt(target.getAttribute("data-id")) + 1;
      originalListID.setAttribute("data-id", newTarget);
      console.log(idReal + " becomes " + newTarget);
      // Update the Todos in todoList.
      todoList.changeOrder(idReal, newTarget);
    }
    todoList.changeOrder(idReal, newTarget);
    //moveTask(idReal, id, newID);
    //moveTask(idReal, id, newTarget); // Update backend to reflect order of tasks, also set frontend to move original to target
  }
});

/* This function is no longer in use. If I had the time, I would change the code to use this function. See argumentation in README  */
/***** BACKEND CONNECTIONS *****/
let reqFile = "BACKEND"; // TODO make variable again
var requestComplete = 1;

function apiReq(data, type = 1) {
  // Type 1 = Push & Create new Element
  // Type 2 = Pull & Create new Element
  // Type 3 = Push & do not create new Element
  //if (typeof variable !== 'undefined') {  }
  if (requestComplete == 1) {
    // This actually only needs to be used if we're hitting the reodering page
    //Also, we're going to want to set an interval at the end of this to restart apiReq with previous values
    var request = new XMLHttpRequest();
    if (type == "2") {
      request.onreadystatechange = function () {
        requestComplete = 0;
        if (this.readyState == 4) {
          requestComplete = 1;

          let list = JSON.parse(this.responseText).response[0];
          console.log(list);
          for (var record of list.records) {
            newElement(
              record.id,
              record.taskOrder,
              record.taskName,
              record.status
            );
          }
        }
      };
    } else if (type == "1") {
      request.onreadystatechange = function () {
        requestComplete = 0;
        if (this.readyState == 4) {
          requestComplete = 1;
          let response = JSON.parse(this.responseText).response[0];
          console.log(response);

          newElement(
            response.records[0].id,
            response.records[0].taskOrder,
            response.records[0].taskName,
            0
          );
        }
      };
    } else {
      request.onreadystatechange = function () {
        requestComplete = 0;
        if (this.readyState == 4) {
          requestComplete = 1;
          let response = JSON.parse(this.responseText);
          console.log(response);
        }
      };
    }
    request.open("POST", reqFile, true);
    request.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    request.send(data);
  }
}

/**
 * Create the new Todo by calling newElement.
 * @param  {string} inputText
 */
function newTask(inputText) {
  //   let dataSend = "newTask=exec&taskTitle=" + inputText;
  //   return apiReq(dataSend);

  newElement(
    // Create a unique id.
    "" + Date.now(),
    todoList.getCount(),
    inputText,
    //  response.records[0].id,
    //  response.records[0].taskOrder,
    //  response.records[0].taskName,
    0
  );
}

/**
 * Remove the Todo from the DOM
 * @param  {number} id
 */
function renderClearItem(id) {
  let item = document.getElementById(id);
  item.remove();
}

/**
 * Remove the Todo from todolist and update the DOM
 * @param  {number} id
 */
function deleteTask(id) {
  todoList.removeTodo(id);
  renderClearItem(id);

  //Remove from backend
  //let dataSend = "deleteTask=exec&id=" + id;
  //return apiReq(dataSend, 3);
}

/**
 * Update the orderID in the todoList.
 * @param  {number} idReal
 * @param  {number} targetID
 */
function moveTask(idReal, targetID) {
  todoList.changeOrder(idReal, targetID);

  /**let dataSend =
    "updateTask=exec&method=1&id=" +
    idReal +
    "&targetID=" +
    targetID +
    "&orderID=" +
    orderID;
  return apiReq(dataSend, 3);**/
}

/**
 * Update the Todos in the todoList
 * @param  {number} id
 * @param  {boolean} status
 */
function markTask(id, status) {
  todoList.updateStatus(id, status);

  //let dataSend = "updateTask=exec&method=2&id=" + id + "&complete=" + status;
  //return apiReq(dataSend, 3);
}

/**
 *I changed this function to just return the todoList-length, but it's not in use.
 */
function getList() {
  todoList.getList();

  // Re-add list items with any new information
  //let dataSend = "pullTasks=all";
  //let data = apiReq(dataSend, 2);
}

getList();
