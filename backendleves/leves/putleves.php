<?php
$putadat = fopen('php://input', "r");
$raw_data = "";
while($chunk = fread($putadat, 1024)){
    $raw_data .=$chunk;
}
fclose($putadat);
$adatJSON = json_decode($raw_data);
$megnevezes = $adatJSON->megnevezes;
$kaloria = $adatJSON->kaloria;
$feherje = $adatJSON->feherje;
$zsir = $adatJSON->zsir;
$szenhidrat = $adatJSON->szenhidrat;
$hamu = $adatJSON->hamu;
$rost = $adatJSON->rost;
require_once './databaseconnection.php';
$sql = "UPDATE levesek SET megnevezes=?, kaloria=?, feherje=?, zsir=?, szenhidrat=?, hamu=?, rost=? WHERE fazon=?";
$stml = $connection->prepare($sql);
$stml->bind_param("ssi", $fnev, $ftel, $fazon);
if($stml->execute()){
    http_response_code(201);
    echo "Sikeres módosítás";
}else{
    http_response_code(404);
    echo "Sikertelen módosítás";
}