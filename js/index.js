const cvs = document.getElementById('breakGame');
const ctx = cvs.getContext('2d');
let x = cvs.width / 2;
let y = cvs.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
ctx.fillStyle = "orange";


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
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //左弧
    ctx.beginPath();
    ctx.arc(x - 12.5, y, 10, getRads(-50), getRads(50), false);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
    //右弧
    ctx.beginPath();
    ctx.arc(x + 12.5, y, 10, getRads(130), getRads(230), false);
    ctx.strokeStyle = "#000000";
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
}
/* 動球 */
function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    drawBall();
    /* 碰撞 */
    if (y + dy < ballRadius || y + dy > cvs.height - ballRadius) {
        dy = -dy;
        randomColor(ctx);
    }
    if (x + dx < ballRadius || x + dx > cvs.width - ballRadius) {
        dx = -dx;
        randomColor(ctx);
    }
    x += dx;
    y += dy;

};

/* 隨機顏色,產生淺色球rgb150～255 */
function randomColor(ctx) {
    const r = Math.floor(Math.random() * 105 + 150);
    const g = Math.floor(Math.random() * 105 + 150);
    const b = Math.floor(Math.random() * 105 + 150);
    // color = `rgb(${r}, ${g}, ${b})`;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
}



setInterval(draw, 10);