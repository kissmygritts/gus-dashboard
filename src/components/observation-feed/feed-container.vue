<template>
  <div class="container bg-gray-200 h-screen p-2 overflow-y-auto">
    <feed-filters />
    <feed-list :observations="formattedObservations" />
  </div>
</template>

<script>
import FeedFilters from './feed-filters.vue'
import FeedList from './feed-list.vue'

export default {
  name: 'FeedContainer',
  components: { FeedFilters, FeedList },
  props: [ 'observations' ],
  computed: {
    formattedObservations () {
      return this.observations.map(m => {
        const date = new Date(m.event_start_timestamp)
        const formattedDate = `${date.getMonth() +
          1}-${date.getDate()}-${date.getFullYear()}`

        return {
          event_uuid: m.event_uuid,
          common_name: m.common_name,
          obs_date: formattedDate,
          ...m.wildlife_encounters[0]
        }
      })
    }
  }
}
</script>

<style>

</style>
