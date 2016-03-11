<?php

function db_connect() {
    $mysql_link = mysqli_connect(DB_HOST, DB_USER, DB_PASS)
              or die("Could not connect to database server");
    mysqli_select_db($mysql_link, DB_NAME)
              or die("Could not select database");

    return $mysql_link;

}
?>
