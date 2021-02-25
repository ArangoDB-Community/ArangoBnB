import axios from 'axios'

const API = process.env.VUE_APP_API_ENDPOINT

// initial state
export const state = () => ({
  moveEvents: [],
  //default map area
  mapArea: [[13.3733650830416,52.513472114606735],[13.380215444865636,52.513472114606735],[13.387065806689671,52.513472114606735],[13.387065806689671,52.51550916176831],[13.387065806689671,52.51754620892988],[13.380215444865636,52.51754620892988],[13.3733650830416,52.51754620892988],[13.3733650830416,52.51550916176831],[13.3733650830416,52.513472114606735]],
  listings: [],
  markers:[]
});

// getters
const getters = {
  getMoveEvents: (state) => {
    return state.moveEvents;
    },
  getMarkers: (state) => {
    const markers = state.markers;
    return markers;
  }
};

// // actions
const actions = {
  getResults: async ({ commit, state}, payload) => {
    payload ? (
        payload.mapArea ? await commit('setMapArea', payload.mapArea) : console.log('no mapArea')) : console.log('no payload')
    
    let data = JSON.stringify({"mapArea": state.mapArea});

    let config = {
      method: 'post',
      url: API + '/api/mapResults',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    await axios(config)
    .then( (response) => {
      commit("setResults", { listings: response.data });
      commit("setMarkers");
    })
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
  async setMapArea(state, mapArea) {
      state.mapArea = mapArea;
      return await state.mapArea;
  },
  setMarkers(state) {
    console.log("setting markers")
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