import Vue from 'vue'
import axios from 'axios'

const API = process.env.VUE_APP_API_ENDPOINT

// initial state
export const state = () => ({
  moveEvents: [],
  //default map area
  mapArea: [52.52038609931014, 13.387355804443361, 52.51223805957966, 13.373665809631348],
  listings: [],
  markers:[],
  mapPosition: {},
  currentAmenities: [],
  amenities: [],
  roomType: [],
  priceRange: [],
  clearMarkers: false,
  clickedListing: {}
});

// getters
const getters = {
  getMoveEvents: (state) => {
    return state.moveEvents;
    },
  getMarkers: (state) => {
    const markers = state.markers;
    return markers;
  },
  getMapPosition: (state) => {
    return state.mapPosition;
  }
};

// actions
const actions = {
  getResults: async ({commit, state}, payload) => {
    payload ? (
      payload.mapArea ? await commit('setMapArea', payload.mapArea) : console.log('no mapArea')) : console.log('no payload')
      

    let data = JSON.stringify({
      mapArea: state.mapArea,
      amenities: state.amenities,
      roomType: state.roomType,
      priceRange: state.priceRange      
    });

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
      let data = response.data[0]
      
      commit("setResults", data);
      commit("setMarkers");
      commit("setAmenities", data);
    })
  },
  setDestination: ({commit}, payload) => {
    try {
      commit('setMapPosition', payload)
    } catch (e) {
      console.log(e)
    }
  },
  setFilters: async ({commit, dispatch}, payload) => {
    payload.roomType ? commit("setSelectedRoomTypes", payload) : ''
    payload.amenities ? commit("setSelectedAmmenities", payload) : ''
    payload.priceRange ? commit("setSelectedPriceRange", payload) : ''
    await dispatch("getResults");
    commit("setClearMarkers", true);
  },
  listingClicked: ({commit}, payload) => {
    commit("setClickedListing", payload)

  }
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
    state.markers = [];
    state.listings.map( (listing) => {
        state.markers.push([{latitude: listing.latitude, longitude: listing.longitude, key: listing._key, name: listing.name}])
    })
  },
  setMapPosition(state, position){
    try {
      Vue.set(state, 'mapPosition', position.destination);
    } catch (e) {
      console.log(e);
    }
  },
  setAmenities(state, payload) {
    try {
      Vue.set(state, 'currentAmenities', payload.amenities);
    } catch(e) {
      console.log(e);
    }
  },
  setSelectedRoomTypes(state, payload) {
    try {
      Vue.set(state, 'roomType', payload.roomType)
    } catch(e) {
      console.log(e)
    }
  },
  setSelectedAmmenities(state, payload) {
    try {
      Vue.set(state, 'amenities', payload.amenities)
    } catch(e) {
      console.log(e)
    }
  },
  setSelectedPriceRange(state, payload) {
    try {
      Vue.set(state, 'priceRange', payload.priceRange)
    } catch(e) {
      console.log(e)
    }
  },
  setClearMarkers(state, payload) {
    console.log(payload)
    try{
      Vue.set(state, 'clearMarkers', payload)
    } catch (e) {
      console.log(e)
    }
  },
  setClickedListing(state, payload) {
    try {
      Vue.set(state, 'clickedListing', payload);
    } catch(e) {
      console.log(e)
    }
  },
};


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};