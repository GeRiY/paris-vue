<template>
  <v-dialog
    transition="dialog-bottom-transition"
    width="250"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >{{ buttonLabel }}
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color="#CFD8DC"
          dark
          class="d-flex justify-center black--text font-weight-bold"
        >{{ dialogTitle }}
        </v-toolbar>
        <v-card-actions>
          <v-btn
            text
            @click="dialog.value = false;"
          >Mégsem
          </v-btn>
          <v-spacer/>
          <v-btn
            text
            @click="dialog.value = false;$emit('action');"
          >Mehet
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "c-dialog",
  props: {
    buttonLabel: {
      type: String,
      default() {
        return 'button-label';
      },
    },
    dialogTitle: {
      type: String,
      default() {
        return 'dialog-title';
      },
    },
    action: {
      type: Function,
      default() {
        return () => alert('Teszt');
      },
    },
  },
}
</script>

<style scoped>

</style>
