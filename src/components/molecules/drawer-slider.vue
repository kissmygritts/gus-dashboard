<template>
  <div class="drawer-slider h-screen bg-gray-200"
    v-if="visible"
    :style="styleObject"
  >
    <button class="border p-4 border-purple-500" @click="toggleDrawer">Close Drawer</button>
    <p v-if="eventUUID">{{ eventUUID }}</p>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  name: 'DrawerSlider',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    drawerWidth: {
      type: String,
      default: '30%'
    }
  },
  data () {
    return {
      eventUUID: null,
      latLng: null
    }
  },
  computed: {
    styleObject () {
      return { width: `${this.drawerWidth}` }
    }
  },
  methods: {
    toggleDrawer () {
      this.$emit('drawer-visible', { visible: false })
    }
  },
  created () {
    EventBus.$on('eb-card-clicked', data => {
      this.eventUUID = data.eventUUID
      this.latLng = data.latLng
    })
  },
  updated () {
    console.log('updated')
    EventBus.$emit('eb-drawer-slider:update', {
      visible: this.visible,
      data: {
        eventUUID: this.eventUUID,
        latLng: this.latLng
      }
    })
  }
}
</script>

<style scoped>
/* for overlay instead of next to for the drawer
.drawer-slider {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
} */
</style>
