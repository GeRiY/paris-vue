import Vue from 'vue';
import {generateNumberPairArray} from '~/utils/common';

const mixin = {
  data() {
    return {
      isCheckingIsAPair: false,
    };
  },
  methods: {
    async callSetCardPack(data) {
      await this.$store.dispatch('card/setCardPack', data ? data : this.generateCardList());
    },
    callGetCardPack() {
      return JSON.parse(JSON.stringify(this.$store.getters["card/getCardPack"]));
    },
    async callShowCardUp(id) {
      let cards = this.callGetCardPack();
      if (this.$store.getters["card/getShowdUpCards"].length < 2) {
        cards[id].showUp = true;
        await this.$store.dispatch('card/setCardPack', cards);
        await this.$store.dispatch('card/addShowdUpCards', cards[id]);
      }

      if (!this.isCheckingIsAPair && this.$store.getters["card/getShowdUpCards"].length === 2) {
        this.isCheckingIsAPair = true;
        setTimeout(this.callCheckItsPair, 600);
      }
    },
    async callCheckItsPair() {
      const cards = this.callGetCardPack();
      const showdUpCards = this.$store.getters["card/getShowdUpCards"];
      if (showdUpCards && showdUpCards[0].image === showdUpCards[1].image) {
        const newPack = cards.filter(x => x.image !== showdUpCards[0].image);
        await this.callSetCardPack(newPack);
      }
      await this.$store.dispatch('card/incrementScore');
      this.score++;
      await this.callDesselectCards();
      this.isCheckingIsAPair = false;
    },
    async callDesselectCards() {
      const cards = this.callGetCardPack();
      cards.forEach(x => x.showUp = false);
      await this.callSetCardPack(cards);
      await this.$store.dispatch('card/setEmptyShowdUpCards');
    },
    async callSetGameOver(credentials) {
      await this.$store.dispatch('card/setGameOver', credentials);
    },
    async callResetGame() {
      await this.callSetCardPack();
      await this.$store.dispatch('card/setDefaultScore');
      await this.$store.dispatch('card/setGameOver', false);
      await this.$store.dispatch('card/setEmptyShowdUpCards');
    },
    generateCardList() {
      const cardObjects = [];
      generateNumberPairArray(this.$store.getters["card/getMaxCardCount"])
        .forEach(number => cardObjects.push({image: `card${number}.svg`, showUp: false}));
      return cardObjects;
    },
  }
}

Vue.mixin(mixin)
