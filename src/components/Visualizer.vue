<template>
  <pre>
    {{ JSON.stringify(graph, null, 2) }}
  </pre>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";

@Component
export default class Visualizer extends Vue {
  @Action loadGraph: any;
  @State graph: any; // Define graph interface

  mounted() {
    this.loadGraph();
  }
}
</script>
