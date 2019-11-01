class Obstacle {
  constructor(ctx, gameWidth, gameHeight, playerPosY0, playerHeight) {
    this.ctx = ctx;
    this.width = 14;
    this.height = this.width * 3;

    this.velX = 10;

    this.posX = gameWidth;
    this.posY = playerPosY0 + playerHeight - this.height - 5;
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.velX;
  }
}
