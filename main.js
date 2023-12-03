
var Qi = 0
var QiPerClick = 1
var QiPerClickCost = 10
var ManualAmount = 0
var ManualCost = 4
var BreakthroughStage = 1
var BreakthroughCost = 1000   


function cultivate() {
    Qi += QiPerClick
    document.getElementById("qicultivated").innerHTML = Qi + " Qi"
}

function buyQiPerClick() {
    if (Qi >= QiPerClickCost) { 
        Qi -= QiPerClickCost
        QiPerClick += 1
        QiPerClickCost *= 2
        document.getElementById("qicultivated").innerHTML = Qi + " Qi"
        document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + QiPerClick + ") Cost:" + QiPerClickCost + "Qi"
    }   
}

function buyManual() {
    if (Qi >= ManualCost) {
        Qi -= ManualCost
        ManualAmount += 1
        ManualCost *= 2
        document.getElementById("qicultivated").innerHTML = Qi + " Qi"
        document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + ManualAmount + ") Cost: " + ManualCost +" Qi"

    }
}

function Breakthrough() {
    if (Qi >= BreakthroughCost) {
        Qi -= BreakthroughCost
        BreakthroughStage += 1
        BreakthroughCost *= 2
        document.getElementById("qicultivated").innerHTML = Qi + " Qi"
        document.getElementById("BreakthroughSystem").innerHTML = "Break through to realm" + BreakthroughStage + "Cost: " + BreakthroughCost + " Qi"

    }
}

function PassiveQiGain() {
    Qi += ((ManualAmount + QiPerClick)*BreakthroughStage)
    document.getElementById("qicultivated").innerHTML = Qi + " Qi"
    document.getElementById("PassiveGain").innerHTML = ((ManualAmount + QiPerClick)*BreakthroughStage) + " Qi/s"
}

function Save() {
    var gamesave = {
        Qi: Qi,
        QiPerClick: QiPerClick,
        QiPerClickCost: QiPerClickCost,
        ManualAmount: ManualAmount,
        ManualCost: ManualCost,
        BreakthroughStage: BreakthroughStage,
        BreakthroughCost: BreakthroughCost,
    }
    localStorage.setItem("SupahcultivatorSave", JSON.stringify(gamesave))
}



var mainGameLoop = window.setInterval(function() {
    PassiveQiGain() 
}, 1000)


var saveGameLoop = window.setInterval(function() {
    Save()
})

function loadgame() {
    var savedgame = JSON.parse(localStorage.getItem("SupahcultivatorSave"))
    if (typeof savedgame.Qi !== "undefined") Qi = savedgame.Qi;
    if (typeof savedgame.QiPerClick !== "undefined") QiPerClick = savedgame.QiPerClick;
    if (typeof savedgame.QiPerClickCost!== "undefined") QiPerClickCost = savedgame.QiPerClickCost;
    if (typeof savedgame.ManualAmount !== "undefined") ManualAmount = savedgame.ManualAmount;
    if (typeof savedgame.ManualCost!== "undefined") ManualCost = savedgame.ManualCost;
    if (typeof savedgame.BreakthroughStage!== "undefined") BreakthroughStage = savedgame.BreakthroughStage;
    if (typeof savedgame.BreakthroughCost!== "undefined") BreakthroughCost= savedgame.BreakthroughCost;
}

window.onload = function() {
    loadgame();
    document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + ManualAmount + ") Cost: " + ManualCost +" Qi";
    document.getElementById("PassiveGain").innerHTML = (ManualAmount + QiPerClick) + " Qi/s";
    document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + QiPerClick + ") Cost: " + QiPerClickCost + " Qi";
    document.getElementById("BreakthroughSystem").innerHTML = "Break through to realm" + BreakthroughStage + "Cost: " + BreakthroughCost + " Qi";
};