//This file contains all the utily functions called out in the index.js and index.html file

//Combat Zone - This is where battles are won and enemies are destroyed
//combatZone is just rectangles but sounds cooler. 
function combatZone ({combatZone1, combatZone2}){
    return (
        combatZone1.attackBox.position.x + combatZone1.attackBox.width >= combatZone2.position.x 
        && 
        combatZone1.attackBox.position.x <= combatZone2.position.x + combatZone2.width
        &&
        combatZone1.attackBox.position.y + combatZone1.attackBox.height >= combatZone2.position.y
        &&
        combatZone1.attackBox.position.y <= combatZone2.position.y + combatZone2.height
        );
    }

//Timer    
// Set the initial countdown value that is seen in the index.html file
let timeJS = 60;
let timerID
const element = document.getElementById('timerHTML');
timerID = setInterval(function() {
    if(timeJS >= 0)
    element.innerHTML =  timeJS--;
    winnerMessage(timeJS)
    }, 1000);

function winnerMessage(timeJS){
        if (timeJS == -1){
            determineWinner({player, enemy});
        };
    }
    


function determineWinner({player, enemy, timerID}) {
    clearInterval(timerID);
    document.getElementById("displayText").style.display = "flex";
    document.getElementById("restartButton").style.display = "flex"

    if (player.health === enemy.health){ 
    document.getElementById("displayText").innerHTML = "Tie";};

    if (player.health > enemy.health){ 
    document.getElementById("displayText").innerHTML = "Player Wins";};

    if (player.health < enemy.health){ 
    document.getElementById("displayText").innerHTML = "Enemy Wins";};
}

