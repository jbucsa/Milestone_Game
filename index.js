//1:40:02

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

const background = new sprite({
    position: {
        x:0, y:0
    },
    imageScr: 'assets/img/background.png'
});

//Character properties and starting position
const player = new character ({
    position: {
        x: 50, y:0},
    velocity: {
        x:0, y:0
    },
    offset: {
        x: 0,
        y: 0
    }
});
//Enemy properties and starting position
const enemy = new character ({
    position: {
        x: 900, y: 0
    },
    velocity: {
        x:0, y:0
    },
    color: 'blue',
    colorAttachBox: 'white',
    offset: {
        x: -100,
        y: 0
    }
});


//Game keys
const keys = {
    //Player keys
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    A: {
        pressed: false
    },
    D: {
        pressed: false
    },
    W: {
        pressed: false
    },
    S: {
        pressed: false
    },
    //Player Attack Key
    ' ': {
        pressed: false
    },
    //Enemy Keys
    ArrowLeft: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },  
    ArrowRight: {
        pressed: false
    }, 
    ArrowUp: {
        pressed: false
    },
    //Enemy Attack Key
    Shift: {
        pressed: false
    },
};

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
// Set the initial countdown value
let timeJS = 60
let timerID

const element = document.getElementById('timerHTML');
timerID = setInterval(function() {
    if(timeJS >= 0)
    element.innerHTML =  timeJS--;
    }, 1000);

function determineWinner({player, enemy, timerID}) {
    clearInterval(timerID);
    document.getElementById("displayText").style.display = "flex";
    
    if (player.health === enemy.health){ 
    console.log('tie');
    document.getElementById("displayText").innerHTML = "Tie";};
    
    if (player.health > enemy.health){ 
    console.log('player wins');
    document.getElementById("displayText").innerHTML = "Player Wins";};

    if (player.health < enemy.health){ 
    console.log('enemy win');
    document.getElementById("displayText").innerHTML = "Enemy Wins";};
}

function winnerMessage(){
    if (timeJS === 0){
        determineWinner({player, enemy, timerID});
    };
}



//This is the animation loop!!!
function animate(){
    window.requestAnimationFrame(animate); 
    c.fillStyle = 'black'; //this overrides the c.fillStyle = 'red' in the "class character" 
    c.fillRect(0 , 0, canvas.width, canvas.height); //Means we are not drawing/resenting anything when we request this. This prevents the characters movement from framing ontop of itself repeatly. 
    background.update()
    player.update();
    enemy.update();

    //Default velocity of Characters
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //PLAYER MOVEMENT 
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -15;} 
    else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 15;}
    else if (keys.A.pressed && player.lastKey === 'A'){
        player.velocity.x = -15;} 
    else if (keys.D.pressed && player.lastKey === 'D'){
        player.velocity.x = 15;}

    //ENEMY MOVEMENT
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -15;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 15;
    }

    //X positions Limits
    if (keys.a.pressed && player.position.x <= 0){
        player.velocity.x = 0;
    }
    if (keys.A.pressed && player.position.x <= 0){
        player.velocity.x = 0;
    }
    if (keys.d.pressed && player.position.x >= 900){
        player.velocity.x = 0;
    }
    if (keys.D.pressed && player.position.x >= 900){
        player.velocity.x = 0;
    }
    if (keys.ArrowLeft.pressed && enemy.position.x <= 0){
        enemy.velocity.x = 0;
    }
    if (keys.ArrowRight.pressed && enemy.position.x >= 900){
        enemy.velocity.x = 0;
    }

    //Detect for Combat 
    if ( 
            combatZone({combatZone1: player, combatZone2: enemy}) 
            &&
            player.isAttacking
        )
        {
            player.isAttacking = false;
            enemy.health -= 5;
            const enemyHealthBar = document.getElementById(`enemyHealth`);
            if (enemyHealthBar) {
            enemyHealthBar.style.width = enemy.health + '%';
            }
        }
    if ( 
        combatZone({combatZone1: enemy, combatZone2: player}) 
        &&
        enemy.isAttacking
        )
        {    
            enemy.isAttacking = false;
            console.log('You fit like a 12 year who just found out Santa is not real');            
            enemy.isAttacking = false;
            player.health -= 5;
            const playerHealthBar = document.getElementById(`playerHealth`);
            if (playerHealthBar) {
            playerHealthBar.style.width = player.health + '%';
            }
        }  
    if (enemy.health == 0 || player.health == 0) {
        determineWinner({player, enemy, timerID});
        return;
    }
}


winnerMessage()
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key){
        //Player Movement Keys
        case 'd': 
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a': 
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w': 
            player.velocity.y = -10;
            break;
        case 's': 
            player.velocity.y = 10;
            break;
        case 'D': 
            keys.D.pressed = true;
            player.lastKey = 'D';
            break;
        case 'A': 
            keys.A.pressed = true;
            player.lastKey = 'A;'
            break;
        case 'W': 
            player.velocity.y = -10;
            break;
        case 'S': 
            player.velocity.y = 10;
            break;
        //Attack key for the Player
        case ' ':
            player.attack();
            break;

        //Enemy Movement Keys
        case 'ArrowRight': 
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp': 
            enemy.velocity.y = -10;
            break;
        case 'ArrowDown': 
            enemy.velocity.y = 10;
            break;
        //Enemy Attack Key
        case 'Shift':
            enemy.attack();
            break;        
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd': 
            keys.d.pressed = false;
            break;
        case 'a': 
            keys.a.pressed = false;
            break;
        case 'w': 
            keys.w.pressed = false;
            break;
        case 's': 
            keys.s.pressed = false;
            break;

        case 'D': 
            keys.D.pressed = false;
            break;
        case 'A': 
            keys.A.pressed = false;
            break;
        case 'W': 
            keys.W.pressed = false;
            break;
        case 'S': 
            keys.S.pressed = false;
            break;
        case 'ArrowRight': 
            keys.ArrowRight.pressed = false;
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp': 
            enemy.velocity.y = false;
            break;
        case 'ArrowDown': 
            enemy.velocity.y = false;
            break;
    }
})