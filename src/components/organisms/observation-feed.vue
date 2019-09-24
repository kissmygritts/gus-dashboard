<template>
  <div id="observation-feed" class="container bg-gray-200 h-screen p-2 overflow-y-auto">

    <div id="observation-feed-card"
         class="bg-white p-1 mb-1"
         v-for="(observation, key) in observations"
         :key="key"
         >

      <!-- card header -->
      <div id="observation-feed-card-header"
           class="flex flex-row justify-between">
        <span class="text-lg">{{ observation.common_name }}</span>
        <span class="text-lg">{{ observation.ind_id }}</span>
      </div>

      <!-- footer similar to bulma level layout -->
      <div id="observation-feed-card-footer"
           class="flex flex-row justify-between mt-2">
        <!-- level items -->
        <div class="text-center w-1/5 text-gray-800">
          <p class="uppercase text-xs font-thin border-b border-gray-500">date</p>
          <p class="capitalize text-sm font-light">{{ observation.obs_date }}</p>
        </div>

        <div class="text-center w-1/5 text-gray-800">
          <p class="uppercase text-xs font-thin border-b border-gray-500">sex</p>
          <p class="capitalize text-sm font-light">{{ observation.sex }}</p>
        </div>

        <div class="text-center w-1/5 text-gray-800">
          <p class="uppercase text-xs font-thin border-b border-gray-500">age</p>
          <p class="capitalize text-sm font-light">{{ observation.age_class }}</p>
        </div>

        <div class="text-center w-1/5 text-gray-800">
          <p class="uppercase text-xs font-thin border-b border-gray-500">status</p>
          <p class="capitalize text-sm font-light">{{ observation.life_status }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ObservationFeed',
  props: [ 'observationFeed' ],
  computed: {
    observations () {
      return this.observationFeed.map(m => {
        const date = new Date(m.event_start_timestamp)
        const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

        return {
          id: m.id,
          common_name: m.common_name,
          obs_date: formattedDate,
          ...m.wildlife_encounters[0]
        }
      })
    }
  }
}
</script>

<style scoped>
#observation-feed {
  min-width: 380px;
  max-width: 455px;
}

#observation-feed-card {
  min-width: 375px;
  max-width: 450px;
}
</style>
