<template>
    <div class="playground" :style="{
        width: `${xGridSize * 20 }px`,
        height: `${yGridSize * 20 }px`,
    }">
        <div class="grid-row" v-for="yIdx in yGridSize" :key="yIdx">
            <div class="grid" v-for="xIdx in xGridSize" :key="xIdx + '_' + yIdx">
                <div class="dot" v-show="map[xIdx - 1][yIdx - 1] === 1">
                </div>
                <div class="dot" :style="getHeadDirection" v-show="map[xIdx - 1][yIdx - 1] === 2">
                </div>
                <div class="dot" v-show="map[xIdx - 1][yIdx - 1] === 3">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/store";
import { onMounted, onUnmounted, ref } from "vue";
const gameInfo = useGameStore();
const xGridSize = 40;
const yGridSize = 27;

const getNewMap = (): Array<Array<number>> => {
    const newMap = new Array(xGridSize);
    for (let i = 0; i < xGridSize; i++) {
        newMap[i] = new Array(yGridSize).fill(0);
    }
    return newMap;
}

const map = ref<Array<Array<number>>>(getNewMap());
let snake = [{ x: 0, y: 0 }];
let direction = 'right';
let food = { x: 0, y: 0 };
let timer: number = -1

const getHeadDirection = () => {
    switch (direction) {
        case 'left':
            return { transform: 'rotate(180deg)' }
        case 'right':
            return { transform: 'rotate(0deg)' }
        case 'up':
            return { transform: 'rotate(270deg)' }
        case 'down':
            return { transform: 'rotate(90deg)' }
    }
}

const initFood = () => {
    food.x = Math.floor(Math.random() * xGridSize);
    food.y = Math.floor(Math.random() * yGridSize);
    if (map.value[food.x][food.y] > 0) {
        initFood();
    }
}



const reset = () => {
    const newMap = new Array(xGridSize);
    for (let i = 0; i < xGridSize; i++) {
        newMap[i] = new Array(yGridSize).fill(0);
    }
    map.value = newMap;  
    snake = [{ x: 0, y: 0 }];    
    direction = 'right';      
    food = { x: 0, y: 0 };       
    gameInfo.reset();
    initFood();
    clearInterval(timer);
}

const init = () => {
    reset();
    gameInfo.running = true;
    run();
}

const getSpeed = () => {
    return 200 - ((gameInfo.level - 1) * 15);
}

const run = () => {
    timer = setTimeout(() => {
        move();
        if (gameInfo.running) run();
    }, getSpeed());
}


const gameEnd = () => {
    gameInfo.running = false
    alert('Game Over!')
    clearInterval(timer);
    gameInfo.updateBestScore()
    gameInfo.updateBestLevel()
}



const updateMap = async () => {
    map.value = getNewMap();
    for (const snakeItem of snake) {
        map.value[snakeItem.x][snakeItem.y] = 1;
    }
    map.value[snake[0].x][snake[0].y] = 2;
    map.value[food.x][food.y] = 3;
}

const move = () => {
    const prevHead = JSON.parse(JSON.stringify(snake[0]));   
    // 蛇身体移动
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    switch (direction) {
        case 'right':
            snake[0].x++;
            break;
        case 'left':
            snake[0].x--;
            break;
        case 'top':
            snake[0].y--;
            break
        case 'down':
            snake[0].y++;
            break
    }
    // 碰到墙
    if (snake[0].x < 0 || snake[0].x >= xGridSize || snake[0].y < 0 || snake[0].y >= yGridSize) {
        gameEnd();
        return;
    }

    // 碰到自己
    if (snake.length > 1) {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                gameEnd();
                return;
            }
        }
    }

    // 吃到食物
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push(prevHead);
        gameInfo.incrementScore();
        initFood();
    }
    updateMap();
}


onMounted(() => {
    // 初始化方向监听
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction === 'down') return;
                direction = 'top';
                break;
            case 'ArrowDown':
                if (direction === 'top') return;
                direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction === 'right') return;
                direction = 'left';
                break;
            case 'ArrowRight':
                if (direction === 'left') return;
                direction = 'right';
                break;
        }
    })
    gameInfo.reset();
})


onUnmounted(() => {
    document.removeEventListener('keydown', () => { })
})


defineExpose({
    init
})


</script>

<style lang="less" scoped>
.playground {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: #eee solid 1px;
    box-sizing: border-box;
    flex-direction: column;


    .grid-row {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;


        .grid {
            width: 20px;
            height: 20px;
            background-color: #f2f5f7;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;


            .dot {
                width: 18px;
                height: 18px;
                background-color: #111;
            }
        }
    }
}
</style>