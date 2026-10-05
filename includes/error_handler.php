<!-- error_handler.php -->
<?php
function custom_error_handler($errno, $errstr, $errfile, $errline)
{
    if ($errno === 404) {
        header("HTTP/1.0 404 Not Found");
        include("error404.php");
        exit();
    }
}

set_error_handler("custom_error_handler");
?>
