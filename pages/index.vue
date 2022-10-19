<template>
  <v-card class="my-2 mx-2" outlined elevation="5">
    <div class="mx-5" v-if="!$store.state.card.gameOver">
      <v-container fluid>
        <v-row>
          <v-col cols="6" sm="4" md="3" lg="2"
                 v-for="(card, cardIndex) in this.$store.state.card.cards" :key="cardIndex">
            <GameCard :image="card.image"
                      :id="cardIndex"
                      :show-up="card.showUp"
                      v-on:show-this-up="callShowCardUp"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else class="text-center pa-5">
      A játék véget ért, ennyi pontszámmal végeztél: {{ $store.getters["card/getScore"] }}
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'IndexPage',
  async beforeMount() {
    if (this.$store.state.card.cards.length === 0) {
      await this.callSetCardPack();
    }
  },
  watch: {
    '$store.state.card.cards': async function (val) {
      if (val.length === 0) {
        await this.callSetGameOver(true);
      }
    },
  }
}
</script>
