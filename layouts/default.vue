<template>
  <v-app>
    <v-app-bar
      class="d-flex justify-center"
      :clipped-left="clipped"
      color="#CFD8DC"
      fixed
      app
    >
      <v-toolbar-title class="font-weight-bold mr-5">Találd meg a párokat</v-toolbar-title>
      <v-toolbar-title>
        <v-chip color="#607D8B" text-color="#ffffff">Pontszám: {{ $store.getters["card/getScore"] }}</v-chip>
      </v-toolbar-title>
      <v-toolbar-title>
        <v-col cols="12" class="justify-start">
          <v-btn color="primary" @click="callResetGame">Új játék</v-btn>
        </v-col>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      color="#CFD8DC"
    >
      <span>&copy; {{ new Date().getFullYear() }} Kártya párkereső</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
