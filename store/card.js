export const state = () => ({
  maxCardCounts: 20,
  cards: [],
  showdUpCards: [],
  score: 0,
  gameOver: false,
})

export const getters = {
  getCardPack(state) {
    //console.log('getters getCardPack', state.cards)
    return state.cards;
  },
  getScore(state){
    return state.score
  },
  getMaxCardCount(state){
    return state.maxCardCounts;
  },
  getShowdUpCards(state){
    return state.showdUpCards;
  }
}

export const mutations = {
  setCardPack: (state, credentials) => {
    //console.log('mutations setCardPack',credentials)
    state.cards = credentials;
  },
  incrementScore(state) {
    state.score++;
  },
  setDefaultScore(state) {
    state.score = 0;
  },
  setGameOver(state, credentials){
    state.gameOver = credentials;
  },
  setShowdUpCards(state, credentials){
    state.showdUpCards = credentials;
  },
}

export const actions = {
  async setCardPack(context, credentials) {
    context.commit('setCardPack', credentials);
  },
  async setDefaultScore(context) {
    context.commit('setDefaultScore');
  },
  async incrementScore(context) {
    context.commit('incrementScore');
  },
  async setGameOver(context, credentials){
    context.commit('setGameOver', credentials);
  },
  async addShowdUpCards(context, credentials){
    const showdUpCards = JSON.parse(JSON.stringify(context.state.showdUpCards));
    showdUpCards.push(credentials)
    context.commit('setShowdUpCards', showdUpCards);
  },
  async setEmptyShowdUpCards(context){
    context.commit('setShowdUpCards', []);
  },
}
