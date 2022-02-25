<template>
  <v-app>
    <fdaheader></fdaheader>

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
                for proudction use. It is meant to be used as a template or
                guide for deploying a web application using Vue.js as the client
                side framework, Django DRF for the REST API, PostgreSQL as the
                database backend and Redis as the caching framework.</span
              >
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

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
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="productTypes"
                        label="Product Type"
                        outlined
                        dense
                        v-model="editdata.product_type"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-0 mt-0 pb-0 mb-0">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="productPriority"
                        label="Product Priority"
                        outlined
                        dense
                        v-model="editdata.product_priority"
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-menu
                        v-model="dateSelectMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editdata.product_date_created"
                            label="Date Created"
                            prepend-icon="mdi-calendar"
                            readonly
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editdata.product_date_created"
                          @input="dateSelectMenu = false"
                        ></v-date-picker>
                      </v-menu>
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
      <v-row no-gutters justify="center" class="pa-1 mt-2">
        <v-col sm="4">
          <v-card height="400">
            <v-container fluid white class="pa-2">
              <v-row
                style="background-color: #1976d2"
                class="ma-0 pa-2"
                no-gutters
              >
                <div :class="'pl-4 text-h6 white--text'">Add Data</div>
                <div class="flex-grow-1"></div>
              </v-row>
              <v-row align="center" justify="center">
                <v-form ref="addDataForm" v-model="valid">
                  <v-row dense class="pt-0 mt-0 pb-0 mb-0">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-text-field
                        v-model="newdata.product_name"
                        :counter="20"
                        label="Product Name"
                        :rules="[rules.required, rules.counter]"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-text-field
                        v-model="newdata.product_price"
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
                        v-model="newdata.product_quantity"
                        type="number"
                        label="Product Quantity"
                        :rules="[rules.required, rules.isint]"
                        outlined
                        required
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="productTypes"
                        label="Product Type"
                        outlined
                        dense
                        v-model="newdata.product_type"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row dense class="pt-0 mt-0 pb-0 mb-0">
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :items="productPriority"
                        label="Product Priority"
                        outlined
                        dense
                        v-model="newdata.product_priority"
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6">
                      <v-menu
                        v-model="dateSelectMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="newdata.product_date_created"
                            label="Select Date Created"
                            prepend-icon="mdi-calendar"
                            readonly
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="newdata.product_date_created"
                          @input="dateSelectMenu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-form>
              </v-row>
              <v-row align="center" justify="center" no-gutters>
                <v-btn class="mb-3" color="primary" @click="addData()"
                  >Add</v-btn
                >
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col sm="8">
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
                      DB Hits: {{ productdbhits }}
                    </v-chip>
                    

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
      <v-row no-gutters justify="center" class="pa-1 mt-2">
        <v-col sm="12">
          <bballstats></bballstats>
        </v-col>
      </v-row>
      <fdafooter></fdafooter>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
import Baseball from "@/components/Baseball.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    fdaheader: Header,
    fdafooter: Footer,
    bballstats: Baseball
  },
  data: () => ({
    moreInformationDialog: false,
    editDataDialog: false,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      isint: (value) =>
        (parseFloat(value) == parseInt(value) && !isNaN(value)) ||
        "Must be Integer",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    headers: [
      {
        sortable: true,
        text: "Product Name",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "product_name",
      },
      {
        sortable: true,
        text: "Product Price",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "product_price",
      },
      {
        sortable: true,
        text: "Product Quantity",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "product_quantity",
      },
      {
        sortable: true,
        text: "Product Type",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "product_type",
      },
      {
        sortable: true,
        text: "Resupply Priority",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "product_priority",
      },
      {
        sortable: true,
        text: "Date Created",
        align: "left",
        class: "blue darken-2 white--text font-weight-bold",
        value: "product_date_created",
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
    productdbhits: 0,
    requestItemsPerPageSelect: [5, 10, 25],
    requestItemsPage: 1,
    requestItemsPerPage: 10,
    numberOfRequestPages: 1,
    valid: true,
    newdata: {
      product_date_created: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      product_priority: "Low",
      product_type: "Home",
      product_name: "",
    },
    editdata: {

    },
    productTypes: ["Home", "Sport", "Education", "Lawn", "Other"],
    productPriority: ["Low", "Med", "High"],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateSelectMenu: false,
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
    closeEditData() {
      this.editDataDialog = false;
    },
    openMoreInformation() {
      this.moreInformationDialog = true;
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
        .delete(process.env.VUE_APP_API_URL + "/api/cart-items/" + item.id)
        .then((response) => {
          console.log(response);
          vm.getData();
        });
    },
    addData() {
      var vm = this;

      if (this.$refs.addDataForm.validate()) {
        axios({
          method: "post",
          url: process.env.VUE_APP_API_URL + "/api/cart-items/",
          data: vm.newdata,
        })
          .then((response) => {
            console.log(response);
            vm.getData();
            vm.newdata = {
              product_date_created: new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .substr(0, 10),
              product_priority: "Low",
              product_type: "Home",
              product_name: "",
            };
            vm.$refs.addDataForm.resetValidation();
          })
          .catch(function (error) {
            console.log(error);
            vm.newdata = {
              product_date_created: new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .substr(0, 10),
              product_priority: "Low",
              product_type: "Home",
              product_name: "",
            };
            vm.$refs.addDataForm.resetValidation();
          });
      } //make sure valid data before updating
    },
    editData() {
      var vm = this;
      console.log(this.editdata);
      var id = this.editdata.id;

      delete this.editdata.id;
      
      if (this.$refs.editDataForm.validate()) {
        axios({
          method: "patch",
          url: process.env.VUE_APP_API_URL + "/api/cart-items/"+id,
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
      axios
        .get(process.env.VUE_APP_API_URL + "/api/cart-items/")
        .then((response) => {
          console.log(response);
          vm.items = response.data.data.items;
          vm.productdbhits = response.data.data.hits;
        })
        .catch((err) => {
          console.log(err);
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
