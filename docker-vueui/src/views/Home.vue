<template>
  <v-app>
    <headerdemo></headerdemo>

    <!-- More Details Dialog -->
    <v-dialog
      id="moreInformationDialog"
      v-model="moreInformationDialog"
      max-width="900px"
      aria-label="More Information Dialog"
    >
      <v-container white fluid elevation="4" class="pa-0">
        <v-row style="background-color: #0097e3" class="ma-0 pa-2" no-gutters>
          <div :class="'pl-4 text-h6 white--text'">More Information</div>
          <div class="flex-grow-1"></div>
          <v-icon
            color="white"
            @click="closeMoreInformation()"
            aria-label="Close More Information Dialog"
            >mdi-close-box</v-icon
          >
        </v-row>
        <v-row align="center" justify="center" no-gutters>
          <v-col sm="12" class="ma-4">
            <v-row class="ma-4"
              ><span
                >This site is only meant for
                <strong>demonstration purposes only</strong> and is not intended
                for production use. It is meant to be used as a template or
                guide for deploying a web application using Vue.js as the client
                side framework, Django DRF for the REST API, PostgreSQL as the
                database backend and Redis as the caching framework.</span
              >
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <!-- Main Content Area -->
    <v-main role="heading" aria-level="1">
      <v-row :class="'text-h5 font-weight-bold ma-4'"
        ><v-col sm="12" align="center"
          >Welcome to the Docker Demo!
          <v-btn
            aria-label="Open More Information"
            class="mb-1"
            text
            icon
            color="blue lighten-2"
            @click="openMoreInformation()"
          >
            <v-icon class="">mdi-information-outline</v-icon>
          </v-btn>
        </v-col></v-row
      >

      <productinfo></productinfo>
      <bballstats></bballstats>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/shared/Header.vue";
import Baseball from "@/components/Baseball.vue";
import Product from "@/components/Product.vue";

export default {
  name: "Home",
  components: {
    headerdemo: Header,
    bballstats: Baseball,
    productinfo: Product,
  },
  data: () => ({
    moreInformationDialog: false,
  }),
  created() {
    this.getData();
  },
  methods: {
    errorMessageOk() {
      this.$store.dispatch("RESET_ERROR_MESSAGE");
    },
    closeMoreInformation() {
      this.moreInformationDialog = false;
    },
    openMoreInformation() {
      this.moreInformationDialog = true;
    },
  },
  watch: {
    items() {
      if (this.items.length == 0) {
        this.numberOfRequestPages = 1;
      }
    },
  },
  computed: {
    errorMessage() {
      //get the central error message
      return this.$store.getters.errorMessage;
    },
    systemDisabled() {
      //get the system status.  will be disabled if there is a major system malfunction
      return this.$store.getters.systemDisabled;
    },
  },
};
</script>
