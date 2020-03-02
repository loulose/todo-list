let taskList = document.getElementsByClassName("task");
for (let i = 0; i < taskList.length; i++) {

  // Create a checkbox and prepend it to each list item
  let checkBox = document.createElement("DIV");
  checkBox.setAttribute('id', 'customCheckbox');
  checkBox.setAttribute('class', 'customCheckbox');
  taskList[i].insertBefore(checkBox, taskList[i].firstChild);

  // Create a checkbox and prepend it to each list item
  let trash = document.createElement("IMG");
  trash.setAttribute('src', './assets/media/trash.png');
  trash.setAttribute('height', '40px');
  trash.className = "delete";
  taskList[i].appendChild(trash);

  // Create a vertical line and append it to each list item
  let span = document.createElement("SPAN");
  span.setAttribute('class', 'vertSplit');
  taskList[i].appendChild(span);

  // Create a second vertical line and append it to each list item
  let span2 = document.createElement("SPAN");
  span2.setAttribute('class', 'vertSplit2');
  taskList[i].appendChild(span2);
}

// Click on delete button to hide the current list item
let del = document.getElementsByClassName("delete");
for (let i = 0; i < del.length; i++) {
  del[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// Create a new list item
function newElement() {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.className = "vertSplit";

  let span2 = document.createElement("span");
  span2.className = "vertSplit2";

  let span3 = document.createElement("span");
  span3.className = "taskText";

  li.className = "task";

  let inputValue = document.getElementById("taskTitle").value;
  let dataSend = "newTask=exec&taskTitle=" + inputValue;
  apiReq(dataSend);
  let t = document.createTextNode(inputValue);
  li.appendChild(span);
  li.appendChild(span2);
  li.appendChild(span3);
  span3.appendChild(t);

  if (inputValue === '') {
    alert("You must enter text to create a task!");
  } else {
    document.getElementById("taskUL").appendChild(li);
  }
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
    }
  }

}

// Creates new element (line item) when hitting enter
document.getElementById('taskTitle').onkeydown = function(event) {
    if (event.keyCode == 13) {
        newElement()
    }
}

// Add a check symbol when clicking on a custom checkbox (marks parent line item as checked)
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  let cb = ev.target;
  if (cb.tagName === 'DIV') {
    cb = cb.parentNode;
    cb.classList.toggle('checked');
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
      console.log(index, indexSwitch); // index/indexSwitch will be used for backend tomorrow
      if(index > indexSwitch) {
        target.before( dragged );
      } else {
       target.after( dragged );
      }
    }
  });
