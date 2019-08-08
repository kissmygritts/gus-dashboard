<template>
  <div id="observation-feed">
    <recycle-scroller
      class="scroller"
      :items="observations"
      :item-size="104"
      key-field="event_uuid"
      v-slot="{ item }"
    >
      <feed-card :observation="item" />
    </recycle-scroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import FeedCard from './feed-card'

export default {
  name: 'FeedList',
  components: { RecycleScroller, FeedCard },
  props: [ 'observations' ]
}
</script>

<style scoped>
#observation-feed {
  min-width: 380px;
  max-width: 455px;
}
</style>
