<template>
  <div class="w-auto mx-2 mt-3">
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
export default {
  name: 'ObservationFeedFilter',
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
    },
    emitApplyFilter () {
      this.$emit('apply-filter', this.queryParameters)
    }
  },
  computed: {
    queryParameters () {
      return ({
        limit: { first: this.first }
        // filter: {
        //   common_name: { like: `%${this.commonName}%` }
        // }
      })
    }
  }
}
</script>

<style>

</style>
