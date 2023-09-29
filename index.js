const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5

class character {
    constructor ({position, velocity, color = 'red', colorAttachBox = 'yellow'}){
        this.position = position,
        this.velocity = velocity,
        this.width = 50
        this.height = 150,
        this.lastKey
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        },
        this.color = color,
        this.colorAttachBox = colorAttachBox
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
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y // same as saying "this.position.y = this
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

const player = new character ({
    position: {
        x: 50, y:0},
    velocity: {
        x:0, y:0
    }})

player.draw() //Shows player-character onscreen 

const enemy = new character ({
    position: {
        x: 400, y: 0
    },
    velocity: {
        x:0, y:0
    },
    color: 'blue',
    colorAttachBox: 'white'
})

enemy.draw() //Shows enemy-character onscreen 

console.log(player)

const keys = {
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
    ArrowLeft: {
        press: false
    },
    ArrowDown: {
        press: false
    },  
    ArrowRight: {
        press: false
    }, 
    ArrowUp: {
        press: false
    }
}

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
        player.velocity.x = -15
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 15
    }

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
    if (keys.d.pressed && player.position.x >= 900){
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
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x 
        && 
        player.attackBox.position.x <= enemy.position.x + enemy.width
        &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y
        &&
        player.attackBox.position.y <= enemy.position.y + enemy.height)
        {
            console.log('hit')
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
            keys.w.pressed = false
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