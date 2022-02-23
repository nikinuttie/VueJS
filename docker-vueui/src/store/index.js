import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /*factorModel: [ //store the model that contains the questions and business logic for the factors in the questionairre
      {
        id: 13456,
        order: 1,
        title: 'Use of Agricultural Water',
        label: '<p>Do you use agricultural water in the growing of covered produce (other than sprouts)?</p>',
        backgroundInfo: '<p>If you use agricultural water in growing covered produce (other than sprouts), then you would be required to meet the requirements in proposed § 112.43 for agricultural water assessments, if finalized. (If you use agricultural water as sprout irrigation water, or for harvesting, packing, or holding of covered produce, you would not be required to meet the requirements in § 112.43 for agricultural water assessments, if finalized.)</p>',
        response: [
          {
            dataKey: 1,
            dataElement: 'Ag_Water',
            type: 'dropdown', //defines the answer type to drive how the UI displays
            options: [ //outline the options for the answers
              'No',
              'Yes'
            ],
            businessRule: { //this will define the map of what the engine should do based on the selected answer.  0 is a reference to Exempted.
              'No': 0,
              'Yes': 2
            },
            required: true,
            answer: ''
          }
        ], //maps the data element to a answer from the user
      },
      {
        id: 23455,
        order: 2,
        title: 'Exemption Identification',
        label: "<p>Can you demonstrate one of the following for the agricultural water you apply during growing activities for covered produce (other than sprouts)? If Yes, please explain and provide any supporting information.</p><ul><li>Agricultural water meets the requirements in proposed § 112.44(a), including the microbial quality criterion, and if untreated ground water, also meets the testing requirements in proposed §§ 112.44(b), 112.47, and 112.151;</li><li>Agricultural water meets the requirements in proposed § 112.44(c) for water from a Public Water System or public water supply; or</li><li>Agricultural water is treated in accordance with proposed § 112.46.</li></ul>",
        backgroundInfo: "<ul><li>Under proposed § 112.43(b)(1), if finalized, a covered farm would be exempt from the requirement to conduct an assessment for pre-harvest agricultural water if the farm can demonstrate that the agricultural water meets the requirements of proposed § 112.44(a), which is applicable to agricultural water used for sprout irrigation or for harvest or post-harvest uses--i.e., untreated ground water that meets the microbial water quality criterion of no detectable generic E. coli, based on testing requirements in proposed §§ 112.44(b), 112.47, and 112.151. The exclusion in proposed § 112.43(b)(1) would not apply to untreated surface water, because proposed § 112.44(a) prohibits the use of untreated surface water for sprout irrigation or harvest or post-harvest application on covered produce.</li><li>Proposed § 112.43(b)(2) would exempt a covered farm from the requirement to conduct an agricultural water assessment for pre-harvest agricultural water for non-sprout covered produce that a covered farm receives from a public water system that the covered farm can demonstrate: meets the microbial requirements of EPA Safe Drinking Water Act (SDWA) regulations in 40 CFR part 141 (or the regulations of a State approved to administer the SDWA program) through public water system results or certificates of compliance or meets the microbial quality criterion in § 112.44(a) through public water system results or certificates of compliance</li><li>Proposed § 112.43(b)(3) would exempt a covered farm from the requirement to conduct an agricultural water assessment for pre-harvest agricultural water for non-sprout covered produce that is treated in accordance with proposed § 112.46 (such as through application of an EPA-registered antimicrobial pesticide product).</li></ul>",
        response: [
          {
            dataKey: 1,
            dataElement: 'Exemptions',
            type: 'dropdown', //defines the answer type to drive how the UI displays
            options: [ //outline the options for the answers
              'No',
              'Yes'
            ],
            businessRule: { //this will define the map of what the engine should do based on the selected answer.  0 is a reference to Exempted.
              'No': 3,
              'Yes': 0
            },
            required: true,
            answer: ''
          },
          {
            dataKey: 2,
            dataElement: 'Exemptions_Description',
            type: 'textarea', //defines the answer type to drive how the UI displays
            options: null,
            businessRule: null,
            required: false,
            answer: ''
          }
        ]
      }*/
    factorModel: [], //stores the entire factor model with all of the questions and business logic
    selectedFactor: {}, //tracks the current factor question
    outcomeModel:[],//stores the entire outcome model with all the questions and business logic
    selectedOutcome: {}, //tracks the current outcome question
    factorTracker: ['0131496bb54c9518163c9a4e10e2d049'], //stores and tracks which factors have been successfully answered, this helps with tracking for navigation and the back navigation functionality.  will store the IDs of the factors successfully answered
    outcomeTracker: [], //stores and tracks which outcomes have been successfully answered, this helps with tracking for navigation and the back navigation functionality.  will store the IDs of the outcomes successfully answered
    errorMessage: {
      message: "",
      title: "",
      show: false,
      type: "error",
    }, //object contains a central way to display error messages to any component, which is helpful since there are async actions
    systemDisabled: false, //tracks whether there is an error that causes the system to be completely disabled
    factorModelLoaded: false, //tracks whether the model is still loading.  the user cannot start an assessment until the model is loaded
    outcomeModelLoaded: false, //tracks whether the model is still loading.  the user cannot start the outcome section until this is done
    saveDialog: false //used to show / hide the save dialog pop up
  },
  getters: {
    errorMessage: (state) => state.errorMessage,
    selectedFactor: (state) => state.selectedFactor,
    factorModel: (state) => state.factorModel,
    getFactorByOrder: (state) => (order) => { //return the factor by the question order
      return state.factorModel.find(f => f.order == order);
    },
    getFactorById: (state) => (id) => { //return the factor by a specific ID
      return state.factorModel.find(f => f.id == id);
    },
    selectedOutcome: (state) => state.selectedOutcome,
    outcomeModel: (state) => state.outcomeModel,
    getOutcomeByOrder: (state) => (order) => { //return the outcome by the question order
      return state.outcomeModel.find(f => f.order == order);
    },
    getOutcomeById: (state) => (id) => { //return the outcome by a specific ID
      return state.outcomeModel.find(f => f.id == id);
    },
    factorTrackerContains: (state) => (id) => { //return if this factor has already been answered
      return state.factorTracker.includes(id);
    },
    factorTrackerLast: (state) => (idList) => {// out of the list of IDs which one was navigated to last
      for (let i = state.factorTracker.length - 1; i>=0; i--) {
        if(idList.includes(state.factorTracker[i])) {
          return state.factorTracker[i];//first occurence we find of an id in the list should be returned
        }
      }//iterate in reverse order to go back to front

    },
    outcomeTrackerContains: (state) => (id) => { //return if this outcome has already been answered
      return state.outcomeTracker.includes(id);
    },
    outcomeTrackerLast: (state) => (idList) => {// out of the list of IDs which one was navigated to last
      for (let i = state.outcomeTracker.length - 1; i>=0; i--) {
        if(idList.includes(state.outcomeTracker[i])) {
          return state.outcomeTracker[i];//first occurence we find of an id in the list should be returned
        }
      }//iterate in reverse order to go back to front

    },
    factorTracker: (state) => state.factorTracker,
    outcomeTracker: (state) => state.outcomeTracker,
    systemDisabled: (state) => state.systemDisabled,
    factorModelLoaded: (state) => state.factorModelLoaded,
    outcomeModelLoaded: (state) => state.outcomeModelLoaded,
    saveDialog: (state) => state.saveDialog,
    todayISODateTime: () => {
      var todayDate = new Date();
      var year = todayDate.getFullYear();
      var month = todayDate.getMonth() + 1;
      if (month < 10) {
        month = "0" + month; //turn the month into ISO format
      }
      var day = todayDate.getDate();
      if (day < 10) {
        day = "0" + day;
      } //turn the day into ISO format

      var hour = todayDate.getHours();
      var min = todayDate.getMinutes();
      var sec = todayDate.getSeconds();
      return year + "_" + month + "_" + day + "_" + hour + "_" + min + "_" + sec;
  }
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
  }
})
