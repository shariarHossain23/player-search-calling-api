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
    console.log(players)
}