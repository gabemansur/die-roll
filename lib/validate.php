<?php


/**
 * Removes everything but digits from a string.
 * @param  $num 	The string to sanitize
 * @return 				A string with everything but numbers removed.
 */
function numbers_only($num){

  $string = preg_replace("/[^\d]/i", "", $num);
  return $string;

}

/**
 * Removes everything but letters and digits from a string.
 * @param  $input 	The string to sanitize
 * @return 				A string with everything but letters and
 *                 numbers removed.
 */
function alphanumeric_only($input){

  $string = preg_replace("/[^\w]/i", "", $input);
  return $string;
}

?>
