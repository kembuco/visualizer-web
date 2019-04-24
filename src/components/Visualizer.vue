<template>
  <div id="content" style="height:100vh">
    <svg id="canvas" width="100%" height="100%">
      <g class="links"></g>
      <g class="nodes"></g>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import * as d3 from "d3";
import { Selection, BaseType } from "d3";

@Component
export default class Visualizer extends Vue {
  @Action loadGraph: any;
  @Action setSelectedNode: any;
  @State selectedNode: any;
  @Getter("filteredGraph") graph: any; // Define graph interface types
  simulation: any;

  async mounted() {
    const graph = await this.loadGraph();

    this.initializeSimulation();
    this.initializePanAndZoom();
  }

  initializeSimulation() {
    const container = d3.select(this.$el).node();
    const box = container
      ? container.getBoundingClientRect()
      : {
          width: 800,
          height: 600
        };

    this.simulation = d3
      .forceSimulation(this.graph.nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(box.width / 2, box.height / 2))
      .force(
        "link",
        d3
          .forceLink()
          .links(this.graph.edges)
          .id((d: any) => d.id)
      )
      .stop();

    // Run through the simulation as fast as possible
    for (let i = 0; i < 50; ++i) {
      this.simulation.tick();
    }

    // Draw the result
    this.ticked();
  }

  initializePanAndZoom() {
    d3.select(this.$el)
      .select("svg")
      .style("pointer-events", "all")
      .call(d3
        .zoom()
        .scaleExtent([0.2, 10])
        .on(
          "zoom",
          this.onZoom
        ) as (selection: Selection<BaseType, {}, null, undefined>, ...args: any[]) => void);
  }

  onZoom() {
    d3.select(this.$el)
      .selectAll("g")
      .attr("transform", d3.event.transform);
  }

  ticked() {
    this.updateLinks();
    this.updateNodes();
  }

  updateNodes() {
    const u = d3
      .select(this.$el)
      .select(".nodes")
      .selectAll<SVGCircleElement, {}>("circle")
      .data(this.graph.nodes);
    u.enter()
      .append("circle")
      .merge(u)
      .attr("r", 7)
      .attr("stroke", "#dedede")
      .attr("stroke-width", "1px")
      .attr("fill", (d: any) => d.color)
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .on("click", (d: any) => {
        this.setSelectedNode(
          this.selectedNode && d.id === this.selectedNode.id ? null : d
        );
      });

    u.exit().remove();
  }

  updateLinks() {
    const u = d3
      .select(this.$el)
      .select(".links")
      .selectAll<SVGLineElement, {}>("line")
      .data(this.graph.edges);

    u.enter()
      .append("line")
      .attr("stroke", "#cdcdcd")
      .merge(u)
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    u.exit().remove();
  }
}
</script>
