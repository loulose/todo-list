/*

I wanted to create a class TodoList because I think it is a more
elegant way to describe the Model. I also believe it helps
the readability and makes the code more comprehensive.
I have skipped commenting on some of the functions because they
are so short and very self-explanatory (hopefully!).

*/

export class TodoList {
  constructor() {
    /* 
    
    The list is "set" to private since we have a get-method 
    (that is not really in use, right now, but I left it).
    
    */

    this._todoList = [];
  }

  getList() {
    return this._todoList;
  }

  addTodo(todo) {
    this._todoList.push(todo);
    return todo;
  }

  /*

    A method for myself, mostly, but I left it nontheless. 
    I usually use the debugger in the browser developer tools, but
    this time around, I chose to do it this way because it was
    quicker. 

    */

  debug() {
    for (var i = 0; i < this._todoList.length; i++) {
      console.log(
        this._todoList[i].taskName,
        this._todoList[i].id,
        this._todoList[i].orderID,
        this._todoList[i].taskStatus
      );
    }
  }

  getCount() {
    return this._todoList.length;
  }

  findTodo(id) {
    return this._todoList.findIndex((t) => t.id === id);
  }

  removeTodo(id) {
    var index = this.findTodo(id);
    if (index > -1) {
      this._todoList.splice(index, 1);
    }
    return index;
  }

  updateStatus(id, status) {
    var index = this.findTodo(id);
    if (index > -1) {
      this._todoList[index].changeTaskStatus(status ? 1 : 0);
    }
    return index;
  }

  /*

I am not happy with this function. I believe I could use
the change order/moveTask-function better, but this is what
I had time for. I also wanted to update the order of the list
so that taskID is the same as the list-index. 

*/

  changeOrder(idReal, targetID) {
    var index = this.findTodo(idReal + "");
    let newList = [];

    var newOrder = this._todoList[index].changeOrderID(parseInt(targetID));
  }
}
