import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      level: 1,
      score: 0,
      bestLevel: 1,
      bestScore: 0,
      running: false,
    };
  },
  actions: {
    incrementScore() {
      this.score += this.level;
      if (this.score > Math.pow(2, this.level)) {
        this.level++;
      }
      this.updateBestScore();
      this.updateBestLevel();
    },
    reset() {
      this.level = 1;
      this.score = 0;
      this.running = false;
      this.bestLevel = parseInt(
        window.localStorage.getItem("bestLevel") || "1"
      );
      this.bestScore = parseInt(
        window.localStorage.getItem("bestScore") || "0"
      );
    },
    updateBestLevel() {
      if (this.level > this.bestLevel) {
        this.bestLevel = this.level;
        window.localStorage.setItem("bestLevel", this.bestLevel.toString());
      }
    },
    updateBestScore() {
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        window.localStorage.setItem("bestScore", this.bestScore.toString());
      }
    },
  },
});
