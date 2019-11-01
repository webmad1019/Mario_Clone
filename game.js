const game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  score: 0,
  obstacles: [],
  scoreboard: undefined,
  keys: {
    TOPKEY: 38,
    SPACE: 32
  },

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.reset();
    scoreboard.init(this.ctx);
    game.start();
  },

  setDimensions() {
    this.width = window.innerWidth * 0.98;
    this.height = window.innerHeight * 0.98;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      if (this.framesCounter > 3000) {
        this.framesCounter = 0;
      }
      this.framesCounter++;
      this.score += 0.01;
      this.clear();
      this.drawAll();
      this.moveAll();
      this.generateObstacles();
      this.clearObstacles();
      if (this.isCollision()) {
        this.gameOver();
      }
    }, 1000 / this.FPS);
  },

  drawAll() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.obstacles.forEach(obs => {
      obs.draw();
    });
    this.drawScore();
  },

  moveAll() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(obs => {
      obs.move();
    });
  },

  reset() {
    this.obstacles = [];
    this.scoreboard = scoreboard;
    console.log(this.scoreboard);
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.width, this.height, this.keys);
  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  generateObstacles() {
    if (this.framesCounter % 90 == 0) {
      this.obstacles.push(new Obstacle(this.ctx, this.width, this.height, this.player.posY0, this.player.height));
      console.log(this.obstacles);
    }
  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.posX >= 0);
  },

  isCollision() {
    return this.obstacles.some(
      obs =>
        this.player.posX + this.player.width >= obs.posX &&
        this.player.posY + this.player.height >= obs.posY &&
        this.player.posX <= obs.posX + obs.width
    );
  },

  gameOver() {
    clearInterval(this.interval);
  },

  drawScore() {
    console.log(this.scoreboard, "puto error");
    this.scoreboard.update(this.score);
  }
};
