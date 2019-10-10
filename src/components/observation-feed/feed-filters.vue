<template>
  <div class="w-auto my-3 mx-3">
    <button
      class="btn w-full"
      v-if="showFilters"
      @click="toggleShowFilters">
      Close Filters
    </button>

    <div id="filters" class="my-4" v-if="showFilters">

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
        <label for="year" class="block text-gray-700 text-sm font-bold mb-1">
          Year
        </label>
        <input type="text" id="year" placeholder="2018"
          class="shadow appearance-none-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="year">
      </div>

      <div class="mb-3">
        <label for="limit" class="block text-gray-700 text-sm font-bold mb-1">
          How Many Records?
        </label>
        <input type="number" id="limit" placeholder="25"
          class="shadow appearance-none-border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model.number="first">
      </div>

    </div>

    <!-- filter buttons -->
    <button
      class="btn w-full"
      v-if="showFilters"
      @click="emitApplyFilter">
      Apply Filters
    </button>
    <button
      v-else
      class="btn w-full"
      @click="toggleShowFilters"
    >
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
      commonName: null,
      year: null,
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
      console.log(query)
      return query
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0.25rem;
  color: #553c9a;
  border: 1px solid #553c9a;
  border-radius: 2px;
  background-position: center;
  transition: background 0.25s;
}

.btn:hover {
  color: #ffffff;
  background-color: #553c9a;
  /* background: #553c9a radial-gradient(circle, transparent 1%, #553c9a 1%) center/15000%; */
}

.btn:active {
  background-color: #8877b8;
  background-size: 100%;
  transition: background 0s;
}
</style>
