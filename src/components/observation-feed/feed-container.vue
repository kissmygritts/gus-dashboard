<template>
  <div class="feed-container container bg-gray-200 h-screen p-2">
    <feed-filters
      class="feed-container__filter-wrapper"
      @toggle-feed-filters="toggleFeed"
    />
    <feed-list
      class="feed-container__feed-list"
      :observations="formattedObservations"
      :showFeed="showFeed"
    />
  </div>
</template>

<script>
import FeedFilters from './feed-filters.vue'
import FeedList from './feed-list.vue'

export default {
  name: 'FeedContainer',
  components: { FeedFilters, FeedList },
  props: [ 'observations' ],
  data () {
    return {
      showFeed: true
    }
  },
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
  },
  methods: {
    toggleFeed () {
      this.showFeed = !this.showFeed
    }
  }
}
</script>

<style>
.feed-container {
  display: flex;
  flex-direction: column;
}

.feed-container__filter-wrapper {
  flex-grow: 0;
}

.feed-container__feed-list {
  flex-grow: 1;
}
</style>
