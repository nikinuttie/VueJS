import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

    errorMessage: {
      message: "",
      title: "",
      show: false,
      type: "error",
    }, //object contains a central way to display error messages to any component, which is helpful since there are async actions
    systemDisabled: false, //tracks whether there is an error that causes the system to be completely disabled
  },
  getters: {
    errorMessage: (state) => state.errorMessage,
    systemDisabled: (state) => state.systemDisabled,

  },
  mutations: {

  },
  actions: {

  },
  modules: {
  }
})
