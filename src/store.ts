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

      //TODO: pryper type annotations
      graph.nodes = graph.nodes.map((node: any) => {
        node.id = node.pubKey;
        return node;
      });

      graph.edges = graph.edges.map((edge: any) => {
        edge.source = edge.node1Pub;
        edge.target = edge.node2Pub;
        return edge;
      });

      commit("setGraph", graph);

      return graph;
    }
  }
});
