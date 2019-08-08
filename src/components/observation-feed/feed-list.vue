<template>
  <div id="observation-feed">
    <feed-card v-for="(observation, key) in observations" :key="key" :observation="observation" />
  </div>
</template>

<script>
import FeedCard from './feed-card'

export default {
  name: 'FeedList',
  components: { FeedCard },
  props: [ 'observations' ]
}
</script>

<style scoped>
#observation-feed {
  min-width: 380px;
  max-width: 455px;
}
</style>
