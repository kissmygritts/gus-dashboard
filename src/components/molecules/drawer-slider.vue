<template>
  <div class="drawer-slider h-screen bg-gray-200"
    v-if="visible"
    :style="styleObject"
  >
    <div class="content m-4">
      <header>
        <h1 class="text-3xl text-purple-800">{{ species.commonName }}</h1>
        <h2 class="text-xl italic text-gray-700">{{ species.speciesName }}</h2>
        <h2 class="text-xl text-gray-700">{{ new Date(eventById.event_start_timestamp).toDateString() }}</h2>
      </header>

      <section id="encounter-table" class="bg-white mt-2 p-4">
        <h3 class="text-xl mb-2">Animals Encountered</h3>
        <p class="text-sm text-gray-600 mb-2">
          Animal(s) encountered during this event. Some events record multiple
          animals (surveys) while others only record a single animal per event.
          Click on the animal ID, if present, to see all the data recorded for
          that animal.
        </p>

        <!-- encounter table -->
        <table class="mb-4">
          <thead>
            <tr class="text-sm">
              <th>ID</th>
              <th>Age</th>
              <th>Sex</th>
              <th>N</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody class="text-sm text-gray-800">
            <tr v-for="(row, index) in encounterTable" :key="index">
              <td class="text-purple-800">{{ row.ind_id }}</td>
              <td>{{ row.age_class }}</td>
              <td>{{ row.sex }}</td>
              <td>{{ row.n }}</td>
              <td>{{ row.life_status }}</td>
            </tr>
          </tbody>
        </table>

        <!-- marks section -->
        <h3 class="text-xl mb-2">Marks</h3>
        <p class="text-sm text-gray-600 mb-2">
          Marks on any animal encountered are shown in the table below.
        </p>

        <table>
          <thead>
            <tr class="text-sm">
              <th>Animal ID</th>
              <th>Mark ID</th>
              <th>Color</th>
              <th>Location</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody class="text-sm text-gray-800">
            <tr v-for="(row, index) in marksTable" :key="index">
              <td>{{ row.ind_id }}</td>
              <td>{{ row.mark_id }}</td>
              <td>{{ row.mark_color }}</td>
              <td>{{ row.mark_location }}</td>
              <td>{{ row.mark_type }}</td>
            </tr>
          </tbody>
        </table>

        <!-- devices section -->
      </section>

    </div>

    <button class="close-btn border p-2 border-purple-500 rounded"
      @click="toggleDrawer"
    >close</button>
    <!-- <p v-if="eventUUID">{{ eventUUID }}</p>
    <pre><code>{{ eventById }}</code></pre> -->
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import { EVENT_BY_ID } from '@/graphql/event-by-id.js'

export default {
  name: 'DrawerSlider',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    drawerWidth: {
      type: String,
      default: '40%'
    }
  },
  data () {
    return {
      eventUUID: null,
      latLng: null,
      eventById: null
    }
  },
  apollo: {
    eventById: {
      query: EVENT_BY_ID,
      variables () {
        return {
          id: this.eventUUID
        }
      }
    }
  },
  computed: {
    styleObject () {
      return { width: `${this.drawerWidth}` }
    },
    species () {
      if (this.eventById) {
        const encounter = this.eventById.animal_encounters[0]
        return {
          speciesName: encounter.species_name,
          commonName: encounter.common_name
        }
      } else {
        return null
      }
    },
    encounterTable () {
      if (this.eventById) {
        return this.eventById.animal_encounters
      } else {
        return null
      }
    },
    marksTable () {
      if (this.eventById) {
        const encounters = this.eventById.animal_encounters

        const markArray = encounters.map(encounter => {
          return encounter.marks.map(mark => {
            return {
              ind_id: encounter.ind_id,
              ...mark
            }
          })
        })

        return [].concat.apply([], markArray)
      } else {
        return null
      }
    }
  },
  methods: {
    toggleDrawer () {
      this.$emit('drawer-visible', { visible: false })
    }
  },
  created () {
    EventBus.$on('eb-card-clicked', data => {
      this.eventUUID = data.eventUUID
      this.latLng = data.latLng
    })
  },
  updated () {
    console.log('updated')
    EventBus.$emit('eb-drawer-slider:update', {
      visible: this.visible,
      data: {
        eventUUID: this.eventUUID,
        latLng: this.latLng
      }
    })
  }
}
</script>

<style scoped>
/* for overlay instead of next to for the drawer
.drawer-slider {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
} */

/* close button */
.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

/* table style */
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-bottom: 1px solid black;
}

td, th {
  padding: 0.5rem;
  text-align: left;
}

tbody tr:nth-child(even) {
  background: #faf5ff;
}

tbody tr:hover {
  background: rgba(233, 216, 253, 0.4);
}
</style>
