const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

class character {
    constructor ({position, velocity, color = 'red', colorAttachBox = 'yellow', offset}){
        this.position = position,
        this.velocity = velocity,
        this.width = 50,
        this.height = 150,
        this.lastKey,
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: offset,
            width: 155,
            height: 35,
        },
        this.color = color,
        this.colorAttachBox = colorAttachBox,
        this.isAttacking = false
    }

    draw(){
        c.fillStyle = this.color,
        c.fillRect(
            this.position.x, this.position.y, this.width, this.height),
        
            //Attack Box
        c.fillStyle = this.colorAttachBox
        c.fillRect(
            this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
    
    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y // same as saying "this.position.y = this
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack(){
        this.isAttacking = true
        setTimeout (() => {
            this.isAttacking = false
        }, 100)
    }
}

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
})

player.draw() //Shows player-character onscreen 

const enemy = new character ({
    position: {
        x: 400, y: 0
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
})

enemy.draw() //Shows enemy-character onscreen 

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
    }
}

//Combat Zone - This is where battles are won and enemies are destroyed
//combatZone is just rectangles but sounds cooler. 
function combatZone ({combatZone1, combatZone2})
    {
    return (combatZone1.attackBox.position.x + combatZone1.attackBox.width >= combatZone2.position.x 
    && 
    combatZone1.attackBox.position.x <= combatZone2.position.x + combatZone2.width
    &&
    combatZone1.attackBox.position.y + combatZone1.attackBox.height >= combatZone2.position.y
    &&
    combatZone1.attackBox.position.y <= combatZone2.position.y + combatZone2.height
)}


function animate(){
    window.requestAnimationFrame(animate) 
    c.fillStyle = 'black' //this overrides the c.fillStyle = 'red' in the "class character" 
    c.fillRect(0 , 0, canvas.width, canvas.height) //Means we are not drawing/resenting anything when we request this. This prevents the characters movement from framing ontop of itself repeatly. 
    player.update()
    enemy.update() 

    //Default velocity of Characters
    player.velocity.x = 0
    enemy.velocity.x = 0

    //PLAYER MOVEMENT 
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -15} 
    else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 15}
    else if (keys.A.pressed && player.lastKey === 'A'){
        player.velocity.x = -15} 
    else if (keys.D.pressed && player.lastKey === 'D'){
        player.velocity.x = 15}


    //ENEMY MOVEMENT
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -15
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 15
    }

    //X positions Limits
    if (keys.a.pressed && player.position.x <= 0){
        player.velocity.x = 0
    }
    if (keys.A.pressed && player.position.x <= 0){
        player.velocity.x = 0
    }
    if (keys.d.pressed && player.position.x >= 900){
        player.velocity.x = 0
    }
    if (keys.D.pressed && player.position.x >= 900){
        player.velocity.x = 0
    }
    if (keys.ArrowLeft.pressed && enemy.position.x <= 0){
        enemy.velocity.x = 0
    }
    if (keys.ArrowRight.pressed && enemy.position.x >= 900){
        enemy.velocity.x = 0
    }

    // //Y Position Limits
    // if (keys.s.pressed && player.position.y >= 576){
    //     player.velocity.y = 0, player.position.y = 576
    // }

    //Detect for Collision Between Players
    // if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x 
    //     && 
    //     player.attackBox.position.x <= enemy.position.x + enemy.width
    //     &&
    //     player.attackBox.position.y + player.attackBox.height >= enemy.position.y
    //     &&
    //     player.attackBox.position.y <= enemy.position.y + enemy.height
    //     &&
    //     player.isAttacking)
    if ( 
            combatZone({
                combatZone1: player,
                combatZone2: enemy
                }) 
            &&
            player.isAttacking
        )
        {
            player.isAttacking = false
            console.log('hit')
        }
    if ( 
        combatZone({
            combatZone1: enemy,
            combatZone2: player
            }) 
        &&
        enemy.isAttacking
        )
        { 
            enemy.isAttacking = false
            console.log('You fit like a 12 year who just found out Santa is not real')
        }
    }
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'd': 
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a': 
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w': 
            player.velocity.y = -10
            break
        case 's': 
            player.velocity.y = 10
            break

        case 'D': 
            keys.D.pressed = true
            player.lastKey = 'D'
            break
        case 'A': 
            keys.A.pressed = true
            player.lastKey = 'A'
            break
        case 'W': 
            player.velocity.y = -10
            break
        case 'S': 
            player.velocity.y = 10
            break


        //Attack key for the Player
        case ' ':
            player.attack()
            break

        case 'ArrowRight': 
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp': 
            enemy.velocity.y = -10
            break
        case 'ArrowDown': 
            enemy.velocity.y = 10
            break
        case 'Shift':
            enemy.isAttacking = true
            break
            
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd': 
            keys.d.pressed = false
            break
        case 'a': 
            keys.a.pressed = false
            break
        case 'w': 
            keys.w.pressed = false
            break
        case 's': 
            keys.s.pressed = false
            break

        case 'D': 
            keys.D.pressed = false
            break
        case 'A': 
            keys.A.pressed = false
            break
        case 'W': 
            keys.W.pressed = false
            break
        case 'S': 
            keys.S.pressed = false
            break







        case 'ArrowRight': 
            keys.ArrowRight.pressed = false
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp': 
            enemy.velocity.y = false
            break
        case 'ArrowDown': 
            enemy.velocity.y = false
            break
    }
    console.log(event.key);
})