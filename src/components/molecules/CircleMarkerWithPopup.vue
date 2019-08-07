<template>
  <l-circle-marker
    :latLng="latLng"
    :radius="radius"
    :weight="weight"
    :color="color"
    :fillColor="fillColor"
    :fillOpacity="fillOpacity"
  >
    <l-popup><slot></slot></l-popup>
  </l-circle-marker>
</template>

<script>
import { LCircleMarker, LPopup } from 'vue2-leaflet'

export default {
  name: 'CircleMarkerWithPopup',
  components: { LCircleMarker, LPopup },
  props: {
    latLng: {
      type: Object,
      required: true
    },
    radius: {
      type: Number,
      default: 5
    },
    weight: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#6958d0'
    },
    fillColor: {
      type: String,
      default: '#6958d0'
    },
    fillOpacity: {
      type: Number,
      default: 0.65
    }
  }
}
</script>

<style>

</style>
