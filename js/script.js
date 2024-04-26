/*VARIABLES */

const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");

const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");

const checkpointMessage = document.querySelector(".checkpoint-screen > p");

const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 0.5;
let isCheckpointCollisionDetectionActive  = true;


const proportionalSize = (size) => {
    return  innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
}

class Player {
    constructor(){
        this.position = {
            x:proportionalSize(10),
            y:proportionalSize(400),
        };
        this.velocity = {
            x:0,
            y:0
        };
        this.width = proportionalSize(40);
        this.height = proportionalSize(40);
    };
    //Metodo encargado de la posicion y el color del player
    draw(){
       ctx.fillStyle = "#99c9ff";
       ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    };
    //Metodo encargado de actualizar la posicion y velocidad del del player a medida que se mueve
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if ((this.position.y+this.height+ this.velocity.y) <= canvas.height) {
            if(this.position.y < 0){
                this.position.y = 0;
                this.velocity.y = gravity;
            }
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
        }
        if(this.position.x < this.width){
            this.position.x = this.width;
        }
        if (this.position.x >= canvas.width - 2 * this.width) {
            this.position.x = canvas.width - 2 * this.width;
        }
    }
}


//Se crear una instancia de la clase 
const player = new Player();


//Funcion de movimiento del jugador

const animate = () =>{
    requestAnimationFrame(animate);
    ctx .clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
        player.velocity.x = 5;
    }else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)){
        player.velocity.x = -5;
    }else {
        player.velocity.x = 0;
    } 
}

//Letras a presionar
const keys = {
    rightKey:{
        pressed: false
    },
    leftKey:{
        pressed: false
    }
}

//Aplicar moviento al jugador
const movePlayer = (key,xVelocity, isPressed) =>{
    if (!isCheckpointCollisionDetectionActive) {
        player.velocity.x = 0;
        player.velocity.y = 0;
        return;
    }
    switch(key){
        case "ArrowLeft":
            keys.leftKey.pressed = isPressed;
            if (xVelocity === 0) {
                player.velocity.x = xVelocity;
            }
            player.velocity.x -= xVelocity;
        break
        
        case "ArrowUp":
        case " ":
        case "Spacebar":
            player.velocity.y -= 8;
        break
        
        case "ArrowRight":
            keys.rightKey.pressed = isPressed;
            if (xVelocity === 0) {
                player.velocity.x = xVelocity;
            }
            player.velocity.x += xVelocity ;
        break
    }
}


//Funcion para iniciar el juego
const startGame = () =>{
    canvas.style.display = "block";
    startScreen.style.display = "none";
    animate();
}

startBtn.addEventListener("click",startGame)


//Agregando  eventos para mover el jugador
//Evento para el boton Flecha abajo
window.addEventListener("keydown",({key})=>{
    movePlayer(key,8,true);
});
//Evento para la funcion Flecha arriba
window.addEventListener("keyup",({key})=>{
    movePlayer(key,0,false);
});