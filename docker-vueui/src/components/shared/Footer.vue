<template>
  <v-footer app class="body-2 font-weight-light">
    <v-row style="background-color: #003152">
      <v-col cols="1" v-if="big_window">
        <v-img
          alt="small fda logo"
          style="height: 39px; width: 39px"
          :src="asset_url + 'demoicon2.png'"
        ></v-img>
      </v-col>
      <v-col cols="11">
        <v-row align="center" justify="center">
          <!-- <v-spacer v-if="big_window"></v-spacer> -->
      <v-icon v-if="big_window">mdi-google-chrome</v-icon>
      <v-icon v-if="big_window">mdi-microsoft-edge</v-icon>
      <v-icon v-if="big_window">mdi-firefox</v-icon>
      <span class="font-weight-bold text--white" v-if="big_window"
        >Site Optimized for Chrome, Edge, or Firefox</span
      >
          <!-- <v-btn
            href="http://www.fda.gov/AboutFDA/AboutThisWebsite/Accessibility/default.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >Accessibility</v-btn
          >
          <v-btn
            href="http://www.fda.gov/AboutFDA/WorkingatFDA/default.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >Careers</v-btn
          >
          <v-btn
            href="http://www.fda.gov/AboutFDA/Transparency/Basics/default.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >FDA Basics</v-btn
          >
          <v-btn
            href="http://www.fda.gov/RegulatoryInformation/FOI/default.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >FOIA</v-btn
          >
          <v-btn
            href="http://www.fda.gov/AboutFDA/WorkingatFDA/NoFearAct/default.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >No FEAR Act</v-btn
          >
          <v-btn
            href="http://www.fda.gov/AboutFDA/AboutThisWebsite/ucm523730.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >Nondiscrimination</v-btn
          >
          <v-btn
            href="http://www.fda.gov/AboutFDA/AboutThisWebsite/WebsitePolicies/default.htm"
            class="pt-2"
            small
            style="color: white"
            text
            >Website Policies</v-btn
          > -->
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    asset_url: "https://sdssoftware.s3.amazonaws.com/dockerdemo/images/",
  }),
  computed: {
    big_window() {
      let breakpoint = this.$vuetify.breakpoint.name;
      if (breakpoint === "xs" || breakpoint === "sm") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
