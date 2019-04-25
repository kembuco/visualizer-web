import Vue from "vue";
import Vuex, { Store } from "vuex";
import GraphService from "./service/graph-service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    graph: {
      nodes: [],
      edges: []
    },
    selectedNode: null,
    viewLabels: false
  },

  mutations: {
    setGraph(state, graph) {
      state.graph = graph;
    },

    setSelectedNode(state, node) {
      state.selectedNode = node;
    }
  },

  getters: {
    filteredGraph(state) {
      const selected: any = state.selectedNode;
      const validNodes = new Set();
      const graph = {
        nodes: [...state.graph.nodes],
        edges: [...state.graph.edges]
      };

      if (selected !== null) {
        graph.edges = graph.edges.filter((edge: any) => {
          const matches =
            edge.source.id === selected.id || edge.target.id === selected.id;

          if (matches) {
            validNodes.add(edge.source.id).add(edge.target.id);
          }

          return matches;
        });

        graph.nodes = graph.nodes.filter((node: any) =>
          validNodes.has(node.id)
        );
      }

      return graph;
    }
  },

  actions: {
    setSelectedNode({ commit }, node) {
      commit("setSelectedNode", node);
    },

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
