<?php
switch ($_SERVER['REQUEST_METHOD']){
    case "GET":
        require_once 'leves/getleves.php';
        break;
    case "POST":
        require_once 'leves/postleves.php';
        break;
    case "DELETE":
        require_once 'leves/deleteleves.php';
        break;
    case "PUT":
        require_once 'leves/putleves.php';
        break;
    default:
        break;
}