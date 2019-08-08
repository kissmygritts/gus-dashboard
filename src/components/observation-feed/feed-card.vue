<template>
  <div class="observation-feed-card bg-white p-1 mb-1">
    <div class="flex flex-row justify-between">
      <span class="text-lg">{{ observation.common_name }}</span>
      <span class="text-lg">{{ observation.ind_id }}</span>
    </div>
    <div class="flex flex-row justify-between mt">
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
</template>

<script>
export default {
  name: 'FeedCard',
  props: [ 'observation' ]
}
</script>

<style scoped>
.observation-feed-card {
  min-width: 375px;
  max-width: 540px;
}
</style>
