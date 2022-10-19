<template>
  <v-card hover :color="!showUp ? '#B0BEC5' : ''" @click="checkShowUp">
    <v-card-text>
      <v-img :class="!showUp ? 'un-visible' : ''" :src="image"/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "card",
  props: {
    image: {
      type: String,
      default() {
        return '';
      },
    },
    showUp: {
      type: Boolean,
      default() {
        return false;
      },
    },
    id: {
      type: Number,
      default() {
        return 0;
      }
    },
  },
  methods: {
    checkShowUp() {
      if (!this.showUp) {
        this.$emit('show-this-up', this.id)
      }
    },
  },
}
</script>

<style scoped>
.un-visible {
  z-index: -1;
}
</style>
