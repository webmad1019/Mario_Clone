class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;
    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 100;
    this.height = 100;

    this.posY0 = this.gameHeight - this.height - 20;
    this.posX = 20;
    this.posY = this.gameHeight - this.height - 20;

    this.velY = 1;

    this.image = new Image();
    this.image.src = "./img/player.png";

    this.image.frames = 3;
    this.image.framesIndex = 0;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
      0,
      Math.floor(this.image.width / this.image.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    this.animate(framesCounter);

    this.bullets.forEach(bullet => bullet.draw());
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
      if (this.image.framesIndex > this.image.frames - 1) {
        this.image.framesIndex = 0;
      }
    }
  }

  move() {
    let gravity = 0.4;
    if (this.posY >= this.posY0) {
      this.velY = 1;
      this.posY = this.posY0;
    } else {
      this.posY += this.velY;
      this.velY += gravity;
    }

    this.bullets.forEach(bullet => bullet.move());
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.keys.TOPKEY:
          if (this.posY >= this.posY0) {
            this.posY -= 30;
            this.velY -= 9;
          }
          break;
        case this.keys.SPACE:
          this.shoot();
          break;
      }
    });
  }

  shoot() {
    this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height));
  }
}
