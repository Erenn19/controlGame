import img from "./img.js";
import Player from "./Player.js";

let positionX = 600;


const canvas = document.getElementById("ark");
// document.body.append(canvas);
const ctx = canvas.getContext("2d");
  canvas.width = 9000 / 1.5;
  canvas.height = 2000 / 1.5;

const background = document.getElementById("background")
 const player = new Player();

function game() {
  ctx.drawImage(background, 0 ,0, 9000, 2000);
  player.draw(ctx , positionX);
  console.log(positionX);

}

window.onkeydown = function(action){

  if(action.keyCode == 37){               
     positionX = positionX - 10;
     console.log(positionX);        
  }
  else if(action.keyCode==39)
  {
    positionX = positionX +10;

  }

}



setInterval(game, 1000 / 60);