<template>
  <div class="home">
    <div class="info-container">
      <h3>Network Visualizer</h3>
      <Info />
    </div>
    <div class="visualizer-container">
      <Visualizer />
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex: 1;
}

.visualizer-container {
  display: flex;
  flex: 1;
}

.info-container {
  flex: 0 0 300px;
  background: #444;
  border-right: 1px solid #bfbfbf;
  color: #f6f6f6;
  display: flex;
  flex-direction: column;
}

.info-container h3 {
  background-color: rgba(255, 165, 24, 1);
  text-align: center;
  padding: 15px;
  margin-bottom: 0;
  color: #262525;
  letter-spacing: 0.1rem;
}

.info-container-content {
  padding: 15px;
  max-width: 300px;
  overflow: auto;
  flex: 1;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Visualizer from "@/components/Visualizer.vue";
import Info from "@/components/Info.vue";

@Component({
  components: {
    Visualizer,
    Info
  }
})
export default class Home extends Vue {}
</script>
