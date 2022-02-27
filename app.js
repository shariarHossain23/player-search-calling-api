const searchPlayer = async () =>{
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    //  clear display 
    searchInput.value = "";

    // calling api
    try {
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
        const res = await fetch(url)
        const data = await res.json()
        showDisplay(data.player)
    } catch (error) {
        console.log(error)
    }
    
}

const showDisplay = players => {
    const showPlayer = document.getElementById("players");
    // clear display
    showPlayer.textContent = "";

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
    });
}

const playerDetails = async details => {
   try {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${details}`
    const res = await fetch(url);
    const data = await res.json()
    showDisplayDetails(data.players[0])
   } catch (error) {
       console.log(error)
   }
}

const showDisplayDetails = players => {
    console.log(players)
}