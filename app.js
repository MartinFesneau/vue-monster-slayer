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
    }
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHP < 0) {
        return {width: '0%'};
      } else {
        return {width: this.monsterHP + '%' };
      }
    },
    playerBarStyles() {
      if (this.playerHP < 0) {
        return {width: '0%'};
      } else {
        return {width: this.playerHP + '%'};
      }
    },
    disableSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.winner = "Draw";
      } else if (value <=0) {
        this.winner = "Monster";
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.player <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Player";
      }
    }
  },
  methods: {
    startGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.winner = null;
      this.currentRound = 0;
    },
    attackMonster() {
      this.currentRound++;
      const attackValue  = getRandomValue(5, 12);
      this.monsterHP -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHP -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 25);
      this.monsterHP -= attackValue;
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
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster"
    }
  }
});

app.mount("#game");