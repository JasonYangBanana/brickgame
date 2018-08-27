const cvs = document.getElementById('breakGame');
const ctx = cvs.getContext('2d');
let x = cvs.width / 2;
let y = cvs.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let color = "#000000";

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (cvs.width - paddleWidth) / 2;

let pressRight = false;
let pressLeft = false;

let brickRowCount = 8;
let brickColumnCount = 7;
let brickWidth = 60;
let brickHeight = 25;
let brickPadding = 0;
let brickOffsetTop = 30;
let brickOffsetLeft = 40;

let bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

let score = 0;
let lives = 3;

//角度換弧度
function getRads(degrees) {
    return (Math.PI * degrees) / 180;
};
//弧度換角度
function getDegrees(rads) {
    return (rads * 180) / Math.PI;
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //左弧
    ctx.beginPath();
    ctx.arc(x - 12.5, y, 10, getRads(-50), getRads(50), false);
    ctx.stroke();
    ctx.closePath();
    //右弧
    ctx.beginPath();
    ctx.arc(x + 12.5, y, 10, getRads(130), getRads(230), false);
    ctx.stroke();
    ctx.closePath();
    //直線
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + 10, y);
    ctx.stroke();
    ctx.closePath();
};
/* 動球 */
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives()
    drawBricks();
    collisionDetection();
    /* 碰撞 */
    if (y + dy < ballRadius) {
        dy = -dy;
        randomColor();
    } else if (y + dy > cvs.height - ballRadius) {
        if (x > paddleX - 10 && x < paddleX + paddleWidth + 10) {
            dy = -dy;
            randomColor();
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
            else {
                x = cvs.width / 2;
                y = cvs.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (cvs.width - paddleWidth) / 2;
            }
        }
    }
    if (x + dx < ballRadius || x + dx > cvs.width - ballRadius) {
        dx = -dx;
        randomColor();
    }

    if (pressRight && paddleX < cvs.width - paddleWidth) {
        paddleX += 7;
    } else if (pressLeft && paddleX > 0) {
        paddleX -= 7
    }

    x += dx;
    y += dy;
};

/* 隨機顏色,產生淺色球rgb150～255 */
function randomColor() {
    const r = Math.floor(Math.random() * 105 + 150);
    const g = Math.floor(Math.random() * 105 + 150);
    const b = Math.floor(Math.random() * 105 + 150);
    color = `rgb(${r}, ${g}, ${b})`;
};

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, cvs.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
};

function keyDown(e) {
    if (e.keyCode === 37) {
        pressLeft = true;
    } else if (e.keyCode === 39) {
        pressRight = true;
    }
}

function keyUp(e) {
    if (e.keyCode === 37) {
        pressLeft = false;
    } else if (e.keyCode === 39) {
        pressRight = false;
    }
}

function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: " + lives, cvs.width - 65, 20);
}

let interval = setInterval(draw, 10);
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);
