<template>
  <div class="map-dashboard flex flex-row">
    <div class="dashboard-left flex-grow-0 h-screen">
      <feed-container :observations="observationFeed" />
    </div>
    <div class="map-dash bg-green-500 flex-grow h-screen">
      <observation-map :observations="observationFeed" />
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import FeedContainer from '@/components/observation-feed/feed-container.vue'
import ObservationMap from '@/components/organisms/ObservationMap'
import { OBSERVATION_FEED_QUERY } from '@/graphql/ObservationFeed_AllQuery.js'

export default {
  name: 'home',
  components: {
    FeedContainer,
    ObservationMap
  },
  data () {
    return {
      observationFeed: [],
      queryParameters: {
        limit: { first: 25 }
      },
      mockParams: {}
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
  created () {
    EventBus.$on('eb-apply-filters', data => {
      console.log(JSON.stringify(data))
      this.queryParameters = data
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
