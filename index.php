<?php
require_once('lib/config.php');
require_once('lib/db_con.php');
require_once('lib/validate.php');
require_once('lib/functions.php');

  if(isset($_GET['id']) && $_GET['id'] != ''){
    $s_id = alphanumeric_only($_GET['id']);
  }

  else $s_id = false;

  if(isset($_GET['cond']) && $_GET['cond'] != ''){
    $cond = alphanumeric_only($_GET['cond']);
  }

  else $cond = 'transparent';

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>DIE-ROLL</title>

    <!-- Latest compiled and minified Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap-3.3.5-dist/css/bootstrap.min.css">

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-1.11.3.min.js" type="text/javascript"></script>

    <!-- Latest compiled and minified Bootstrap JavaScript -->
    <script src="bootstrap-3.3.5-dist/js/bootstrap.min.js" type="text/javascript"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

		<link type="text/css" rel="stylesheet" media="all" href="css/style.css" />

		<script src="js/scripts.js" type="text/javascript"></script>
    <script>
      var cond = "<?php echo $cond; ?>";
      var count = 0;
      var maxRolls = 5;
    </script>
  </head>
  <body>
    <div class="container">
			<div class="row">

				<div class="col-lg-12">
					<img id="die" src="img/die_0.jpg">
				</div>

			</div>
      <div class="row">
        <div class="col-lg-12">
          <form id="die_form">
            <?php if($cond == 'transparent'):?>
            <label class="radio-inline"><input type="radio" name="side" value="U">U</label>
            <label class="radio-inline"><input type="radio" name="side" value="D">D</label>
            <?php endif; ?>
            <input type="hidden" id="s_id" name="s_id" value="<?php echo $s_id;?>">
            <input type="hidden" id="result" name="result">
            <input type="hidden" id="cond" name="cond" value="<?php echo $cond; ?>">
            <button type="button" id="throw" class="btn btn-primary">Throw Die</button>
          </form>
          <p id="roll-count">Roll <span id="count"></span> of <span id="max"></span></p>
          <h3 id="msg"></h3>
        </div>
      </div>
		</div>

  </body>
</html>
