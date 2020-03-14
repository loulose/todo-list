<?php
require_once("config.php");
header("Content-Type: application/json; charset=UTF-8");

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
// Query handling/JSON output
function parseQuery($returnData, $records, $method, $returnMessage = 1){
  if(strpos($returnData, "dbError") !== false){  // Failure
    $error = explode("dbError: ", $returnData);
    $clientResponse = array(
      "success"=>"false", "method"=>"newTask", "description:"=>"database error", "errorDump"=>$error[1]
    );
    http_response_code(400);
    printf(json_encode($clientResponse));
  }else{  // Success
    $responseArray["response"] = array();
    $clientResponse = array(
      "success"=>"true", "method"=>$method, "records"=>$records["records"]
    );
    array_push($responseArray["response"], $clientResponse);
    if($returnMessage=="1"){
      http_response_code(200);
      printf(json_encode($responseArray));
   }
  }
}

function newTask($taskName){
  if(strlen($taskName)>0){ // Make sure task name is not empty
    $orderID = db("SELECT id FROM tasks ORDER BY id DESC LIMIT 1");
    $orderID = $orderID->fetch_assoc()["id"] + 1;
    $returnData = db("INSERT INTO tasks (taskName, taskOrder) VALUES ('$taskName', '$orderID')");
    $itemsArray["records"] = array();
    $taskItem = array(
      "id" => $orderID,
      "taskOrder" => $orderID,
      "taskName" => $taskName
    );
    array_push($itemsArray["records"], $taskItem);
    parseQuery($returnData, $itemsArray, "newTask");
    return $orderID;
  } else{ // Task name is empty
    $clientResponse = array("success"=>"false", "task"=>"new", "description:"=>"Task name is empty");
    http_response_code(400);
    printf(json_encode($clientResponse));
  }
}

function deleteTask($id){
  $returnData = db("DELETE FROM tasks WHERE id='$id'");
  $itemsArray["records"] = array();
  $taskItem = array(
    "id" => $id,
    "status" => "deleted"
  );
  array_push($itemsArray["records"], $taskItem);
  parseQuery($returnData, $itemsArray, "delete");
}

function updateTask($id, $orderID, $targetID = 0, $method, $complete){
  /*
  Methods:
  1 = Update ID/Re-order, 2 = mark complete/incomplete
  */
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if($method=="1"){
    /* Re-order tasks based off of drag&drops from the frontend */
    if($id>$targetID){
      $result2 = $db->query("SELECT id, taskOrder FROM tasks WHERE taskOrder >= '$targetID' AND taskOrder < '$orderID' ");
      while($row = $result2->fetch_assoc()) {
       $subTarget = $row["taskOrder"] + 1;
       $dbID = $row["id"];
       $returnData = db("UPDATE tasks SET taskOrder = '$subTarget' WHERE id='$dbID'");
       $itemsArray["records"] = array();
       $taskItem = array(
         "id" => $id,
         "targetID" => $targetID
       );
       array_push($itemsArray["records"], $taskItem);
       parseQuery($returnData, $itemsArray, "updateTask", 0); // Don't return message if SELECT is success.
      }
    }else{
      $result2 = $db->query("SELECT id, taskOrder FROM tasks WHERE taskOrder <= '$targetID' AND taskOrder > '$orderID'");
      while($row = $result2->fetch_assoc()) {
       $subTarget = $row["taskOrder"] - 1;
       $dbID = $row["id"];
       $returnData= db("UPDATE tasks SET taskOrder = '$subTarget' WHERE id='$dbID'");
       $itemsArray["records"] = array();
       $taskItem = array(
         "id" => $dbID,
         "targetID" => $subTarget
       );
       array_push($itemsArray["records"], $taskItem);
       parseQuery($returnData, $itemsArray, "updateTask", 0); // Don't return message if SELECT is success.
      }
    }
    //$result1 =
    $returnData = db("UPDATE tasks SET taskOrder='$targetID' WHERE id='$id'");
    $itemsArray["records"] = array();
    $taskItem = array(
      "id" => $id,
      "targetID" => $targetID
    );
    array_push($itemsArray["records"], $taskItem);
    parseQuery($returnData, $itemsArray, "updateTask");
  }
  if($method=="2"){
    /* Mark complete/incomplete in DB */
    $complete = (int)($complete === 'true'); // Convert our boolean to an interger for DB
    $returnData = db("UPDATE tasks SET status = '$complete' WHERE id='$id'");
    $itemsArray["records"] = array();
    $taskItem = array(
      "id" => $id,
      "status" => $complete
    );
    array_push($itemsArray["records"], $taskItem);
    parseQuery($returnData, $itemsArray, "updateTask");
  }
  $db->close();
}

function pullTasks(){ // Pull tasks from DB, output in JSON
  $itemsArray = array();
  $itemsArray["records"] = array();
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $tasks = db("SELECT id, taskOrder, taskName, status FROM tasks ORDER BY taskOrder ASC");
  while($row = $tasks->fetch_assoc()) {
    $taskItem = array(
      "id" => $row["id"],
      "taskOrder" => $row["taskOrder"],
      "taskName" => $row["taskName"],
      "status" => $row["status"]
    );
    array_push($itemsArray["records"], $taskItem);
  }
  parseQuery($returnData, $itemsArray, "updateTask");
  $db->close();
}

/* POST Query Handling */
if($_POST["newTask"]=="exec"){
  newTask($data["taskTitle"]);
}else if($_POST["deleteTask"]=="exec"){
  deleteTask($data["id"]);
}else if($_POST["updateTask"]=="exec"){
  updateTask($data["id"], $data["orderID"], $data["targetID"], $data["method"], $data["complete"]);
}
else if($_POST["pullTasks"]=="all"){
  pullTasks();
}
/* No queries = error */
else{
  $itemsArray["response"] = array();
  $clientResponse = array("success"=>"false", "description:"=>"no input data");
  array_push($itemsArray["response"], $clientResponse);
  http_response_code(400);
  printf(json_encode($itemsArray));
}


?>
