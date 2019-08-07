<template>
  <div class="map-dashboard flex flex-row">
    <observation-feed class="flex-grow-0" :observationFeed="observationFeed" v-if="!$apollo.loading" />
    <observation-map class="flex-grow h-screen" :mapPoints="mapPoints" />
  </div>
</template>

<script>
import { latLng } from 'leaflet'
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
  },
  computed: {
    mapPoints () {
      if (!this.$apollo.loading) {
        return this.observationFeed.map(m => {
          const date = new Date(m.event_start_timestamp)
          const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

          return {
            event_uuid: m.event_uuid,
            common_name: m.common_name,
            event_date: formattedDate,
            ind_id: m.wildlife_encounters[0].ind_id,
            latLng: latLng([ m.y, m.x ])
          }
        })
      } else {
        return {}
      }
    }
  }
}
</script>
