<?php
$sql = '';
if(count($keresLeves) > 1){
    if(is_int(intval($keresLeves[1]))){
        $sql = 'SELECT * FROM levesek WHERE megnevezes=' . $keresLeves[1];
    }else{
        http_response_code(404);
        echo 'Nem létező ügyfel';
    }
}else{
    $sql = 'SELECT * FROM levesek WHERE 1';
}
require_once "./databaseconnection.php";
$result = $connection->query($sql);
if($result->num_rows > 0){
    $futarok = array();
    while($row = $result->fetch_assoc()){
        $futarok[] = $row;
    }
    http_response_code(200);
    echo json_encode($futarok);
}else{
    http_response_code(404);
    echo 'Nincs egy ügyfel sem';
}