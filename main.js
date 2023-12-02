var gamedata = {
    Qi: 0,
    QiPerClick: 1,
    QiPerClickCost: 10
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

var mainGameLoop = window.setInterval(function() {
    cultivate()
}, 1000)