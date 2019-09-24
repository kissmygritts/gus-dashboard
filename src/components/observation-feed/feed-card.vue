<template>
  <div class="observation-feed-card bg-white p-1 mb-1 cursor-pointer"
    @click="cardClicked"
    @mouseenter="emitMouseEnter"
    @mouseleave="emitMouseLeave"
  >
    <div class="flex flex-row justify-between">
      <span class="text-lg">{{ observation.species.common_name }}</span>
      <span class="text-lg">{{ observation.encounter.ind_id }}</span>
    </div>
    <div class="flex flex-row justify-between mt">
      <div class="text-center w-1/5 text-gray-800">
        <p class="uppercase text-xs font-thin border-b border-gray-500">date</p>
        <p class="capitalize text-xs font-light pt-1 align-baseline">{{ observation.obs_date }}</p>
      </div>
      <div class="text-center w-1/5 text-gray-800">
        <p class="uppercase text-xs font-thin border-b border-gray-500">sex</p>
        <p class="capitalize text-sm font-light">{{ observation.encounter.sex }}</p>
      </div>
      <div class="text-center w-1/5 text-gray-800">
        <p class="uppercase text-xs font-thin border-b border-gray-500">age</p>
        <p class="capitalize text-sm font-light">{{ observation.encounter.age_class }}</p>
      </div>
      <div class="text-center w-1/5 text-gray-800">
        <p class="uppercase text-xs font-thin border-b border-gray-500">status</p>
        <p class="capitalize text-sm font-light">{{ formatHarvest }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  name: 'FeedCard',
  props: [ 'observation' ],
  computed: {
    formatHarvest () {
      const lifeStatus = this.observation.encounter.life_status
      if (lifeStatus === 'hunter harvest') {
        return 'harvest'
      } else {
        return lifeStatus
      }
    }
  },
  methods: {
    cardClicked () {
      EventBus.$emit('eb-card-clicked', {
        eventUUID: this.observation.id,
        latLng: {
          lat: this.observation.y,
          lng: this.observation.x
        }
      })
    },

    emitMouseEnter () {
      EventBus.$emit('eb-feed-card:mouseenter', {
        eventUUID: this.observation.id,
        latLng: {
          lat: this.observation.y,
          lng: this.observation.x
        }
      })
    },

    emitMouseLeave () {
      EventBus.$emit('eb-feed-card:mouseleave')
    }
  }
}
</script>

<style scoped>
.observation-feed-card {
  min-width: 375px;
  max-width: 540px;
  height: 76px;
}
</style>
