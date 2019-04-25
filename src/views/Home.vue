<template>
  <div class="home">
    <div class="info-container">
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
  flex: 1;
}

.info-container {
  flex: 0 0 300px;
  background: #444;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Visualizer from "@/components/Visualizer.vue";

@Component({
  components: {
    Visualizer
  }
})
export default class Home extends Vue {}
</script>
