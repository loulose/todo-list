<?php
require_once("config.php");

if($_GET){ // Secure & map all input requests by default.
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  $data = array_map(array($db, 'real_escape_string'), $_GET);
  $db->close();
}
function newTask($taskName){

}

?>
