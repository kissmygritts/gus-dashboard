<template>
  <div class="drawer-slider h-screen bg-gray-200 overflow-y-scroll"
    v-if="visible"
    :style="styleObject"
  >
    <div v-if="$apollo.queries.getEventById.loading">
      fetching data...
    </div>
    <div v-else class="content m-4">

      <header>
        <h1 class="text-2xl text-purple-800 capitalize">{{ species.commonName }}</h1>
        <h2 class="text-l italic text-gray-700">{{ species.speciesName }}</h2>
        <!-- FIXME: properly format date -->
        <h2 class="text-l text-gray-700">{{ new Date(getEventById.event_start_timestamp).toDateString() }}</h2>
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
              <th>NDOW ID</th>
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

        <table class="mb-4">
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

        <!-- biometrics section -->
        <h3 class="text-xl mb-2">Biometrics</h3>
        <p class="text-gray-600 mb-2">
          Biometrics recorded for animals encountered during this event are shown in the table below.
        </p>

        <table>
          <thead>
            <tr class="text-sm">
              <th>NDOW ID</th>
              <th>Measurement</th>
              <th>Value</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody class="test-sm text-gray-800">
            <tr v-for="(row, index) in biometricsTable" :key="index">
              <td>{{ row.ind_id }}</td>
              <td>{{ row.measurement }}</td>
              <td>{{ row.value }}</td>
              <td>{{ row.units }}</td>
            </tr>
          </tbody>
        </table>

      </section>

    </div>

    <button class="close-btn border p-2 border-purple-500 rounded"
      @click="toggleDrawer"
    >close</button>

  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import { GET_EVENT_BY_ID } from '@/graphql/get-event-by-id.js'

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
      getEventById: null
    }
  },

  apollo: {
    getEventById: {
      query: GET_EVENT_BY_ID,
      variables () {
        return {
          id: this.eventUUID
        }
      },
      skip () {
        return !this.visible
      }
    }
  },

  computed: {
    styleObject () {
      return { width: `${this.drawerWidth}` }
    },

    species () {
      if (this.getEventById && this.getEventById.animal_encounters[0]) {
        // each event has a single species per encounter
        const encounter = this.getEventById.animal_encounters[0]
        return {
          speciesName: encounter.species_name,
          commonName: encounter.common_name
        }
      } else {
        return null
      }
    },

    encounterTable () {
      if (this.getEventById && this.getEventById.animal_encounters) {
        return this.getEventById.animal_encounters
      } else {
        return null
      }
    },

    marksTable () {
      if (this.getEventById && this.getEventById.animal_encounters) {
        const encounters = this.getEventById.animal_encounters

        // each animal is an array of arrays, returns array of arrays
        const markArray = encounters.map(encounter => {
          return encounter.marks.map(mark => {
            return {
              ind_id: encounter.ind_id,
              ...mark
            }
          })
        })

        // concate into single array
        return [].concat.apply([], markArray)
      } else {
        return null
      }
    },

    biometricsTable () {
      if (this.getEventById && this.getEventById.animal_encounters) {
        const encounters = this.getEventById.animal_encounters

        const biometricArray = encounters.map(encounter => {
          return encounter.biometrics.map(biometric => {
            return {
              ind_id: encounter.ind_id,
              ...biometric
            }
          })
        })

        return [].concat.apply([], biometricArray)
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
