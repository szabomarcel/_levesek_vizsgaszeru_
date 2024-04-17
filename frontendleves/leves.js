document.addEventListener("DOMContentLoaded", function(){
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");    
    const selectButton = document.getElementById("select");

    createButton.addEventListener("click", async function () {
        let fazon = document.createElement("fazon").value;
        const baseUrl ="http://localhost/_levesek_vizsgaszeru_/backendleves/index.php?leves/" + megjegyzes;
        const formdata = new FormData(document.getElementById("futarForm"));
        let options = {
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response = await fetch(baseUrl, options);
        if(response.ok){
            console.log("Sikeres feltöltés");
        }else{
            console.error("Sikertelen feltöltés");
        }
        return response;
    });

    updateButton.addEventListener("click", async function(){        
        const baseUrl ="http://localhost/_levesek_vizsgaszeru_/backendleves/index.php?leves/" + megjegyzes;
        let object = {
            megjegyzes: document.getElementById("megjegyzes").value,
            kaloria: document.getElementById("kaloria").value,
            feherje: document.getElementById("feherje").value,
            zsir: document.getElementById("zsir").value,
            szenhidrat: document.getElementById("szenhidrat").value,
            hamu: document.getElementById("hamu").value,
            rost: document.getElementById("rost").value
        };
        let body = JSON.stringify(object);
        let options = {
            method: "PUT",
            mode: "cors",            
            body: body
        };
        let response = await fetch(baseUrl, options);
        return response;
    });

    readButton.addEventListener("click", async function(){
        const baseUrl ="http://localhost/_levesek_vizsgaszeru_/backendleves/index.php?leves";
        let options = {
            method: "GET",
            mode: "cors"
        }
        let response = await fetch(baseUrl, options);
        if(response.ok){
            let data = await response.json();
            futarListazas(data);
        }else{
            console.error("Hiba a szerver válaszában");
        }

    });

    function futarListazas(levesek){
        let levesDiv = document.getElementById("leveleslista");
        let tablazat = futarFejlec();
        for(let leves of levesek){
            tablazat += futarSor(leves);
        }
        levesDiv.innerHTML = tablazat + "</tbody></tbody>";
        return levesDiv;
    };

    function futarSor(leves){
        let sor = `<tr>
        <td>${leves.megjegyzes}</td>
        <td>${leves.kaloria}</td>
        <td>${leves.feherje}</td>
        <td>${leves.zsir}</td>
        <td>${leves.szenhidrat}</td>
        <td>${leves.hamu}</td>
        <td>${leves.rest}</td>
        <td>
            <button type="button" class="btn btn-outline-secondary" onclick="adatBetoltes(${leves.megjegyzes}, '${leves.kaloria}', '${leves.feherje}', '${leves.zsir}, '${leves.szenhidrat}', '${leves.hamu}', ${leves.rost})"><i class="fa-regular fa-hand-point-left"></i>Kiválasztás</button>
            <button type="button" class="btn btn-outline-secondary" onclick="adatTorles(${futar.megjegyzes}"><i class="fa-solid fa-trash"></i>Törlés</button>
        </td>
        </tr>`;
        return sor;
    };

    function futarFejlec(){
        let fejlec = `<table class="table table-striped">
        <thead>
            <tr>
                <th>Megjegyzés: </th>
                <th>Kalória: </th>
                <th>Fehérje: </th>
                <th>Zsir: </th>
                <th>Szénhidrát: </th>
                <th>Hamu: </th>
                <th>Rost: </th>
                <th>Művelet: </th>
            </tr>
        </thead>
        <tbody>`;
        return fejlec;
    };
    
});

function adatBetoltes(megjegyzes, kaloria, feherje, zsir, szenhidrat, hamu, rost){
    let baseUrl="http://localhost/_levesek_vizsgaszeru_/backendleves/index.php?leves/" + megjegyzes;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options)
    document.getElementById("megjegyzes").value=megjegyzes;
    document.getElementById("kaloria").value=kaloria;
    document.getElementById("feherje").value=feherje;
    document.getElementById("zsir").value=zsir;
    document.getElementById("szenhidrat").value=szenhidrat;
    document.getElementById("hamu").value=hamu;
    document.getElementById("rost").value=rost;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }else{
            console.error("Hiba a szerverben!");
        }
    });
}

function adatTorles(fazon){
    let baseUrl="http://localhost/_levesek_vizsgaszeru_/backendleves/index.php?leves/" + megjegyzes;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}