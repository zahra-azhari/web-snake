const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const boxScore = document.querySelector('.box')
const showMessage = document.querySelector('.showMessage')
document.addEventListener('keyup', changeDirection);

function changeDirection(e) {
    let pressedKey = e.key;
    if (directionPermission) {
        if (pressedKey == 'ArrowUp' && dy != 10) {
            dx = 0;
            dy = -10;
            directionPermission = false;
        } else if (pressedKey == 'ArrowDown' && dy != -10) {
            dx = 0;
            dy = 10;
            directionPermission = false;
        } else if (pressedKey == 'ArrowRight' && dx != -10) {
            dx = 10;
            dy = 0;
            directionPermission = false;
        } else if (pressedKey == 'ArrowLeft' && dx != 10) {
            dx = -10;
            dy = 0;
            directionPermission = false;
        }
    }
}

const snake = [
    { x: 100, y: 100 },
    { x: 90, y: 100 },
    { x: 80, y: 100 },
    { x: 70, y: 100 },
    { x: 60, y: 100 },
    { x: 50, y: 100 },
]
let dx = 10;
let dy = 0;
let seedX;
let seedY;
let directionPermission = true;
let score = 0;
let savedScore = 0;
let tempScore = 0;
let heightScore = 0;
let situation = false;
let speed = 200;
let speedNew = 400;
let result = Number(localStorage.getItem('heightScore'));

// let speedSnake = () => {
//     return speed = speed/2;
// }

let gameBoard = () => {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 300)
    ctx.strokeRect(0, 0, 300, 300)
}

let snakeDraw = () => {
    snake.map(item => {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'pink';
        ctx.fillRect(item.x, item.y, 10, 10)
        ctx.strokeRect(item.x, item.y, 10, 10)
    })
}

let generateRandomNumber = () => Math.floor(Math.random() * 30) * 10

let generateSeed = () => {
    seedY = generateRandomNumber();
    seedX = generateRandomNumber();
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === seedX && snake[i].y === seedY) {
            i = 0;
        }
    }
}

let drawSeed = () => {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'red';
    ctx.fillRect(seedX, seedY, 10, 10)
    ctx.strokeRect(seedX, seedY, 10, 10)
}

let move = () => {

    if (snake[0].x + dx > 290 || snake[0].x + dx < 0 || snake[0].y + dy > 290 || snake[0].y + dy < 0) {
        savedScore = score;
        situation = true;
    } else {
        snake.unshift({ x: snake[0].x + dx, y: snake[0].y + dy })
    }

    if (snake[0].x === seedX && snake[0].y === seedY) {
        // speedSnake ();
        // console.log(speedSnake())
        speed = speed - 100;
        generateSeed();
        score++;

    } else {
        snake.pop();
    }

}

let gameOver = () => {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            savedScore = score;

            

            // localStorage.setItem('heightScore', savedScore)
            return true;
        }
    }
    return false;
}

let storage = () => {
    console.log('savedScore', savedScore , typeof(savedScore))
    console.log('result', result,typeof(result))

    if (gameOver() || situation) {

        if (savedScore > result) {
            localStorage.setItem('heightScore', savedScore)
        }

    }
}

let showScore = () => {
    boxScore.innerHTML = `<span class="score">Your Score:${score}</span>
    <span class="heightScore">Top Score:${result}</span>`
    console.log('score', score)
}

function run() {
    gameBoard();
    generateSeed();

    snakeDraw();
    // speedNew=speed;
    setInterval(() => {
        directionPermission = true;
        showScore();
        if (gameOver() || situation) {
            showMessage.style.display = 'flex';
            storage();
            return null;
        }
        move();
        gameBoard();
        drawSeed();
        snakeDraw();
        
    }, speed)
    // }, speedSnake())
}
run();