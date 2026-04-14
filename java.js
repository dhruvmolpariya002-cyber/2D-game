function createPixelSprite(pattern, palette, pixelSize = 2) {
    const h = pattern.length;
    const w = pattern[0].length;

    const canvas = document.createElement("canvas");
    canvas.width = w * pixelSize;
    canvas.height = h * pixelSize;

    const ctx = canvas.getContext("2d");

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const char = pattern[y][x];
            const color = palette[char];

            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
    }

    return canvas;
}
const colors = {
    '0': null,
    '1': '#111111',
    '2': '#7f77dd',
    '3': '#afa9ec'
};

const playerPattern = [
    "0000111111000000",
    "0001222222100000",
    "0012222222210000",
    "0122333333210000",
    "0123211233210000",
    "0123333333210000",
    "0122222222210000",
    "0012222222100000",
    "0012211222100000",
    "0122100122100000",
    "0122100122100000",
    "0011100011100000",
    "0011100011100000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000"
];
const playerSprite = createPixelSprite(playerPattern, colors, 2);
function drawPlayer() {
    ctx.save();

    // Flip if facing left
    if (player.direction === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(
            playerSprite,
            -player.x - player.w,
            player.y,
            player.w,
            player.h
        );
    } else {
        ctx.drawImage(
            playerSprite,
            player.x,
            player.y,
            player.w,
            player.h
        );
    }

    ctx.restore();
}
const enemyColors = {
    '0': null,
    '1': '#111111',
    '2': '#d85a30',
    '3': '#faece7',
    '4': '#fac775'
};

const enemyPattern = [
    "0000111111000000",
    "0001222222100000",
    "0012222222210000",
    "0122333333210000",
    "0123211233210000",
    "0123333333210000",
    "0122222222210000",
    "0012222222100000",
    "0012211222100000",
    "0122100122100000",
    "0122100122100000",
    "0011100011100000",
    "0011100011100000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000"
];
const enemySprite = createPixelSprite(enemyPattern, enemyColors, 2);
const TOTAL_LEVELS = 11;

let currentLevel = 1;
let maxLevel = parseInt(localStorage.getItem("rudibudi_maxLevel")) || 1;

let gamePaused = false;
function buildLevelGrid() {
    const grid = document.getElementById("levelGrid");
    grid.innerHTML = "";

    for (let i = 1; i <= TOTAL_LEVELS; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("level-btn");

        if (i <= maxLevel) {
            btn.classList.add("unlocked");

            if (i === currentLevel) {
                btn.classList.add("current");
            }

            btn.onclick = () => {
                startLevel(i);
                closeLevelMenu();
            };
        } else {
            btn.classList.add("locked");
        }

        grid.appendChild(btn);
    }
}
function buildLevelGrid() {
    const grid = document.getElementById("levelGrid");
    grid.innerHTML = "";

    for (let i = 1; i <= TOTAL_LEVELS; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("level-btn");

        if (i <= maxLevel) {
            btn.classList.add("unlocked");

            if (i === currentLevel) {
                btn.classList.add("current");
            }

            btn.onclick = () => {
                startLevel(i);
                closeLevelMenu();
            };
        } else {
            btn.classList.add("locked");
        }

        grid.appendChild(btn);
    }
}
function unlockNextLevel() {
    if (currentLevel === maxLevel && maxLevel < TOTAL_LEVELS) {
        maxLevel++;
        localStorage.setItem("rudibudi_maxLevel", maxLevel);
    }
}
function openLevelMenu() {
    gamePaused = true;
    document.getElementById("levelMenu").classList.add("active");
    buildLevelGrid();
}

function closeLevelMenu() {
    document.getElementById("levelMenu").classList.remove("active");
    gamePaused = false;
}
function gameLoop() {
    if (gamePaused) return;

    // your existing update/render logic
}
unlockNextLevel();
startLevel(currentLevel + 1);
function resetGameState() {
    // reset score, lives, player position
}

function loadLevel(level) {
    // load level data
}
function resetProgress() {
    localStorage.removeItem("rudibudi_maxLevel");
    maxLevel = 1;
    buildLevelGrid();
}