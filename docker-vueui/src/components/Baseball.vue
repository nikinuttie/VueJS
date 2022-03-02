<template>
  <div>
    <!-- Data Table Card -->
    <v-row no-gutters justify="center" class="pa-1 mt-2">
      <v-col sm="12">
        <v-card height="400">
          <v-container white fluid class="pa-2">
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="requestItemsPerPage"
              :page.sync="requestItemsPage"
              @page-count="numberOfRequestPages = $event"
              item-key="id"
              hide-default-footer
              no-data-text="No data found."
              :loading="dataLoading"
              loading-text="Data loading ..."
              fixed-header
              height="325"
              calculate-widths
              class=""
            >
              <template v-slot:footer class="ml-2">
                <v-row class="ma-2" align="center" justify="start" no-gutters>
                  <span class="black--text font-weight-bold ml-3"
                    >Items per page</span
                  >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        aria-label="Items per page selection"
                        dark
                        text
                        color="primary"
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ requestItemsPerPage }}
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(number, index) in requestItemsPerPageSelect"
                        :key="index"
                        @click="updateRequestItemsPerPage(number)"
                      >
                        <v-list-item-title>{{ number }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-chip class="ma-2 white--text" color="red darken-4" label>
                    <v-icon left> mdi-database </v-icon>
                    DB Hits: {{ baseballdbhits }}
                  </v-chip>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    color="primary"
                    @click="getData()"
                  >
                    <v-icon dark> mdi-refresh </v-icon>
                  </v-btn>
                  <span class="ml-3">Data Cached in Redis for 60 Seconds</span>
                  <v-spacer></v-spacer>

                  <span class="mr-4 black--text font-weight-bold">
                    Page {{ requestItemsPage }} of {{ numberOfRequestPages }}
                  </span>
                  <v-btn
                    aria-label="Previous page button"
                    fab
                    dark
                    small
                    color="blue darken-3"
                    class="mr-1 mb-1"
                    @click="previousRequestPage"
                  >
                    <v-icon small>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn
                    aria-label="Next page button"
                    fab
                    dark
                    small
                    color="blue darken-3"
                    class="ml-1 mb-1"
                    @click="nextRequestPage"
                  >
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-data-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Baseball",
  data: () => ({
    dataLoading: false,
    headers: [
      {
        sortable: true,
        text: "Player Name",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "player_name",
      },
      {
        sortable: true,
        text: "Team Name",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "team_name",
      },
      {
        sortable: true,
        text: "Position",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "position",
      },
      {
        sortable: true,
        text: "Age",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "player_age",
      },
      {
        sortable: true,
        text: "Games Played",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "games_played",
      },
      {
        sortable: true,
        text: "Bats",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "at_bats",
      },
      {
        sortable: true,
        text: "Runs",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "runs",
      },
      {
        sortable: true,
        text: "Home Runs",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "home_runs",
      },
      {
        sortable: true,
        text: "RBI",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "rbi",
      },
    ],
    items: [],
    baseballdbhits: 0,
    requestItemsPerPageSelect: [5, 10, 25],
    requestItemsPage: 1,
    requestItemsPerPage: 10,
    numberOfRequestPages: 1,
  }),
  created() {
    //load the data
    this.getData();
  },
  methods: {
    errorMessageOk() {
      this.$store.dispatch("RESET_ERROR_MESSAGE");
    },
    updateRequestItemsPerPage(number) {
      this.requestItemsPerPage = number;
    },
    nextRequestPage() {
      if (this.requestItemsPage + 1 <= this.numberOfRequestPages)
        this.requestItemsPage += 1;
    },
    previousRequestPage() {
      if (this.requestItemsPage - 1 >= 1) this.requestItemsPage -= 1;
    },
    getData() {
      var vm = this;
      this.dataLoading = true;
      axios
        .get(process.env.VUE_APP_API_URL + "/api/bball-stats/")
        .then((response) => {
          console.log(response);
          vm.items = response.data.data.items;
          vm.baseballdbhits = response.data.data.hits;
          vm.dataLoading = false;
        })
        .catch((err) => {
          console.log(err);
          vm.dataLoading = false;
        });
    }, //get all of the data
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
