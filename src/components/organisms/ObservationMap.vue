<template>
  <div class="h-screen" ref="mapContainer">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      v-if="showMap"
    >
      <!-- basemap layers -->
      <l-tile-layer :url="url" />

      <!-- markers on the map -->
      <l-circle-marker
        v-for="(point, index) in mapPoints"
        :key="index"
        :latLng="point.latLng"
        @click="handleMarkerClick(point.id)"
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LCircleMarker } from 'vue2-leaflet'
import { EventBus } from '@/event-bus.js'

export default {
  name: 'ObservationMap',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  props: [ 'observations' ],
  data () {
    return {
      showMap: true,
      zoom: 7,
      center: latLng(39.55, -117.0667),
      url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }
  },
  computed: {
    mapPoints () {
      return this.observations.map(m => {
        return {
          id: m.event_uuid,
          species: m.common_name,
          ind_id: m.wildlife_encounters ? m.wildlife_encounters[0].ind_id : '--',
          latLng: latLng([ m.y, m.x ])
        }
      })
    },
    mapContainerDims () {
      return this.$refs.mapContainer.clientWidth
    }
  },
  methods: {
    handleMarkerClick (id) {
      console.log(id)
      EventBus.$emit('eb-marker-click', id)
    }
    // handleMouseOver (e) {
    //   console.log('hover mouse over')
    //   console.log(e)
    // },
    // handleMouseOut (e) {
    //   console.log('hover mouse out')
    //   console.log(e)
    // }
  },
  created () {
    this.$nextTick(() => {
      EventBus.$on('eb-drawer-slider:update', ({ visible, data }) => {
        this.$refs.map.mapObject.invalidateSize()

        if (visible) {
          this.$refs.map.mapObject.setView(
            latLng(data.latLng.lat, data.latLng.lng),
            12
          )
        } else {
          this.$refs.map.mapObject.setView(
            this.center,
            this.zoom
          )
        }
      })
    })
  }
}
</script>

<style>

</style>
