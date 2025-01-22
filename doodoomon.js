// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player's square properties
let player = {
    x: 50,
    y: 50,
    size: 30,
    color: 'green',
    speed: 5
};

// Enemy square properties
let enemy = {
    x: 400,
    y: 300,
    size: 30,
    color: 'red',
};

// Game state
let isInBattle = false;

// Handle key presses for movement
let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update the player's position based on key presses
function updatePlayerPosition() {
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
}

// Check for collision between player and enemy
function checkCollision() {
    return (
        player.x < enemy.x + enemy.size &&
        player.x + player.size > enemy.x &&
        player.y < enemy.y + enemy.size &&
        player.y + player.size > enemy.y
    );
}

// Draw the player, enemy, and background
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

    // Check for battle
    if (checkCollision() && !isInBattle) {
        isInBattle = true;
        alert('A wild enemy Doodoomon has appeared! Battle starts!');
    }

    if (isInBattle) {
        ctx.font = '24px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('In Battle with Doodoomon!', 300, 50);
    }
}

// Main game loop
function gameLoop() {
    updatePlayerPosition();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
