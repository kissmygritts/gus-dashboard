<template>
  <div class="map-dashboard flex flex-row">
    <observation-feed class="flex-grow-0" :observationFeed="observationFeed" v-if="!$apollo.loading" />
    <observation-map class="flex-grow h-screen"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ObservationFeed from '@/components/organisms/ObservationFeed.vue'
import ObservationMap from '@/components/organisms/ObservationMap.vue'
import { OBSERVATION_FEED_QUERY } from '@/graphql/ObservationFeed_AllQuery.js'

export default {
  name: 'home',
  components: {
    ObservationFeed,
    ObservationMap
  },
  apollo: {
    observationFeed: OBSERVATION_FEED_QUERY
  }
}
</script>
