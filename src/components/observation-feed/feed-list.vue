<template>
  <div id="observation-feed">
    <recycle-scroller
      class="scroller"
      ref="scroller"
      :items="observations"
      :itemSize="80"
      keyField="id"
      v-slot="{ item }"
      v-show="showFeed"
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
  props: [ 'observations', 'showFeed' ],
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
      const idx = this.observations.map(m => m.id)
        .findIndex(i => i === this.scrollTo)

      console.log(`called scrollTo with id: ${this.scrollTo}, index: ${idx}`)
      console.log(this.observations[idx])
      this.$refs.scroller.scrollToItem(idx)
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
  height: 90%;
}

.scroller {
  height: 100%;
}
</style>
