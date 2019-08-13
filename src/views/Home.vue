<template>
  <div class="map-dashboard flex flex-row">
    <div class="dashboard-left flex-grow-0 h-screen">
      <feed-container :observations="observationFeed" />
    </div>
    <div class="map-dash bg-green-500 flex-grow h-screen">
      <observation-map :observations="observationFeed" />
    </div>
    <drawer-slider :visible="drawerVisible" @drawer-visible="toggleDrawer" />
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import FeedContainer from '@/components/observation-feed/feed-container.vue'
import ObservationMap from '@/components/organisms/ObservationMap.vue'
import DrawerSlider from '@/components/molecules/drawer-slider.vue'
import { OBSERVATION_FEED_QUERY } from '@/graphql/ObservationFeed_AllQuery.js'

export default {
  name: 'home',
  components: {
    FeedContainer,
    ObservationMap,
    DrawerSlider
  },
  data () {
    return {
      observationFeed: [],
      queryParameters: {
        limit: { first: 100 }
      },
      mockParams: {},
      drawerVisible: false
    }
  },
  apollo: {
    observationFeed: {
      query: OBSERVATION_FEED_QUERY,
      variables () {
        return {
          ...this.queryParameters
        }
      }
    }
  },
  methods: {
    toggleDrawer () {
      this.drawerVisible = !this.drawerVisible
    }
  },
  created () {
    EventBus.$on('eb-apply-filters', data => {
      console.log(JSON.stringify(data))
      this.queryParameters = data
    })

    EventBus.$on('eb-card-clicked', data => {
      console.log(JSON.stringify(data))
      this.drawerVisible = true
    })
  }
}
</script>

<style scoped>
.dashboard-left {
  min-width: 380px;
  max-width: 455px;
}
</style>
