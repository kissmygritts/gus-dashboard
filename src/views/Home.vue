<template>
  <div class="map-dashboard flex flex-row">
    <div class="dashboard-left flex-grow-0 h-screen">
      <feed-container :observations="observationFeed" />
    </div>
    <div class="map-dash bg-green-500 flex-grow h-screen">map</div>
  </div>

  <!-- <div class="map-dashboard flex flex-row">
    <div class="dashboard-left bg-gray-200 flex-grow-0">
      <observation-feed-filter @apply-filter="applyFilter" />
      <observation-feed class="flex-grow-0" :observationFeed="observationFeed" v-if="!$apollo.queries.observationFeed.loading" />
      <div v-else>loading...</div>
    </div>
    <observation-map class="flex-grow h-screen" :mapPoints="mapPoints" />
  </div> -->
</template>

<script>
import { EventBus } from '@/event-bus.js'
import FeedContainer from '@/components/observation-feed/feed-container.vue'
import { data } from '@/assets/data.js'

export default {
  name: 'home',
  components: { FeedContainer },
  data () {
    return {
      observationFeed: data
    }
  },
  created () {
    EventBus.$on('eb-apply-filters', data => {
      console.log(JSON.stringify(data))
    })
  }
}

// import { latLng } from 'leaflet'
// import ObservationFeed from '@/components/organisms/ObservationFeed.vue'
// import ObservationMap from '@/components/organisms/ObservationMap.vue'
// import ObservationFeedFilter from '@/components/organisms/ObservationFeedFilter.vue'
// import { OBSERVATION_FEED_QUERY } from '@/graphql/ObservationFeed_AllQuery.js'

// export default {
//   name: 'home',
//   components: {
//     ObservationFeed,
//     ObservationMap,
//     ObservationFeedFilter
//   },
//   data () {
//     return {
//       observationFeed: [],
//       queryParameters: {
//         limit: { first: 5 }
//       }
//     }
//   },
//   apollo: {
//     observationFeed: {
//       query: OBSERVATION_FEED_QUERY,
//       variables () {
//         return ({
//           ...this.queryParameters
//         })
//       }
//     }
//   },
//   methods: {
//     applyFilter (e) {
//       console.log(e)
//       this.queryParameters = e
//     }
//   },
//   computed: {
//     mapPoints () {
//       if (!this.$apollo.loading) {
//         return this.observationFeed.map(m => {
//           const date = new Date(m.event_start_timestamp)
//           const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
//           return {
//             event_uuid: m.event_uuid,
//             common_name: m.common_name,
//             event_date: formattedDate,
//             ind_id: m.wildlife_encounters[0].ind_id,
//             latLng: latLng([ m.y, m.x ])
//           }
//         })
//       } else {
//         return {}
//       }
//     }
//   }
// }
</script>

<style scoped>
.dashboard-left {
  min-width: 380px;
  max-width: 455px;
}
</style>
