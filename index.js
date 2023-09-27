const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)

class character {
    constructor (position){
        this.position = position
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(
            this.position.x,
            this.position.y,
            50,
            150)
        

    }
}

const player = new character ({
    x: 0,
    y: 0
})

player.draw()