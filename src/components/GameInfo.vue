<template>
    <div class="board">
        <div style="text-align: left">难度：{{ gameInfo.level }}</div>
        <div style="text-align: center">分数：{{ gameInfo.score }}</div>
        <div style="text-align: right">历史最高：{{ gameInfo.bestLevel }} / {{gameInfo.bestScore }}</div>
    </div>
</template>

<script lang="ts" setup>
import { useGameStore } from "@/store";
const gameInfo = useGameStore();
</script>

<style lang="less" scoped>
.board {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    padding-left: 12px;
    padding-right: 12px;

    div {
        flex: 1;
        box-sizing: border-box;
        line-height: 48px;
        font-size: 16px;
        font-weight: 600;
    }
}
</style>