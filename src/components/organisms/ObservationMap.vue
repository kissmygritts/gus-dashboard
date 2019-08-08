<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      v-if="showMap"
    >
      <!-- basemap layers -->
      <l-tile-layer :url="url" />

      <!-- markers on the map -->
      <circle-marker-with-popup
        v-for="(point, index) in mapPoints"
        :key="index"
        :latLng="point.latLng"
      >
        <ul>
          <li>NDOWID: {{ point.ind_id }}</li>
          <li>Species: {{ point.common_name }}</li>
          <li>Date: {{ point.event_date }}</li>
        </ul>
      </circle-marker-with-popup>
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'
import CircleMarkerWithPopup from '@/components/molecules/CircleMarkerWithPopup.vue'

export default {
  name: 'ObservationMap',
  components: { LMap, LTileLayer, CircleMarkerWithPopup },
  props: [ 'mapPoints' ],
  data () {
    return {
      showMap: false,
      zoom: 7,
      center: latLng(39.55, -117.0667),
      url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }
  }
}
</script>

<style>

</style>
