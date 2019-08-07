<template>
  <div>
    <l-map
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'

export default {
  name: 'ObservationMap',
  components: { LMap, LTileLayer },
  data () {
    return {
      zoom: 7,
      center: latLng(39.55, -117.0667),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
  }
}
</script>

<style>

</style>
