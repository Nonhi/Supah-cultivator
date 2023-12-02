var gamedata = {
    Qi: 0,
    QiPerClick: 1,
    QiPerClickCost: 10,
    ManualAmount: 0,
    ManualCost: 4
}

function cultivate() {
    gamedata.Qi += gamedata.QiPerClick
    document.getElementById("qicultivated").innerHTML = gamedata.Qi + " Qi"
}

function buyQiPerClick() {
    if (gamedata.Qi >= gamedata.QiPerClickCost) { 
        gamedata.Qi -= gamedata.QiPerClickCost
        gamedata.QiPerClick += 1
        gamedata.QiPerClickCost *= 2
        document.getElementById("qicultivated").innerHTML = gamedata.Qi + " Qi"
        document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + gamedata.QiPerClick + ") Cost: " + gamedata.QiPerClickCost + " Qi"
    }   
}

function buyManual() {
    if (gamedata.Qi >= gamedata.ManualCost) {
        gamedata.Qi -= gamedata.ManualCost
        gamedata.ManualAmount += 1
        gamedata.ManualCost *= 2
        document.getElementById("qicultivated").innerHTML = gamedata.Qi + " Qi"
        document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + gamedata.ManualAmount + ") Cost: " + gamedata.ManualCost +" Qi"

    }
}

var mainGameLoop = window.setInterval(function() {
    cultivate()
}, 1000)

var saveGameLoop = window.localStorage(function() {
    localStorage.setItem("SupahcultivatorSave", JSON.stringify(gamedata))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("SupahcultivatorSave"))
if (savegame !== null) {
    gamedata = savegame
}