import Vue from 'vue';

const mixin = {
  data(){
    return {
      showdUpCards: [],
    };
  },
  methods: {
    async callSetCardPack(data){
      await this.$store.dispatch('card/setCardPack', data ? data : this.generateCardList());
    },
    callGetCardPack(){
      return JSON.parse(JSON.stringify(this.$store.getters["card/getCardPack"]));
    },
    async callShowCardUp(id){
      let cards = this.callGetCardPack();
      if(this.$store.getters["card/getShowdUpCards"].length < 2){
        cards[id].showUp = true;
        await this.$store.dispatch('card/setCardPack', cards);
        await this.$store.dispatch('card/addShowdUpCards', cards[id]);
      }
      if(this.$store.getters["card/getShowdUpCards"].length === 2) setTimeout(this.callCheckItsPair, 600);
    },
    async callCheckItsPair(){
      const cards = this.callGetCardPack();
      const showdUpCards = this.$store.getters["card/getShowdUpCards"];
      if(showdUpCards[0].image === showdUpCards[1].image) {
        alert('Talát!')
        const newPack = cards.filter(x => x.image !== showdUpCards[0].image);
        await this.callSetCardPack(newPack);
      } else {
        alert('Sajnos nem talált!')
      }
      await this.$store.dispatch('card/incrementScore');
      this.score++;
      await this.callDesselectCards();
    },
    async callDesselectCards(){
      const cards = this.callGetCardPack();
      cards.forEach(x => x.showUp = false);
      await this.callSetCardPack(cards);
      await this.$store.dispatch('card/setEmptyShowdUpCards');
    },
    async callSetGameOver(credentials){
      await this.$store.dispatch('card/setGameOver', credentials);
    },
    async callResetGame(){
      if(!confirm("Biztos új játékot kezdesz?")) return;
      this.showdUpCards = [];
      await this.callSetCardPack();
      await this.$store.dispatch('card/setDefaultScore');
      await this.$store.dispatch('card/setGameOver', false);
      await this.$store.dispatch('card/setEmptyShowdUpCards');
    },
    generateCardList () {
      const allCardCount = this.$store.getters["card/getMaxCardCount"];
      const numbers = [];
      const cardObjects = [];
      while (numbers.length/2 !== allCardCount/2){
        const rand = Math.floor(Math.random() * 18);
        if(!numbers.includes(rand)){
          numbers.push(rand);
          numbers.push(rand);
        }
      }
      this.shuffle(numbers).forEach(number => cardObjects.push({image: `card${number}.svg`, showUp: false}))
      return cardObjects;
    },
    shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    },
  }
}

Vue.mixin(mixin)
