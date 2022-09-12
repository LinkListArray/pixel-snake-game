<template>
    <div class="board">
        <div style="text-align: left">level：{{ gameInfo.level }}</div>
        <div style="text-align: center">score：{{ gameInfo.score }}</div>
        <div style="text-align: right">best：{{ gameInfo.bestLevel }} - {{gameInfo.bestScore }}</div>
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