<template>
  <v-app>
    <v-app-bar
      class="d-flex justify-center"
      color="#CFD8DC"
      fixed
      app
    >
      <v-toolbar-title class="font-weight-bold mr-5 black--text c-font-size">Találd meg a párokat</v-toolbar-title>
      <v-toolbar-title>
        <v-chip color="#607D8B" text-color="#ffffff">Pontszám: {{ $store.getters["card/getScore"] }}</v-chip>
      </v-toolbar-title>
      <v-toolbar-title>
        <v-col cols="12" class="justify-start">
          <c-dialog :dialog-title="!$store.state.card.gameOver ? 'Biztos új játékot kezdesz?' : 'Új játék'"
                    button-label="Új játék"
                    v-on:action="callResetGame"/>
        </v-col>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer
      absolute
      app
      class="black--text"
    >
      <span>&copy; {{ new Date().getFullYear() }} Kártya párkereső</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    withConfirm(text){
      if(confirm(text)){
        this.callResetGame();
      }
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 480px) {
  .c-font-size {
    font-size: 70%!important;
  }
}
</style>


