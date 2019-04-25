<template>
  <div class="info-container-content">
    <span v-if="!selectedNode">Click a node to view information</span>
    <div v-if="selectedNode">
      {{selectedNode}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class Info extends Vue {
  @State selectedNode: any;
}
</script>