const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 120;

// PLAYER
const player = {
    x: 100,
    y: 0,
    width: 50,
    height: 50,
    color: "#ff5555",
    dy: 0,
    gravity: 0.8,
    jumpPower: -15,
    grounded: false,
    crouching: false
};
player.y = canvas.height - player.height - 20;

// OBSTACLES
const obstacles = [];
const flyingObstacles = [];
let spawnTimer = 0;
let spawnFlyingTimer = 0;

// CLOUDS
const clouds = [];
for(let i=0;i<6;i++){
    clouds.push({x: Math.random()*canvas.width, y: Math.random()*150, width: 100+Math.random()*80, height: 50+Math.random()*40, speed: 0.5+Math.random()});
}

// SCORE
let score = 0;

// INPUT
const keys = {};
document.addEventListener("keydown", e=>keys[e.code]=true);
document.addEventListener("keyup", e=>keys[e.code]=false);

// OVERLAY
const overlay = document.getElementById("overlay");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
overlay.style.display = "none";
let gameOver = false;

restartBtn.onclick = () => { location.reload(); };

// Adjusted pillar heights
function spawnObstacle() {
    const height = 50 + Math.random()*60; // Lower than before
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height - 20,
        width: 40,
        height: height,
        color: "#222"
    });
}

function spawnFlyingObstacle() {
    const width = 80 + Math.random()*40;
    const height = 20 + Math.random()*20;
    flyingObstacles.push({
        x: canvas.width,
        y: 150 + Math.random()*120, // lower so crouch works
        width: width,
        height: height,
        color: "#000"
    });
}

function drawCloud(c){
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.width/2, c.height/2, 0, 0, Math.PI*2);
    ctx.fill();
}

function update(){
    if(gameOver) return;

    clouds.forEach(c=>{ c.x -= c.speed; if(c.x + c.width < 0) c.x = canvas.width; });

    // Player crouch/jump
    player.crouching = keys["ArrowDown"];
    if((keys["ArrowUp"] || keys["Space"]) && player.grounded && !player.crouching){
        player.dy = player.jumpPower;
        player.grounded = false;
    }

    player.dy += player.crouching? player.gravity*1.5 : player.gravity;
    player.y += player.dy;

    const ground = canvas.height - (player.crouching? player.height*0.5 : player.height) - 20;
    if(player.y > ground){ player.y = ground; player.dy = 0; player.grounded = true; }

    // Spawn obstacles
    spawnTimer++; if(spawnTimer > 90){ spawnObstacle(); spawnTimer = 0; }
    spawnFlyingTimer++; if(spawnFlyingTimer > 200){ spawnFlyingObstacle(); spawnFlyingTimer = 0; }

    obstacles.forEach((obs,i)=>{ obs.x -= 6; if(obs.x + obs.width < 0) obstacles.splice(i,1); });
    flyingObstacles.forEach((f,i)=>{ f.x -= 6; if(f.x + f.width < 0) flyingObstacles.splice(i,1); });

    // Collision
    const playerBox = { x: player.x, y: player.y, width: player.width, height: player.crouching?player.height*0.5:player.height };
    for(const obs of obstacles){
        if(playerBox.x < obs.x+obs.width && playerBox.x+playerBox.width > obs.x &&
           playerBox.y < obs.y+obs.height && playerBox.y+playerBox.height > obs.y){
            gameOver = true;
            overlay.style.display = "flex";
            finalScore.innerText = "Score: "+score;
        }
    }
    for(const f of flyingObstacles){
        if(playerBox.x < f.x+f.width && playerBox.x+playerBox.width > f.x &&
           playerBox.y < f.y+f.height && playerBox.y+playerBox.height > f.y){
            if(!player.crouching){
                gameOver = true;
                overlay.style.display = "flex";
                finalScore.innerText = "Score: "+score;
            }
        }
    }

    // Update score live
    document.getElementById("score").innerText = "Score: "+score;
    score++;
}

function draw(){
    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    clouds.forEach(c=>drawCloud(c));

    ctx.fillStyle = "#3cb043";
    ctx.fillRect(0,canvas.height-20,canvas.width,20);

    obstacles.forEach(o=>{ ctx.fillStyle = o.color; ctx.fillRect(o.x,o.y,o.width,o.height); });
    flyingObstacles.forEach(f=>{ ctx.fillStyle = f.color; ctx.fillRect(f.x,f.y,f.width,f.height); });

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x,player.y,player.width,player.crouching?player.height*0.5:player.height);

    // Face
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x+10,player.y+10,8,8);
    ctx.fillRect(player.x+player.width-18,player.y+10,8,8);
    ctx.fillStyle = "#000";
    ctx.fillRect(player.x+12,player.y+20,player.width-24,4);
}

function loop(){ update(); draw(); if(!gameOver) requestAnimationFrame(loop); }
loop();

window.addEventListener("resize",()=>{ canvas.width = window.innerWidth; canvas.height = window.innerHeight - 120; player.y = canvas.height - player.height - 20; });
