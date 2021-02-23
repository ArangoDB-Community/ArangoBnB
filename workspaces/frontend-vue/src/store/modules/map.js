import axios from 'axios'

const API = process.env.VUE_APP_API_ENDPOINT

// initial state
export const state = () => ({
  moveEvents: [],
  //default map area
  mapArea: [[13.145828, 52.403257], [13.440742, 52.403257], [13.735657, 52.403257], [13.735657, 52.532533], [13.735657, 52.661808], [13.440742, 52.661808], [13.145828, 52.661808], [13.145828, 52.532533], [13.145828, 52.403257]],
  listings: [],
  markers:[]
});

// getters
const getters = {
  getMoveEvents: (state) => {
    return state.moveEvents;
  }
};

// // actions
const actions = {
  getResults: ({ commit, state}, payload) => {
    payload ? (
        payload.mapArea ? commit('setMapArea', payload.mapArea) : console.log('no mapArea')) : console.log('no payload')
    
    let data = JSON.stringify({"mapArea": state.mapArea});


    let config = {
      method: 'post',
      url: API + '/api/mapResults',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
    .then((response) => {
      commit("setResults", { listings: response.data });
      commit("setMarkers");
    });
  },
};

// mutations
const mutations = {
  setEvents(state, payload) {
    if (state.moveEvents.length > 25) {
      state.moveEvents = state.moveEvents.slice(0, 25);
    }
    state.moveEvents.unshift(`${payload.type}: ${payload.text}`);
  },
  setResults(state, payload) {
    state.listings = payload.listings;
  },
  setMapArea(state, mapArea) {
      state.mapArea = mapArea;
  },
  setMarkers(state) {
    state.markers = [];
    state.listings.map( (listing) => {
        state.markers.push([listing.latitude, listing.longitude])
    })
  }
};


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};