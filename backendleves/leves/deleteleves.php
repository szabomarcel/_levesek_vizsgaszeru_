<?php
$sql = '';
if(count($keresLeves) > 1){
    if(is_int(intval($keresLeves))){
        $sql = 'DELETE FROM levesek WHERE megnevezes=' . $keresLeves[1];
    }else{
        http_response_code(404);
        echo 'Nem létező futár';
    }
}
require_once './databaseconnection.php';
$result = $connection->query($sql);
if($result->num_rows > 0){
    $futarok = array();
    http_response_code(200);
    echo json_encode($futarok);
}else{
    http_response_code(404);
    echo ' Nincs egy ügyfel sem';
}