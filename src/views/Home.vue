<template>
  <div class="map-dashboard">
    <observation-feed :observationFeed="observationFeed" v-if="!$apollo.loading" />
  </div>
</template>

<script>
// @ is an alias to /src
import ObservationFeed from '@/components/organisms/ObservationFeed.vue'
import { OBSERVATION_FEED_QUERY } from '@/graphql/ObservationFeed_AllQuery.js'

export default {
  name: 'home',
  components: {
    ObservationFeed
  },
  apollo: {
    observationFeed: OBSERVATION_FEED_QUERY
  }
}
</script>
