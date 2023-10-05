



//Class for Images
class sprite {
    constructor ({position, imageScr}){
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageScr
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
   
    update(){
        this.draw()

    }

  
}




//Class for Characters
class character {
    constructor ({position, velocity, color = 'red', colorAttachBox = 'yellow', offset}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey = null; // Initialize lastKey to null
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: offset,
            width: 155,
            height: 35,
        };
        this.health = 100;
        this.color = color;
        this.colorAttachBox = colorAttachBox;
        this.isAttacking = false; // Initialize isAttacking to false
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        //Attack Box
        if (this.isAttacking) {
            c.fillStyle = this.colorAttachBox;
            c.fillRect (
              this.attackBox.position.x,
              this.attackBox.position.y,
              this.attackBox.width,
              this.attackBox.height)
        }
    }
   
    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y; // same as saying "this.position.y = this
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }

    attack(){
        this.isAttacking = true;
        setTimeout (() => {
            this.isAttacking = false;
        }, 100);
    }
}
