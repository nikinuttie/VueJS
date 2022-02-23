<template>
  <div>
    
    <!--  Message Dialog - Used to Display Pop Up Messages to the User -->

    <v-dialog persistent v-model="message.show" max-width="700">
      <v-card>
        <v-card-title aria-label="status message" class="headline">{{
          message.title
        }}</v-card-title>

        <v-card-text>
          <v-alert :value="true" :type="message.type">{{
            message.message
          }}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            aria-label="ok button"
            :color="message.type"
            text="text"
            @click="messageOk"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- HHS Header -->
    <!-- <v-system-bar
      app
      dark
      color="#323232"
      height="30"
      aria-label="HHS Banner"
      role="heading"
      aria-level="2"
    >
      <v-img
        alt="hhs logo"
        :src="asset_url + 'gov-hhs-white.png'"
        style="width: 800px; max-width: 800px"
      ></v-img>
      <v-spacer v-if="big_window"></v-spacer>
      <v-icon v-if="big_window">mdi-google-chrome</v-icon>
      <v-icon v-if="big_window">mdi-microsoft-edge</v-icon>
      <v-icon v-if="big_window">mdi-firefox</v-icon>
      <span class="font-weight-bold" v-if="big_window"
        >Site Optimized for Chrome, Edge, or Firefox</span
      >
    </v-system-bar> -->

    <!-- Navigation Bar -->
    <v-app-bar app color="#003152" dark>
      <v-row no-gutters>
        <div class="ma-0 pa-0">
          <slot name="nav_icon"></slot>
        </div>
        <div class="pa-2">
          <v-img
            alt="fda logo"
            contain
            height="40px"
            width="40px"
            :src="asset_url + 'demoicon2.png'"
            v-if="big_window"
          ></v-img>
          <v-img
            alt="small fda logo"
            style="height: 39px; width: 39px"
            :src="asset_url + 'demoicon2.png'"
            class="mr-2"
            v-else
          ></v-img>
        </div>
        <div class="pl-2 pr-3 mt-2 mb-2">
          <v-divider vertical color="white"></v-divider>
        </div>
        <div v-if="big_window" class="text-h6 pt-3 pl-4">{{ title }}</div>
        <div v-else class="text-sm-body-2 pt-3 pl-2">{{ title_mobile }}</div>
        
        <div class="flex-grow-1"></div>
        <div class="pl-4 mt-3">
          <v-chip label color="warning">
            Demo Only
          </v-chip>
        </div>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
    asset_url: "https://sdssoftware.s3.amazonaws.com/dockerdemo/images/",
    title: "Docker Demo - Vue + Django + Redis",
    title_mobile: 'Docker Demo - Vue + Django + Redis',
    message: {
      //object to define the message dialog boxes
      message: "",
      title: "",
      show: false,
      type: "",
      critical: false,
    },
  }),
  methods: {
    messageOk() {
      if (this.message.critical) {
        //set the system to disabled
        this.$store.dispatch("SET_SYSTEM_DISABLED", true);
        this.$router.push("/");
      } //critical, so disable system and send to beginning
      else {
        this.message.show = false;
      } //non-critical just close the box
    },
    
  },
  computed: {
    big_window() {
      let breakpoint = this.$vuetify.breakpoint.name;
      if (breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md") {
        return false;
      } else {
        return true;
      }
    },
    errorMessage() {
      //get the central error message
      return this.$store.getters.errorMessage;
    },
    systemDisabled() {
      //get the system status.  will be disabled if there is a major system malfunction
      return this.$store.getters.systemDisabled;
    },
  }
};
</script>
