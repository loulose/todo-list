<?php
require_once("config.php");

if($_POST){ // Secure & map all input requests by default.
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $data = array_map(array($db, 'real_escape_string'), $_POST);
  $db->close();
}

function db($query){ // DB Query function
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if ($db->connect_error) { // Record any DB connection errors.
    return "dbError: " . $db->error;
  }

  $result = $db->query($query); // Execute query, store as var

  if(!$result){
    return "dbError: " . $db->error;
  } else{ // Success
    return $result;
}

  $db->close();
}


function newTask($taskName){
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $orderID = db("SELECT id FROM tasks ORDER BY id DESC LIMIT 1");
  $orderID = $orderID->fetch_assoc()["id"] + 1;
  $db->close();

  $returnData = db("INSERT INTO tasks (taskName, taskOrder) VALUES ('$taskName', '$orderID')");
  if(strpos($returnData, "dbError") !== false){ // Success
    $error = explode("dbError: ", $returnData); // Failure
    $clientResponse = array("error"=>"true", "task"=>"new", "description:"=>"database error", "errorDump"=>$error[1]);
    http_response_code(400);
    printf(json_encode($clientResponse));
  }else{
    $clientResponse = array("error"=>"false", "task"=>"new", "description:"=>"");
    http_response_code(200);
    printf(json_encode($clientResponse));
  }
}

function deleteTask($id){

}

function updateTask($id, $complete, $method){
  /*
  Methods:
  1 = Update ID/Re-order, 2 = mark complete/incomplete
  */
  if($method=="1"){

  }
  if($method=="2"){ // 1 = Update ID/Re-order, 2 = mark complete/incomplete

  }
}

function pullTasks(){ // Pull tasks from DB
  $taskArray = array();
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $tasks = db("SELECT taskOrder, taskName, status FROM tasks ORDER BY taskOrder DESC");
  while($row = $tasks->fetch_assoc()) {
    $taskArray[] = $row;
  }
  printf(json_encode($taskArray));
  $db->close();
}

/* POST Queries */
if($_POST["newTask"]=="exec"){
  newTask($data["taskTitle"]);
}else if($_POST["deleteTask"]=="exec"){
  deleteTask(data["id"]);
}else if($_POST["updateTask"]=="exec"){
  updateTask(data["id"], data["complete"], data["method"]);
}
else if($_POST["pullTasks"]=="all"){
  pullTasks();

}
/* No queries = error */
else{
  $clientResponse = array("error"=>"true", "description:"=>"no input data");
  http_response_code(404);
  printf(json_encode($clientResponse));
}


?>
