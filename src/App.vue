<script setup lang="ts">
import { shallowRef } from 'vue';
import GameInfo from './components/GameInfo.vue'
import GameMain from './components/GameMain.vue'
import { useGameStore } from './store';
const gameStore = useGameStore();
const gameMain = shallowRef<InstanceType<typeof GameMain>>()
const startGame = () => {
  gameMain.value?.init()
}
</script>

<template>
  <div class="main">
    <div class="game">
      <GameInfo />
      <GameMain ref='gameMain' />
      <div class="mask" v-if="!gameStore.running">
        <button @click="startGame">开始游戏</button>
      </div>
    </div>

  </div>

</template>

<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;


  .game {
    width: 800px;
    height: 590px;
    background-color: white;
    overflow: hidden;
    border-radius: 12px;
    position: relative;

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.5);

      button {
        width: 120px;
        height: 60px;
        border-radius: 30px;
        background-color: #459dff;
        color: white;
        text-align: center;
        cursor: pointer;
        font-size: 18px;
        outline: none;
        border: none;

      }
    }
  }
}
</style>
