<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST["megjegyzes"]) && isset($_POST["kaloria"]) && isset($_POST["feherje"]) && isset($_POST["zsir"]) && isset($_POST["szenhidrat"]) && isset($_POST["hamu"]) && isset($_POST["rost"])) {
        require_once 'databaseconnection.php';
        if ($connection->connect_error) {
            die("Sikertelen kapcsolódás az adatbázishoz: " . $connection->connect_error);
        }
        $sql = "INSERT INTO levesek(megnevezes, kaloria, feherje, zsir, szenhidrat, hamu, ros`) VALUES (?,?,?,?,?,?,?)";
        if ($stmt = $connection->prepare($sql)) {
            $stmt->bind_param("sssssss", $megjegyzes, $kaloria, $feherje, $zsir, $szenhidrat, $hamu, $rost);
            $megjegyzes = $_POST["megjegyzes"];
            $kaloria = $_POST["kaloria"];
            $feherje = $_POST["feherje"];
            $zsir = $_POST["zsir"];
            $szenhidrat = $_POST["szenhidrat"];
            $hamu = $_POST["hamu"];
            $rost = $_POST["rost"];
            if ($stmt->execute()) {
                http_response_code(201);
                echo "Sikeresen lett hozzáadva";
            } else {
                http_response_code(404);
                echo 'Sikertelen hozzáadás';
            }
            $stmt->close();
        } else {
            echo "Hiba a lekérés előkészítésekor: " . $connection->error;
        }
        $connection->close();
    } else {
        echo "Hiányzó mezők!";
    }
} else {
    echo "Érvénytelen kérés!";
}