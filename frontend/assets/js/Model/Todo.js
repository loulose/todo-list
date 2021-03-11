/*

The Todo-class is created by the  todoController, and held and
edited by the TodoList. It mostly just holds values, but has a 
few (hopefully) self-explanatory functions. I could have added 
get-functions and more set-functions, but I only did the functions
I felt were relevant. 

*/

export class Todo {
  constructor(id, orderID, taskName, taskStatus) {
    this.id = id;
    this.orderID = orderID;
    this.taskName = taskName;
    this.taskStatus = taskStatus;
  }

  changeTaskStatus(status) {
    this.taskStatus = status;
    return status;
  }

  changeOrderID(newID) {
    this.orderID = newID;
    return newID;
  }
}
