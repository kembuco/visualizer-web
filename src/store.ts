import Vue from "vue";
import Vuex from "vuex";
import GraphService from "./service/graph-service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    graph: null
  },

  mutations: {
    setGraph(state, graph) {
      state.graph = graph;
    }
  },

  actions: {
    async loadGraph({ commit }) {
      const graph = await GraphService.describe();

      commit("setGraph", graph);
    }
  }
});
