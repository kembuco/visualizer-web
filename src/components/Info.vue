<template>
  <div class="info-container-content">
    <span v-if="!node">Click a node to view information</span>
    <div v-if="node">
      <div class="info-item">
        <div class="info-item-label">Alias</div>
        <div class="info-item-value">{{node.alias}}</div>
      </div>

      <div class="info-item">
        <div class="info-item-label">Public Key</div>
        <div class="info-item-value">{{node.pubKey}}</div>
      </div>

      <div class="info-item">
        <div class="info-item-label">Addresses</div>
        <div class="info-item-value">
          <span v-if="!node.addresses || !node.addresses.length">No addresses</span>
          <ul>
            <li v-for="item in node.addresses" :key="item.id">
              {{ item.addr }} ({{ item.network }})
            </li>
          </ul>
        </div>
      </div>

      <div class="info-item">
        <div class="info-item-label">Color</div>
        <div class="info-item-value">
          <span class="color-box" :style="{background: node.color}"></span> {{node.color}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-item {
  margin-bottom: 10px;
}
.info-item-label {
  font-weight: 500;
}
pre {
  color: #555
}
ul, li {
  margin-bottom: 0;
}
.color-box {
  height: 12px;
  width: 12px;
  display: inline-block;
  border: 1px solid #fff;
}
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class Info extends Vue {
  @State("selectedNode") node: any;
}
</script>