<template>
  <div class="visualizer">
    <svg class="visualizer-canvas">
      <g class="links"></g>
      <g class="nodes"></g>
      <g class="labels"></g>
    </svg>
  </div>
</template>

<style scoped>
.labels text {
  color: #fff;
}
.visualizer {
  display: flex;
  flex: 1;
}
.visualizer-canvas {
  flex: 1;
}
</style>

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
  @State viewLabels: any;
  @Getter("filteredGraph") graph: any; // Define graph interface types
  simulation: any;
  zoom: any;

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
      .force(
        "charge",
        d3.forceManyBody().strength(this.selectedNode ? -5500 : -2500)
      )
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
    this.zoom = d3
      .zoom()
      .scaleExtent([0.2, 10])
      .on("zoom", this.onZoom) as (
      selection: Selection<BaseType, {}, null, undefined>,
      ...args: any[]
    ) => void;

    d3.select(this.$el)
      .select("svg")
      .style("pointer-events", "all")
      .call(this.zoom);

    this.zoomAndPan(0, 0, 0.6);
  }

  onZoom() {
    d3.select(this.$el)
      .selectAll("g")
      .attr("transform", d3.event.transform);
  }

  zoomAndPan(x: number, y: number, scale: number) {
    const transition = d3
      .select(this.$el)
      .selectAll("g")
      .transition()
      .duration(1000);
    this.zoom.translateTo(transition, x, y);
    this.zoom.scaleTo(transition, scale);
  }

  ticked() {
    this.updateLinks();
    this.updateNodes();
    this.updateLabels();
  }

  ifSelectedNode(d: any, success: any, failure: any) {
    return this.selectedNode && d.id === this.selectedNode.id
      ? success
      : failure;
  }

  updateLabels() {
    const u = d3
      .select(this.$el)
      .select(".labels")
      .selectAll<SVGTextElement, {}>("text")
      .data(this.graph.nodes);

    u.enter()
      .append("text")
      .merge(u)
      .text((d: any) => d.alias)
      .attr("fill", "#555")
      .attr("x", (d: any) => d.x + this.ifSelectedNode(d, 23, 10))
      .attr("y", (d: any) => d.y + this.ifSelectedNode(d, 11, 4));

    u.exit().remove();
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
      .attr("r", (d: any) => this.ifSelectedNode(d, 21, 7))
      .attr("stroke", "#dedede")
      .attr("stroke-width", "1px")
      .attr("fill", (d: any) => d.color)
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .on("click", (d: any) => {
        this.setSelectedNode(this.ifSelectedNode(d, null, d));
        this.initializeSimulation();
        this.zoomAndPan(d.x, d.y, 1);
        this.onZoom();
      })
      .append("text");

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
