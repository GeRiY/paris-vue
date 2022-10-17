<template>
  <v-row justify="center" align="center">
    <v-col cols="12" xl="12" lg="12" md="12" sm="12">
      <v-card class="mt-5" elevation="5">
        <v-card-text class="d-flex" v-if="!$store.state.card.gameOver">
          <v-row>
            <v-col cols="6" xl="2" lg="2" md="3" sm="4"
                   v-for="(card, cardIndex) in this.$store.state.card.cards" :key="cardIndex">
              <GameCard :image="card.image"
                        :id="cardIndex"
                        :show-up="card.showUp"
                        v-on:show-this-up="callShowCardUp"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else class="text-center">
          <v-row>
            <v-col cols="12" class="text-center">
              <p>A játék véget ért, ennyi pontszámmal végeztél: {{ $store.getters["card/getScore"]}}</p>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  async beforeMount() {
    if(this.$store.state.card.cards.length === 0){
      await this.callSetCardPack();
    }
  },
  watch: {
    '$store.state.card.cards': async function(val){
      if(val.length === 0){
        await this.callSetGameOver(true);
      }
    },
  }
}
</script>
