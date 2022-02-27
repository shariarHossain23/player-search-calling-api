document.getElementById("error-message").innerText = ""
document.getElementById("spiner").style.display = "none"
const searchPlayer = async () =>{
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    document.getElementById("spiner").style.display = "block"
    //  clear display 
    searchInput.value = "";
    document.getElementById("player-details").textContent = "";

    // calling api
    try {
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
        const res = await fetch(url)
        const data = await res.json()
        showDisplay(data.player)
    } catch (error) {
        errorMessage(error)
    }
}

const showDisplay = players => {
    const showPlayer = document.getElementById("players");
    // clear display
    showPlayer.textContent = "";
    if(players == undefined){
        document.getElementById("error-message").innerText = "no result found"
        document.getElementById("spiner").style.display = "none"
    }
   else{
    players.forEach(player => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
        <div id="player-card" class="card shadow mt-5 p-5">
        <img class="w-75 mb-4" src="${player.strCutout}" alt="img not found" />
        <h6>Name :${player.strPlayer}</h6>
        <p class="fw-normal"> Country:${player.strNationality}</p>
        <div>
        <button type="button" class="btn btn-danger mx-2">Delete</button>
        <button onclick="playerDetails(${player.idPlayer})" type="button" class="btn btn-info text-white">Details</button> 
        </div>
    </div>
        `
        showPlayer.appendChild(newDiv)
        document.getElementById("error-message").innerText = ""
        document.getElementById("spiner").style.display = "none"
    });
    
   }
}
// error function
const errorMessage = (error) =>{
    document.getElementById("error").style.display = "block"
}

const playerDetails = async details => {
    document.getElementById("spiner").style.display = "block"
   try {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`
    const res = await fetch(url);
    const data = await res.json()
    showDisplayDetails(data.players[0])
   } catch (error) {
       console.log(error)
   }
}

const showDisplayDetails = player => {
    const showDetails = document.getElementById("player-details")
    // clear details
    document.getElementById("players").textContent = "";
    showDetails.textContent = ''
    const newDiv = document.createElement("div");
    newDiv.innerHTML =`
    <div class="card shadow p-4">
              <img class="w-75 img-fluid" src="${player.strThumb}" alt="" />
              <h6 class="mt-5">Name :${player.strPlayer}</h6>
              <p>Born:${player.dateBorn}</p>
              <p>Born place:${player.strBirthLocation}</p>
              <p>Gender: ${player.strGender}</p>
              <p>Country: ${player.strNationality}</p>
              <p>Club: ${player.strTeam}</p>
              <p>Shirt:${player.strNumber}</p>
              <p>Position: ${player.strPosition}</p>
              <p>Height: ${player.strHeight}</p>
              <p>Weight: ${player.strWeight}</p>
              <p>About : ${player.strDescriptionEN}</p>
            </div>
    `
    showDetails.appendChild(newDiv)
    
}