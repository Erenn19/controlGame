import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player {
  constructor() {
    this.state = PlayerStates.idle;
    this.#createAnimations();
    document.addEventListener("keydown", this.#keydown);
    document.addEventListener("keyup", this.#keyup);
  }
  
  draw(ctx , positionX) {
    this.#setState();
    const animation = this.animations.find((animation) =>
      animation.isFor(this.state)
    );

    const image = animation.getImage();
    let x = positionX;
    let y =   500;

    if (this.state == PlayerStates.slide) {
      y = 200;
    }

    ctx.drawImage(image, x, y);
  }

  #setState() {
    if (this.deadPressed) {
      this.state = PlayerStates.dead;
    } else if (this.slidePressed) {
      this.state = PlayerStates.slide;
    } else if (this.jumpPressed) {
      this.state = PlayerStates.jump;
    } else if (this.runPressed && this.rightPressed) {
      this.state = PlayerStates.run;
    } else if (this.rightPressed) {
      this.state = PlayerStates.walk;
    } else {
      this.state = PlayerStates.idle;
    }
  }

  #createAnimations() {
    this.idleAnimation = new SpriteAnimation(
      "Idle (?).png",
      9,
      6,
      PlayerStates.idle
    );
    this.walkAnimation = new SpriteAnimation(
      "Walk (?).png",
      10,
      6,
      PlayerStates.walk
    );

    this.runAnimation = new SpriteAnimation(
      "Run (?).png",
      8,
      6,
      PlayerStates.run
    );
    this.jumpAnimation = new SpriteAnimation(
      "Jump (?).png",
      10,
      6,
      PlayerStates.jump
    );

    this.slideAnimation = new SpriteAnimation(
      "Slide (?).png",
      10,
      4,
      PlayerStates.slide
    );
    this.deadAnimation = new SpriteAnimation(
      "Dead (?).png",
      10,
      10,
      PlayerStates.dead,
      true
    );

    this.animations = [
      this.idleAnimation,
      this.walkAnimation,
      this.runAnimation,
      this.jumpAnimation,
      this.deadAnimation,
      this.slideAnimation,
    ];
  }

    #keydown = async(event) => {
    switch (event.code) {
      case "ArrowRight":
        this.rightPressed = true;
        break;
      case "ArrowDown":
        this.slidePressed = true;
        break;
      case "ShiftLeft":
        this.runPressed = true;
        break;
      case "Space":
        this.jumpPressed = true;
        break;
        //öldürme time koyuldu
      case "KeyD":
        this.deadPressed = true;
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.reload();
        break;
      case "KeyR":
        this.deadPressed = false;
        this.deadAnimation.reset();
        break;
        case "ArrowLeft":
          this.rightPressed = true;
          break;
    }
  };

  #keyup = (event) => {
    switch (event.code) {
      case "ArrowRight":
        this.rightPressed = false;
        break;
      case "ArrowDown":
        this.slidePressed = false;
        break;
      case "ShiftLeft":
        this.runPressed = false;  
        break;
      case "Space":
        this.jumpPressed = false;
        break;
      case  "ArrowLeft":
        this.leftPressed = false;
        break;
    }
  };
}