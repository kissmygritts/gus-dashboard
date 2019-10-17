<template>
  <div class="h-screen" ref="mapContainer">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      v-if="showMap"
    >
      <!-- basemap layers -->
      <l-control-layers position="topright" />
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
      />

      <!-- markers on the map -->
      <marker-with-tooltip
        v-for="(point, index) in mapPoints"
        :key="index"
        :latLng="point.latLng"
        color="#553c9a"
        fillColor="#553c9a"
        :fillOpacity=0.6
        :radius=5
        :weight=1
        @click="handleMarkerClick(point.id)"
      >
        {{ point.species }}: {{ point.ind_id }}
      </marker-with-tooltip>

      <l-circle-marker
        v-if="hoveredFeedCard"
        :latLng="hoveredFeedCard.latLng"
        color="#4f68ba"
        fillColor="#4f68ba"
        :fillOpacity=1
        :radius=8
        :weight=2
      />
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LControlLayers, LCircleMarker } from 'vue2-leaflet'
import MarkerWithTooltip from '@/components/molecules/marker-with-tooltip.vue'
import { EventBus } from '@/event-bus.js'

export default {
  name: 'observation-map',

  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LCircleMarker,
    MarkerWithTooltip
  },

  props: [ 'observations' ],

  data () {
    return {
      showMap: true,
      zoom: 7,
      center: latLng(39.55, -117.0667),
      url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      hoveredFeedCard: null,
      tileProviders: [
        {
          name: 'Light Mode',
          visible: true,
          url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }, {
          name: 'Dark Mode',
          visible: false,
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }, {
          name: 'Physical Map',
          visible: false,
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service'
        }, {
          name: 'Topo Map',
          visible: false,
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }, {
          name: 'Imagery',
          visible: false,
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
      ]
    }
  },

  computed: {
    mapPoints () {
      return this.observations.map(m => {
        return {
          id: m.id,
          species: m.encounters_observation_feed[0].common_name || 'unk',
          ind_id: m.encounters_observation_feed[0].ind_id || '--',
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

      EventBus.$on('eb-feed-card:mouseenter', data => {
        this.hoveredFeedCard = data
      })
    })
  }
}
</script>

<style>

</style>
