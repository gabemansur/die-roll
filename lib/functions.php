<?php

function storeResults($s_id, $cond, $side, $result)
{

  $mysqli = db_connect();
  $result = mysqli_query($mysqli, "INSERT into results (s_id, cond, side, result) VALUES ('$s_id', '$cond', '$side', '$result')");
}

?>
