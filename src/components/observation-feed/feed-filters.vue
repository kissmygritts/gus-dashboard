<template>
  <div class="w-auto my-3">
    <button
      class="w-full py-1 text-blue-400 border border-blue-400 border-2 rounded-sm hover:bg-blue-400 hover:text-white mb-2"
      v-if="showFilters"
      @click="toggleShowFilters">
      Close Filters
    </button>

    <div id="filters" v-if="showFilters">

      <!-- input group -->
      <div class="mb-3">
        <label for="common_name" class="block text-gray-700 text-sm font-bold mb-1">
          Common Name
        </label>
        <input type="text" id="common_name" placeholder="desert bighorn sheep"
          class="shadow appearance-none-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="commonName">
      </div>

      <div class="mb-3">
        <label for="limit" class="block text-gray-700 text-sm font-bold mb-1">
          How Many Records?
        </label>
        <input type="number" id="limit" placeholder="desert bighorn sheep"
          class="shadow appearance-none-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model.number="first">
      </div>

    </div>

    <!-- filter buttons -->
    <button
      class="w-full py-1 text-purple-800 border border-purple-800 border-2 rounded-sm hover:bg-purple-800 hover:text-white"
      v-if="showFilters"
      @click="emitApplyFilter">
      Apply Filters
    </button>
    <button
      class="w-full py-1 text-purple-800 border border-purple-800 border-2 rounded-sm hover:bg-purple-800 hover:text-white"
      v-else
      @click="toggleShowFilters">
      Open Filters
    </button>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  name: 'FeedFilters',
  data () {
    return {
      showFilters: false,
      commonName: '',
      first: 25
    }
  },
  methods: {
    toggleShowFilters () {
      this.showFilters = !this.showFilters
      this.$emit('toggle-feed-filters', this.showFilters)
    },
    emitApplyFilter () {
      this.toggleShowFilters()
      EventBus.$emit('eb-apply-filters', this.queryParameters)
    }
  },
  computed: {
    queryParameters () {
      let limit = {
        first: this.first
      }
      let filter = {}
      let query = { limit }

      if (this.commonName) filter.common_name = { like: `%${this.commonName}%` }
      if (Object.keys(filter).length !== 0) query.filter = filter

      return query
    }
  }
}
</script>

<style>

</style>
