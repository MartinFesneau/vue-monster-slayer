function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHP < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHP + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHP < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHP + "%" };
      }
    },
    disableSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.player <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHP -= attackValue;
      this.attackPlayer();
      this.addLogMessage("Player", "attack", attackValue);
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHP -= attackValue;
      this.addLogMessage("Monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 25);
      this.monsterHP -= attackValue;
      this.addLogMessage("Player", "special attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHP + healValue > 100) {
        this.playerHP = 100;
      } else {
        this.playerHP += healValue;
      }
      this.addLogMessage("Player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionWhat: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
