<template>
  <div class="home">
    <Visualizer />
  </div>
</template>

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
