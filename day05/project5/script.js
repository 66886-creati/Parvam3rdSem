const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 100,
  y: 250,
  radius: 15,
  speed: 4,
  color: 'lime'
};

const enemy = {
  x: 700,
  y: 250,
  radius: 15,
  speed: 2,
  color: 'red'
};

let bullets = [];

const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const targetX = e.clientX - rect.left;
  const targetY = e.clientY - rect.top;

  const angle = Math.atan2(targetY - player.y, targetX - player.x);

  bullets.push({
    x: player.x,
    y: player.y,
    dx: Math.cos(angle) * 6,
    dy: Math.sin(angle) * 6
  });
});

function movePlayer() {
  if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
  if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
  if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
  if (keys['ArrowRight'] || keys['d']) player.x += player.speed;

  // Clamp inside canvas
  player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
}

function moveEnemy() {
  // Simple AI: random vertical movement
  enemy.y += (Math.random() - 0.5) * enemy.speed * 2;

  // Clamp
  enemy.y = Math.max(enemy.radius, Math.min(canvas.height - enemy.radius, enemy.y));
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player and enemy
  drawCircle(player.x, player.y, player.radius, player.color);
  drawCircle(enemy.x, enemy.y, enemy.radius, enemy.color);

  // Draw bullets
  bullets.forEach((bullet, i) => {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    drawCircle(bullet.x, bullet.y, 5, 'yellow');

    // Remove bullets off canvas
    if (
      bullet.x < 0 || bullet.x > canvas.width ||
      bullet.y < 0 || bullet.y > canvas.height
    ) {
      bullets.splice(i, 1);
    }

    // Check collision with enemy
    const dx = bullet.x - enemy.x;
    const dy = bullet.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < enemy.radius) {
      bullets.splice(i, 1);
      respawnEnemy();
    }
  });
}

function respawnEnemy() {
  enemy.x = 700;
  enemy.y = Math.random() * (canvas.height - 30) + 15;
}

function update() {
  movePlayer();
  moveEnemy();
  draw();
  requestAnimationFrame(update);
}

update();
