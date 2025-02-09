const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const StartGameButton = document.getElementById("StartGameButton");

const controls = document.getElementById("controls");

const gridSize = 20;

const canvasSize = 400;

canvas.width = canvasSize;

canvas.height = canvasSize;

let snake = [{ x: 200, y: 200 }];

let direction = { x: gridSize, y: 0 };

let food = randomFood();

let score = 0;

let gameRunning = false;


//Rastgele sayı üretme fonksiyonu
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
//İçeriği değiştirme fonksiyonu
function innerHTML(girdi, girilen) {
    document.getElementById(girdi).innerHTML = girilen;
}
  
//Menüye gitme fonksiyonu
function GoToFunction(Open){
  
    setTimeout(function () {
      const elements = document.getElementsByClassName("menu");
  
      // Döngüyle elemanlara erişme
      for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add("close");
  
      }
  
      document.getElementById(Open).classList.remove("close");
  
    }, 100);
  
    
}




function randomFood() {

    return {

        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,

        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize

    };

}

function draw() {

    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";

    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    ctx.fillStyle = "lime";

    snake.forEach((segment, index) => {

        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);

        if (index === 0) ctx.fillStyle = "green";  

    });

    document.getElementById("score").innerText = `Skor: ${score}`;

}

function update() {

    if (!gameRunning) return;  

    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {

        gameRunning = false;

        StartGameButton.style.display = "block";

        return;

    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {

        score += 1;

        food = randomFood();

    } else {

        snake.pop();

    }

}

document.addEventListener("keydown", event => {

    if (event.key === "ArrowUp" && direction.y === 0) {

        direction = { x: 0, y: -gridSize };

    } else if (event.key === "ArrowDown" && direction.y === 0) {

        direction = { x: 0, y: gridSize };

    } else if (event.key === "ArrowLeft" && direction.x === 0) {

        direction = { x: -gridSize, y: 0 };

    } else if (event.key === "ArrowRight" && direction.x === 0) {

        direction = { x: gridSize, y: 0 };

    }

});

// **Mobil Kontroller**

document.getElementById("up").addEventListener("click", () => {

    if (direction.y === 0) direction = { x: 0, y: -gridSize };

});

document.getElementById("down").addEventListener("click", () => {

    if (direction.y === 0) direction = { x: 0, y: gridSize };

});

document.getElementById("left").addEventListener("click", () => {

    if (direction.x === 0) direction = { x: -gridSize, y: 0 };

});

document.getElementById("right").addEventListener("click", () => {

    if (direction.x === 0) direction = { x: gridSize, y: 0 };

});

// Başlat Butonu Oyun Başlatma

StartGameButton.addEventListener("click", () => {
    GoToFunction("gameMenu");
    StartGame();
});

// Oyun Başlatma
function StartGame() {

    console.log("AAAA");
    gameRunning = true;

    snake = [{ x: 200, y: 200 }];

    direction = { x: gridSize, y: 0 };

    food = randomFood();

    score = 0;

    StartGameButton.style.display = "none";

    canvas.style.display = "block";

    controls.style.display = "flex";

    draw();
    setTimeout(() => {

        gameLoop();

    }, 3000);

}

function gameLoop() {

    if (!gameRunning) return;

    update();

    draw();

    setTimeout(gameLoop, 100);

}