const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)
  
const gravity = 0.2

const background = new sprite({
    position: {
        x:0, y:0
    },
    imageScr: 'assets/img/background.png'
});

const shop = new sprite({
    position: {
        x:550, y:128
    },
    imageScr: 'assets/img/shop.png',
    scale: 2.75 ,
    framesMax: 6,
});


//Character properties and starting position
const player = new character ({ 
    position: {
        x: 100, y:0},
    velocity: {
        x:0, y:0
    },
    offset: {
        x: 50,
        y: 0
    },
    imageScr: 'assets/img/playerImage/Idle.png',
    framesMax: 8,
    framesHold : 4,
    scale: 2.5,
    offsetFrame: {
        x: 215, y:155
    }, 
    attackBox: {
        offset:{
            x: 50,
            y: 50,
        },
        width: 100,
        height: 50,},
    sprites: {
    idle: {
        imageScr: 'assets/img/playerImage/Idle.png',
        framesMax: 8, 
    },
    run: {
        imageScr: 'assets/img/playerImage/Run.png',
        framesMax: 8, 
    },
    fall: {
        imageScr: 'assets/img/playerImage/Fall.png',
        framesMax: 2, 
    },
    jump: {
        imageScr: 'assets/img/playerImage/Jump.png',
        framesMax: 2,  
    },
    death: {
        imageScr: 'assets/img/playerImage/Death.png',
        framesMax: 6, 
    },    
    takeHit: {
        imageScr: 'assets/img/playerImage/TakeHit.png',
        framesMax: 4, 
    },    
    takeHitWhite: {
        imageScr: 'assets/img/playerImage/TakeHitWhite.png',
        framesMax: 4, 
    },    
    attack1: {
        imageScr: 'assets/img/playerImage/Attack1.png',
        framesMax: 7,    
  
    },
    attack2: {
        imageScr: 'assets/img/playerImage/Attack2.png',
        framesMax: 6, 
    },
},}
);

//Enemy properties and starting position
const enemy = new character ({
    position: {
        x: 900, y: 0
    },
    velocity: {
        x:0, y:0
    },
    // color: 'blue',
    // colorAttachBox: 'white',
    offset: {
        x: -50,
        y: 0,
    },
    imageScr: 'assets/img/enemyImage/Idle.png',
    framesMax: 4,
    framesHold : 6,
    scale: 2.5,
    offsetFrame: {
        x: 215, y:170
    },
    attackBox: {
        offset:{
            x: -125,
            y: 100,
        },
        width: 125,
        height: 50,},
    sprites: {
        idle: {
            imageScr: 'assets/img/enemyImage/Idle.png',
            framesMax: 4, 
        },
        run: {
            imageScr: 'assets/img/enemyImage/Run.png',
            framesMax: 8, 
        },
        fall: {
            imageScr: 'assets/img/enemyImage/Fall.png',
            framesMax: 2, 
        },
        jump: {
            imageScr: 'assets/img/enemyImage/Jump.png',
            framesMax: 2, 
        },
        fall: {
            imageScr: 'assets/img/enemyImage/Fall.png',
            framesMax: 2, 
        },
        death: {
            imageScr: 'assets/img/enemyImage/Death.png',
            framesMax: 7, 
        },    
        takeHit: {
            imageScr: 'assets/img/enemyImage/TakeHit.png',
            framesMax: 3, 
        },    
        takeHitWhite: {
            imageScr: 'assets/img/enemyImage/TakeHitWhite.png',
            framesMax: 3, 
        },    
        attack1: {
            imageScr: 'assets/img/enemyImage/Attack1.png',
            framesMax: 4, 
        },
        attack2: {
            imageScr: 'assets/img/enemyImage/Attack2.png',
            framesMax: 4, 
        },
    },
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
    '/': {
        pressed: false
    },
    '/': {
        pressed: false
    },
};






//This is the animation loop!!!
function animate(){
    window.requestAnimationFrame(animate); 
    c.fillStyle = 'black'; //this overrides the c.fillStyle = 'red' in the "class character" 
    c.fillRect(0 , 0, canvas.width, canvas.height); //Means we are not drawing/resenting anything when we request this. This prevents the characters movement from framing ontop of itself repeatly. 
    
    //This shows the order in which objects are animated on top of each other. 
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.20';
    c.fillRect( 0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    //Default velocity of Characters
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //PLAYER MOVEMENT 
    player.switchSprite('idle')
    player.framesMax = player.sprites.idle.framesMax
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -15;
        player.switchSprite('run');} 
    else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 15;
        player.switchSprite('run');}
    else if (keys.A.pressed && player.lastKey === 'A'){
        player.velocity.x = -15;
        player.switchSprite('run');} 
    else if (keys.D.pressed && player.lastKey === 'D'){
        player.velocity.x = 15;
        player.switchSprite('run');}
    else {
        player.switchSprite('idle')
    }

    if (player.velocity.y < 0 ){
        player.switchSprite('jump');
    } else if (player.velocity.y > 0){
        player.switchSprite('fall');}

    

    //ENEMY MOVEMENT
    enemy.image = enemy.sprites.idle.image
    enemy.framesMax = enemy.sprites.idle.framesMax
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -15;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 15;
        enemy.switchSprite('run');
    }
    else {
        enemy.switchSprite('idle')
    }

    if (enemy.velocity.y < 0){
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0){
        enemy.switchSprite('fall');}


    //X positions Limits
    if (keys.a.pressed && player.position.x <= 50){
        player.velocity.x = 0;
    }
    if (keys.A.pressed && player.position.x <= 50){
        player.velocity.x = 0;
    }
    if (keys.d.pressed && player.position.x >= 950){
        player.velocity.x = 0;
    }
    if (keys.D.pressed && player.position.x >= 950){
        player.velocity.x = 0;
    }
    if (keys.ArrowLeft.pressed && enemy.position.x <= 50){
        enemy.velocity.x = 0;
    }
    if (keys.ArrowRight.pressed && enemy.position.x >= 950){
        enemy.velocity.x = 0;
    }

    //Detect for Combat & receive
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
            player.velocity.y = -5;
            break;
        case 's': 
            player.velocity.y = 5;
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
            player.velocity.y = -5;
            break;
        case 'S': 
            player.velocity.y = 5;
            break;
        //Attack key for the Player
        case ' ':
            player.attack();
            break;
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
            enemy.velocity.y = -5;
            break;
        case 'ArrowDown': 
            enemy.velocity.y = 5;
            break;
        //Enemy Attack Key
        case '/':
            enemy.attack();
            break; 
        case '/':
            enemy.attack();
            break;        
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd': 
            keys.d.pressed = false;
            player.lastKey = 'd'
            break;
        case 'a': 
            keys.a.pressed = false;
            player.lastKey = 'a'
            break;
        case 'w': 
            keys.w.pressed = false;
            player.lastKey = 'w'
            break;
        case 's': 
            keys.s.pressed = false;
            player.lastKey = 's'
            break;
        case 'D': 
            keys.D.pressed = false;
            player.lastKey = 'D'
            break;
        case 'A': 
            keys.A.pressed = false;
            player.lastKey = 'A'
            break;
        case 'W': 
            keys.W.pressed = false;
            player.lastKey = 'W'
            break;
        case 'S': 
            keys.S.pressed = false;
            player.lastKey = 'S'
            break;
        case ' ': 
            keys.Space.pressed = false;
            player.lastKey = ' '
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
        case '/': 
            keys.Dash.pressed = false;
            enemy.lastKey = '/'
            break;

    }
})