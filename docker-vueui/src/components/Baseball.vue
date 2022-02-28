<template>
  <v-app>
    
    <!-- Edit Data Dialog -->
    <v-dialog
      id="editDataDialog"
      v-model="editDataDialog"
      max-width="600px"
    >
            <v-container fluid white elevation="4" class="pa-0">
              <v-row style="background-color: #0097e3" class="ma-0 pa-2" no-gutters>
          <div :class="'pl-4 text-h6 white--text'">Edit Data</div>
          <div class="flex-grow-1"></div>
          <v-icon
            color="white"
            @click="closeEditData()"
            >mdi-close-box</v-icon
          >
        </v-row>
              <v-row class="mt-4" align="center" justify="center" no-gutters>
                <v-form ref="editDataForm" v-model="valid">
                  <v-row dense class="pt-0 mt-0 pb-0 mb-0">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-text-field
                        v-model="editdata.product_name"
                        :counter="20"
                        label="Product Name"
                        :rules="[rules.required, rules.counter]"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-text-field
                        v-model="editdata.product_price"
                        label="Product Price"
                        outlined
                        type="number"
                        :rules="[rules.required]"
                        dense
                        prefix="$"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-0 mt-0 pb-0 mb-0">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-text-field
                        v-model="editdata.product_quantity"
                        type="number"
                        label="Product Quantity"
                        :rules="[rules.required, rules.isint]"
                        outlined
                        required
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-row>
              <v-row align="center" justify="center" no-gutters>
                <v-btn class="mb-3" color="primary" @click="editData()"
                  >Edit</v-btn
                >
              </v-row>
            </v-container>
    </v-dialog>

    <!-- Data Table Card -->
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
                <template v-slot:item.actions="{ item }">
                  <v-btn
                    text
                    x-small
                    color="primary"
                    @click="updateItemInitialize(item)"
                  >
                    <v-icon small class="pr-2">mdi-pencil</v-icon>Edit
                  </v-btn>
                  <v-btn
                    text
                    x-small
                    color="primary"
                    @click="deleteItemInitialize(item)"
                  >
                    <v-icon small class="pr-2">mdi-delete</v-icon>Delete
                  </v-btn>
                </template>
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
                  <v-chip
                      class="ma-2 white--text"
                      color="red darken-4"
                      label
                    >
                    <v-icon left>
                      mdi-database
                    </v-icon>
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
                      <v-icon dark>
                        mdi-refresh
                      </v-icon>
                    </v-btn>
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
  </v-app>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Baseball",
  data: () => ({
    editDataDialog: false,
    dataLoading: false,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      isint: (value) =>
        (parseFloat(value) == parseInt(value) && !isNaN(value)) ||
        "Must be Integer",
    },
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
      {
        sortable: false,
        text: "Action",
        align: "center",
        value: "actions",
        class: "blue darken-2 white--text font-weight-bold",
      },
    ],
    items: [],
    baseballdbhits: 0,
    requestItemsPerPageSelect: [5, 10, 25],
    requestItemsPage: 1,
    requestItemsPerPage: 10,
    numberOfRequestPages: 1,
    valid: true,
    editdata: {

    }
  }),
  created() {
    this.getData();
  },
  methods: {
    errorMessageOk() {
      this.$store.dispatch("RESET_ERROR_MESSAGE");
    },
    closeEditData() {
      this.editDataDialog = false;
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
    updateItemInitialize(item) {
      console.log(item);
      this.editdata = JSON.parse(JSON.stringify(item));
      this.editDataDialog = true;
    },
    deleteItemInitialize(item) {
      console.log(item);
      this.deleteData(item);
    },
    deleteData(item) {
      var vm = this;
      axios
        .delete(process.env.VUE_APP_API_URL + "/api/bball-stats/" + item.id)
        .then((response) => {
          console.log(response);
          vm.getData();
        });
    },
    editData() {
      var vm = this;
      console.log(this.editdata);
      var id = this.editdata.id;

      delete this.editdata.id;
      
      if (this.$refs.editDataForm.validate()) {
        axios({
          method: "patch",
          url: process.env.VUE_APP_API_URL + "/api/bball-stats/"+id,
          data: vm.editdata,
        })
          .then((response) => {
            console.log(response);
            vm.getData();
            vm.$refs.editDataForm.resetValidation();
            vm.editDataDialog = false;
          })
          .catch(function (error) {
            console.log(error);
            vm.$refs.editDataForm.resetValidation();
            vm.editDataDialog = false;
            
            
          });
      } //make sure valid data before updating
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
