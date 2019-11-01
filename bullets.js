class Bullet {
  constructor(ctx, playerPosX, playerPosY, playerPosY0, playerHeight) {
    this.ctx = ctx;
    this.posX = playerPosX;
    this.posY = playerPosY;
    this.playerPosY0 = playerPosY0;
    this.playerHeight = playerHeight;

    this.velX = 10;
    this.velY = 1;
    this.gravity = 0.25;
    this.radius = 5;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "tomato";
    this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.posX += this.velX;

    this.velY += this.gravity;
    this.posY += this.velY;

    if (this.posY >= this.playerPosY0 + this.playerHeight) {
      this.velY *= -1;
    }
  }
}
