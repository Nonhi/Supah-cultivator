
var Qi = 0
var QiPerClick = 10
var QiPerClickLevel = 1
var QiPerClickCost = 10
var ManualAmount = 0
var ManualCost = 4
var BreakthroughStage = 1
var BreakthroughCost = 1000  
var RebirthCost = 10000
var RebirthStage = 1
 


function cultivate() {
    Qi += QiPerClick*RebirthStage
    document.getElementById("qicultivated").innerHTML = Qi + " Qi"
}

function buyQiPerClick() {
    if (Qi >= QiPerClickCost) { 
        Qi -= QiPerClickCost;
        QiPerClick += (10*RebirthStage);
        QiPerClickCost = Math.round(QiPerClickCost*1.5); 
        QiPerClickLevel += 1;
        document.getElementById("qicultivated").innerHTML = Qi + " Qi";
        document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + (QiPerClickLevel) + ") Cost: " + QiPerClickCost + " Qi";
    }   
}

function buyManual() {
    if (Qi >= ManualCost) {
        Qi -= ManualCost
        ManualAmount += (1*RebirthStage)
        ManualCost *= 2
        document.getElementById("qicultivated").innerHTML = Qi + " Qi"
        document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + ManualAmount + ") Cost: " + ManualCost +" Qi"

    }
}

function Breakthrough() {
    if (Qi >= BreakthroughCost) {
        Qi -= BreakthroughCost
        BreakthroughStage += (1*RebirthStage)
        BreakthroughCost *= 2
        document.getElementById("qicultivated").innerHTML = Qi + " Qi"
        document.getElementById("BreakthroughSystem").innerHTML = "Break through to realm" + BreakthroughStage + "Cost: " + BreakthroughCost + " Qi"

    }
}

function Rebirth() {
    if (Qi >= RebirthCost) {
        Qi -= RebirthCost;
        RebirthStage += 1;
        RebirthCost *=2.5;
        Qi = 0
        QiPerClick = 100
        QiPerClickCost = 10
        QiPerClickLevel = 1
        ManualAmount = 0
        ManualCost = 4
        BreakthroughStage = 1
        BreakthroughCost = 1000 
        document.getElementById("qicultivated").innerHTML = Qi + " Qi";
        document.getElementById("RebirthSystem").innerHTML = "Rebirth" + "(level" + RebirthStage + ")" + "Cost: " + RebirthCost + " Qi";
        document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + ManualAmount + ") Cost: " + ManualCost +" Qi";
        document.getElementById("PassiveGain").innerHTML = (ManualAmount + QiPerClick) + " Qi/s";
        document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + QiPerClick + ") Cost: " + QiPerClickCost + " Qi";
        document.getElementById("BreakthroughSystem").innerHTML = "Break through to next realm "+ "(Level " + BreakthroughStage + ")" + " Cost: " + BreakthroughCost + " Qi";
     }   
}

function PassiveQiGain() {
    Qi += (((ManualAmount + QiPerClick)*(BreakthroughStage*RebirthStage)));
    document.getElementById("qicultivated").innerHTML = Qi + " Qi"
    document.getElementById("PassiveGain").innerHTML = (((ManualAmount + QiPerClick)*(BreakthroughStage*RebirthStage))) + " Qi/s"
}

function Save() {
    var gamesave = {
        Qi: Qi,
        QiPerClick: QiPerClick,
        QiPerClickCost: QiPerClickCost,
        QiPerClickLevel: QiPerClickLevel,
        ManualAmount: ManualAmount,
        ManualCost: ManualCost,
        BreakthroughStage: BreakthroughStage,
        BreakthroughCost: BreakthroughCost,
        RebirthStage: RebirthStage,
        RebirthCost: RebirthCost
    }
    localStorage.setItem("SupahcultivatorSave", JSON.stringify(gamesave))
}

function resetData() {
    localStorage.removeItem("SupahcultivatorSave")
    location.reload()
}



function ShowTooltip() {
    
}

var mainGameLoop = window.setInterval(function() {
    PassiveQiGain() 
}, 1000)


var saveGameLoop = window.setInterval(function() {
    Save()
},30000)

function loadgame() {
    var savedgame = JSON.parse(localStorage.getItem("SupahcultivatorSave"))
    if (typeof savedgame.Qi !== "undefined") Qi = savedgame.Qi;
    if (typeof savedgame.QiPerClick !== "undefined") QiPerClick = savedgame.QiPerClick;
    if (typeof savedgame.QiPerClickCost!== "undefined") QiPerClickCost = savedgame.QiPerClickCost;
    if (typeof savedgame.ManualAmount !== "undefined") ManualAmount = savedgame.ManualAmount;
    if (typeof savedgame.ManualCost!== "undefined") ManualCost = savedgame.ManualCost;
    if (typeof savedgame.BreakthroughStage!== "undefined") BreakthroughStage = savedgame.BreakthroughStage;
    if (typeof savedgame.BreakthroughCost!== "undefined") BreakthroughCost= savedgame.BreakthroughCost;
    if (typeof savedgame.RebirthStage!== "undefined") RebirthStage = savedgame.RebirthStage;
    if (typeof savedgame.RebirthCost!== "undefined") RebirthCost= savedgame.RebirthCost;
    if (typeof savedgame.QiPerClickLevel!== "undefined") QiPerClickLevel= savedgame.QiPerClickLevel;
}

window.onload = function() {
    loadgame();
    document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + ManualAmount + ") Cost: " + ManualCost +" Qi";
    document.getElementById("PassiveGain").innerHTML = (ManualAmount + QiPerClick) + " Qi/s";
    document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + QiPerClickLevel + ") Cost: " + QiPerClickCost + " Qi";
    document.getElementById("BreakthroughSystem").innerHTML = "Break through to next realm "+ "(Level " + BreakthroughStage + ")" + " Cost: " + BreakthroughCost + " Qi";
    document.getElementById("qicultivated").innerHTML = Qi + " Qi";
    document.getElementById("RebirthSystem").innerHTML = "Rebirth" + "(level" + RebirthStage + ")" + "Cost: " + RebirthCost + " Qi";
}