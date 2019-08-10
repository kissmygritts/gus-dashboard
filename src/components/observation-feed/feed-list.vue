<template>
  <div id="observation-feed">
    <button @click="scrollToItem">Scroll Test Button</button>
    <recycle-scroller
      ref="scroller"
      :items="observations"
      :item-size="80"
      key-field="event_uuid"
      v-slot="{ item }"
    >
      <feed-card :observation="item" />
    </recycle-scroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import FeedCard from './feed-card.vue'
import { EventBus } from '@/event-bus.js'

export default {
  name: 'FeedList',
  components: { RecycleScroller, FeedCard },
  props: [ 'observations' ],
  data () {
    return {
      scrollTo: null
    }
  },
  watch: {
    scrollTo (oldValue, newValue) {
      this.scrollToItem()
    }
  },
  methods: {
    scrollToItem () {
      // const idx = this.observations.map(m => m.event_uuid)
      //   .findIndex(i => i === this.scrollTo)

      // console.log(`called scrollTo with id: ${this.scrollTo}, index: ${idx}`)
      // (this.$refs.scroller).scrollToItem(78)
      console.log(this.$refs.scroller)
    }
  },
  created () {
    EventBus.$on('eb-marker-click', id => {
      this.scrollTo = id
    })
  }
}
</script>

<style scoped>
#observation-feed {
  min-width: 380px;
  max-width: 455px;
}
</style>
