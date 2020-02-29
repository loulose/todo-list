var taskList = document.getElementsByClassName("task");
var i;
for (i = 0; i < taskList.length; i++) {
  // Create a checkbox and prepend it to each list item
  var trash = document.createElement("IMG");
  trash.setAttribute('src', '../assets/media/trash.png');
  trash.setAttribute('height', '40px');
  trash.className = "delete";
  taskList[i].appendChild(trash);

  // Create a vertical line and append it to each list item
  var span = document.createElement("SPAN");
  span.setAttribute('class', 'vertSplit');
  taskList[i].appendChild(span);

  // Create a second vertical line and append it to each list item
  var span2 = document.createElement("SPAN");
  span2.setAttribute('class', 'vertSplit2');
  taskList[i].appendChild(span2);
}

// Click on delete button to hide the current list item
var del = document.getElementsByClassName("delete");
var i;
for (i = 0; i < del.length; i++) {
  del[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Create a new list item
function newElement() {
  var li = document.createElement("li");

  var span = document.createElement("span");
  span.className = "vertSplit";

  var span2 = document.createElement("span");
  span2.className = "vertSplit2";

  var span3 = document.createElement("span");
  span3.className = "taskText";

  li.className = "task";
  var inputValue = document.getElementById("taskTitle").value;
  var t = document.createTextNode(inputValue);
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

  var checkBox = document.createElement("DIV");
  checkBox.setAttribute('class', 'checkBox');
  li.insertBefore(checkBox, li.firstChild);

  var trash = document.createElement("IMG");
  trash.setAttribute('src', '../assets/media/trash.png');
  trash.setAttribute('height', '40px');
  trash.className = "delete";
  li.appendChild(trash);

  for (i = 0; i < del.length; i++) {
    del[i].onclick = function() {
      var div = this.parentElement;
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
