<template>
  <div id="container">
    <div id="map"></div>
    <canvas id="deck-canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// @ts-ignore
import { Deck } from '@deck.gl/core';
// @ts-ignore
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers';
// @ts-ignore
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS = "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

// Set your mapbox token here
mapboxgl.accessToken = "pk.eyJ1Ijoia2VtYnVjbyIsImEiOiJjamN0azFzNGUwbDE0Mndtb3ljNGx6dGFvIn0.5-kSy33YMBIjTi3s4ZGVsw";

@Component
export default class Visualizer extends Vue {
  private deck: Deck;
  private map: Map;

  mounted() {
    const INITIAL_VIEW_STATE = {
      latitude: 51.47,
      longitude: 0.45,
      zoom: 4,
      bearing: 0,
      pitch: 30
    };

    const map = this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      interactive: false,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch
    });

    this.deck = new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      onViewStateChange: ({ viewState }: { viewState: any }) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        });
      },
      layers: [
        new GeoJsonLayer({
          id: 'airports',
          data: AIR_PORTS,
          // Styles
          filled: true,
          pointRadiusMinPixels: 2,
          opacity: 1,
          pointRadiusScale: 2000,
          getRadius: ( f: any ) => 11 - f.properties.scalerank,
          getFillColor: [200, 0, 80, 180],
          // Interactive props
          pickable: true,
          autoHighlight: true,
          onClick: ( info: any ) =>
            // eslint-disable-next-line
            info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
        }),
        new ArcLayer({
          id: 'arcs',
          data: AIR_PORTS,
          dataTransform: ( d: any ) => d.features.filter( ( f: any) => f.properties.scalerank < 4),
          // Styles
          getSourcePosition: ( f: any ) => [-0.4531566, 51.4709959], // London
          getTargetPosition: ( f: any ) => f.geometry.coordinates,
          getSourceColor: [0, 128, 200],
          getTargetColor: [200, 0, 80],
          getWidth: 1
        })
      ]
    });
  }
}
</script>

<style scoped>
  #container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #container > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>