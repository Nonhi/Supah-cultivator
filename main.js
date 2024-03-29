
var Qi = 0
var QiPerClick = 10
var QiPerClickLevel = 0
var QiPerClickCost = 10
var ManualAmount = 0
var ManualCost = 4
var BreakthroughStage = 1
var BreakthroughCost = 1000 
var BreakthroughMult = 1
var RebirthCost = 10000
var RebirthStage = 1
var lastTick = Date.now()
var Health = 100
var Attack = 50
var Soulshards = 0
//var SectName = prompt("Enter sect name")
//var FirstName = prompt("Enter first name")
//var LastName = prompt("Enter last name")


var Thug = {
    Hp: 50,
    Soulshard:1
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}




   

function fightThug() {
    Thug.Hp -= Attack
    if (Thug.Hp <= 0) {
        Soulshards += Thug.Soulshard
        document.getElementById("Soulshards").innerHTML = Soulshards + " soulshards"
    } 
}

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
        document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + (ManualAmount/RebirthStage)+ ") Cost: " + ManualCost +" Qi"

    }
}

function buyIbumetin() {
    if (Soulshards >= 10) {
        Soulshards -= 10;
        Attack += 1;
        document.getElementById("Attack").innerHTML = "Attack: " + Attack;
        document.getElementById("Soulshards").innerHTML = Soulshards + " soulshards"
    }
}

function Breakthrough() {
    if (Qi >= BreakthroughCost) {
        Qi -= BreakthroughCost
        BreakthroughStage += 1
        BreakthroughMult += (1*RebirthStage)
        BreakthroughCost *= 2
        document.getElementById("qicultivated").innerHTML = Qi + " Qi"
        document.getElementById("BreakthroughSystem").innerHTML = "Break through to next realm (Level "+ (BreakthroughStage) + ") Cost: " + BreakthroughCost + " Qi"
        document.getElementById("Realm").innerHTML = "Realm: " + BreakthroughStage

    }
}

function Rebirth() {
    if (Qi >= RebirthCost) {
        Qi -= RebirthCost;
        RebirthStage += 1;
        RebirthCost *=2.5;
        Qi = 0
        QiPerClick = 10
        QiPerClickCost = 10
        QiPerClickLevel = 0
        ManualAmount = 0
        ManualCost = 4
        BreakthroughStage = 1
        BreakthroughMult = 1
        BreakthroughCost = 1000 
        document.getElementById("qicultivated").innerHTML = Qi + " Qi";
        document.getElementById("RebirthSystem").innerHTML = "Rebirth" + " (level " + RebirthStage + ") Cost: " + RebirthCost + " Qi";
        document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + ManualAmount + ") Cost: " + ManualCost +" Qi";
        document.getElementById("PassiveGain").innerHTML = (ManualAmount + QiPerClick) + " Qi/s";
        document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + QiPerClickLevel + ") Cost: " + QiPerClickCost + " Qi";
        document.getElementById("BreakthroughSystem").innerHTML = "Break through to next realm "+ "(Level " + BreakthroughStage + ")" + " Cost: " + BreakthroughCost + " Qi";
     }   
}

function PassiveQiGain() {
    Qi += (ManualAmount + QiPerClick);
    document.getElementById("qicultivated").innerHTML = Qi + " Qi"
    document.getElementById("PassiveGain").innerHTML = (ManualAmount + QiPerClick) + " Qi/s"
}

function OfflineQiGain() {
    diff = Date.now() - lastTick;
    lastTick = Date.now();
    Qi += Math.round((ManualAmount + QiPerClick)*diff)
    document.getElementById("qicultivated").innerHTML = Qi + " Qi"
}

function tab(tab) {
    document.getElementById("cultivateMenu").style.display = "none";
    document.getElementById("shopMenu").style.display = "none";
    document.getElementById("combatMenu").style.display = "none";
    document.getElementById("statsMenu").style.display = "none";
    document.getElementById(tab).style.display = "inline-block";
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
        BreakthroughMult: BreakthroughMult,
        BreakthroughCost: BreakthroughCost,
        RebirthStage: RebirthStage,
        RebirthCost: RebirthCost, 
        Health: Health,
        Attack: Attack,
        Soulshards:Soulshards 
    }
    localStorage.setItem("SupahcultivatorSave", JSON.stringify(gamesave))
}

function resetData() {
    localStorage.removeItem("SupahcultivatorSave")
    location.reload()
    tab("cultivateMenu");
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
    if (typeof savedgame.lastTick !== "undefined") lastTick = savedgame.lastTick;
    if (typeof savedgame.BreakthroughMult !== "undefined") BreakthroughMult = savedgame.BreakthroughMult;
    if (typeof savedgame.Attack !== "undefined") Attack = savedgame.Attack;
    if (typeof savedgame.Health !== "undefined") Health = savedgame.Health;
    if (typeof savedgame.Soulshards !== "undefined") Soulshards = savedgame.Soulshards;
    if (typeof savedgame.FirstName !== "undefined") FirstName = savedgame.FirstName;
    if (typeof savedgame.LastName !== "undefined") LastName = savedgame.LastName;
}

window.onload = function() {
    document.getElementById("Name").innerHTML = FirstName + " " + LastName;
    loadgame();
    OfflineQiGain()
    tab("cultivateMenu");
    document.getElementById("ManualUpgrade").innerHTML = "Buy cultivation manual (Level " + (ManualAmount/RebirthStage) + ") Cost: " + ManualCost +" Qi";
    document.getElementById("PassiveGain").innerHTML = (ManualAmount + QiPerClick) + " Qi/s";
    document.getElementById("perClickUpgrade").innerHTML = "Strenghten soul realm (Level " + QiPerClickLevel + ") Cost: " + QiPerClickCost + " Qi";
    document.getElementById("BreakthroughSystem").innerHTML = "Break through to next realm "+ "(Level " + (BreakthroughStage) + ")" + " Cost: " + BreakthroughCost + " Qi";
    document.getElementById("qicultivated").innerHTML = Qi + " Qi";
    document.getElementById("RebirthSystem").innerHTML = "Rebirth" + "(level" + RebirthStage + ")" + "Cost: " + RebirthCost + " Qi";
    document.getElementById("Health").innerHTML = "Health: " + Health;
    document.getElementById("Attack").innerHTML = "Attack: " + Attack;
    document.getElementById("Soulshards").innerHTML = Soulshards + " soulshards";
    document.getElementById("Realm").innerHTML = "Realm: " + BreakthroughStage;
    
}