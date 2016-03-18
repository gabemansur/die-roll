<?php
require_once('lib/config.php');
require_once('lib/db_con.php');
require_once('lib/validate.php');
require_once('lib/functions.php');

if(isset($_POST['s_id']) && $_POST['s_id'] != ''){
  $s_id = alphanumeric_only($_POST['s_id']);
}

else $s_id = false;

if(isset($_POST['cond']) && $_POST['cond'] != ''){
  $cond = alphanumeric_only($_POST['cond']);
}

if(isset($_POST['side']) && $_POST['side'] != ''){
  $side = alphanumeric_only($_POST['side']);
}

if(isset($_POST['result']) && $_POST['result'] != ''){
  $result = alphanumeric_only($_POST['result']);
}

if($s_id){
  echo 'YES';
  storeResults($s_id, $cond, $side, $result);
}
exit;
