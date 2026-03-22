const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// jogador
const player = {
  x: 50,
  y: 200,
  w: 40,
  h: 40,
  vx: 0,
  vy: 0,
  jumping: false
};

const gravity = 0.6;

// plataformas
const platforms = [
  { x: 0, y: canvas.height - 50, w: canvas.width, h: 50 },
  { x: 200, y: canvas.height - 120, w: 120, h: 20 },
  { x: 400, y: canvas.height - 180, w: 120, h: 20 }
];

// controles touch
let moveLeft = false;
let moveRight = false;
let jump = false;

document.getElementById("left").ontouchstart = () => moveLeft = true;
document.getElementById("left").ontouchend = () => moveLeft = false;

document.getElementById("right").ontouchstart = () => moveRight = true;
document.getElementById("right").ontouchend = () => moveRight = false;

document.getElementById("jump").ontouchstart = () => jump = true;
document.getElementById("jump").ontouchend = () => jump = false;

function update() {
  // movimento
  if (moveRight) player.vx = 4;
  else if (moveLeft) player.vx = -4;
  else player.vx = 0;

  // pulo
  if (jump && !player.jumping) {
    player.vy = -12;
    player.jumping = true;
  }

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  // colisão
  platforms.forEach(p => {
    if (
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      player.y < p.y + p.h &&
      player.y + player.h > p.y
    ) {
      if (player.vy > 0) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.jumping = false;
      }
    }
  });

  // reset
  if (player.y > canvas.height) {
    player.x = 50;
    player.y = 200;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  platforms.forEach(p => {
    ctx.fillRect(p.x, p.y, p.w, p.h);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
