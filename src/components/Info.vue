<template>
  <div class="info-container-content">
    <div v-if="networkInfo && !selectedNode">
      <div class="info-item">
        <div class="info-item-label">Average Out Degree</div>
        <div class="info-item-value">{{ networkInfo.avgOutDegree }}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Max Out Degree</div>
        <div class="info-item-value">
          {{ format(networkInfo.maxOutDegree, ",") }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Number of Nodes</div>
        <div class="info-item-value">
          {{ format(networkInfo.numNodes, ",") }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Number of Channels</div>
        <div class="info-item-value">
          {{ format(networkInfo.numChannels, ",") }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Total Network Capacity</div>
        <div class="info-item-value">
          {{ format(networkInfo.totalNetworkCapacity, ",") }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Average Channel Size</div>
        <div class="info-item-value">
          {{ format(networkInfo.avgChannelSize, ",") }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Minimum Channel Size</div>
        <div class="info-item-value">
          {{ format(networkInfo.minChannelSize, ",") }}
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Maximum Channel Size</div>
        <div class="info-item-value">
          {{ format(networkInfo.maxChannelSize, ",") }}
        </div>
      </div>

      <div class="instructions">
        Click a node to view it's information
      </div>
    </div>

    <div v-if="selectedNode">
      <div class="info-item">
        <div class="info-item-label">Alias</div>
        <div class="info-item-value">{{ selectedNode.alias }}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Public Key</div>
        <div class="info-item-value">{{ selectedNode.pubKey }}</div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Addresses</div>
        <div class="info-item-value">
          <span v-if="!hasAddresses">No addresses</span>
          <ul>
            <li v-for="item in selectedNode.addresses" :key="item.id">
              {{ item.addr }} ({{ item.network }})
            </li>
          </ul>
        </div>
      </div>
      <div class="info-item">
        <div class="info-item-label">Color</div>
        <div class="info-item-value">
          <div
            class="color-box"
            :style="{ background: selectedNode.color }"
          ></div>
          {{ selectedNode.color }}
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
  color: #404040;
}
ul,
li {
  margin-bottom: 0;
}
.color-box {
  height: 12px;
  width: 12px;
  display: inline-block;
  border: 1px solid #fff;
}

.instructions {
  border-top: 1px solid #999;
  padding-top: 10px;
  font-style: italic;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { format } from "d3";

@Component
export default class Info extends Vue {
  @State selectedNode: any;
  @State networkInfo: any;
  @Action loadNetworkInfo: any;

  async mounted() {
    await this.loadNetworkInfo();
  }

  get hasAddresses() {
    const { addresses } = this.selectedNode;
    return addresses && addresses.length;
  }

  format(value: number, specifier: string) {
    return format(specifier)(value);
  }
}
</script>
