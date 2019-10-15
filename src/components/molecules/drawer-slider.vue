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
          animals per event (surveys) while others only record a single animal per event.
          Click on the animal ID, if present, to see all the data recorded for
          that animal over time.
        </p>

        <!-- encounter table -->
        <simple-table class="mb-4"
                      :fields="encounterFields"
                      :data="encounterTable" />

        <!-- marks section -->
        <h3 class="text-xl mb-2">Marks</h3>
        <p class="text-sm text-gray-600 mb-2">
          Marks on any animal encountered are shown in the table below.
        </p>

        <simple-table class="mb-4"
                      :fields="marksFields"
                      :data="marksTable" />

        <!-- devices section -->

        <!-- biometrics section -->
        <h3 class="text-xl mb-2">Biometrics</h3>
        <p class="text-sm text-gray-600 mb-2">
          Biometrics recorded for animals encountered during this event are shown in the table below.
        </p>
        <simple-table class="mb-4"
                      :fields="biometricsFields"
                      :data="biometricsTable" />

        <!-- samples section -->
        <h3 class="text-xl mb-2">Samples</h3>
        <p class="text-sm text-gray-600 mb-2">
          Samples collected for animals encountered during this event are shown in the table below.
          Some samples will have multiple collected. This isn't always recorded on data sheets, but if
          it was, the number of samples collected is shown.
        </p>
        <simple-table class="mb-4"
                      :fields="samplesFields"
                      :data="samplesTable" />

        <!-- labids section -->
        <h3 class="text-xl mb-2">Lab IDs</h3>
        <p class="text-sm text-gray-600 mb-2">
          Lab IDs are unique IDs given to samples collected for each animal. These IDs are used to
          relate lab results to an animal encounter. Each time an animal is encountered it receives
          a different Lab ID. If the encounter is a mortality then the NDOW ID will be used as the
          LAB ID.
        </p>

        <!-- meds section -->
        <h3 class="text-xl mb-2">Medications</h3>
        <p class="text-sm text-gray-600 mb-2">
          Medications administered to the animals encountered are recorded below.
        </p>
        <simple-table class="mb-4"
                      :fields="medsFields"
                      :data="medsTable" />

        <!-- vitals section -->
        <h3 class="text-xl mb-2">Vitals</h3>
        <p class="text-sm text-gray-600 mb-2">
          Vital signs recorded during the encounter are shown below. Temperature is the most
          consistently recorded vital sign. If there isn't a time in the recorded at field,
          those vital signs were recorded by the capture crew.
        </p>
        <simple-table class="mb-4"
                      :fields="vitalsFields"
                      :data="vitalsTable" />

        <!-- injuries section -->
        <h3 class="text-xl mb-2">Injuries</h3>
        <p class="text-sm text-gray-600 mb-2">
          Any injuries, or abnormalities recorded during the encounter are shown here. If the injury
          was treated during the course of the encounter, it may also be recorded and shown below.
          Often, injury treatment is to clean or flush the wounded area.
        </p>

        <!-- lab results section -->
        <h3 class="text-xl mb-2">Lab Results</h3>
        <p class="text-sm text-gray-600 mb-2">
          Any samples sent to a lab for diagnostic tests, with lab results returned from the lab
          are displayed below. This table is of the raw lab results, for more information about
          the results contact the wildlife health lab.
        </p>

      </section>

      <footer class="my-2">
        <p class="text-sm text-gray-600 mb-2 text-right">Event UUID: {{ eventUUID }}</p>
      </footer>

    </div>

    <button
      class="close-btn border p-2 border-purple-500 rounded"
      @click="toggleDrawer"
    >
      close
    </button>

  </div>
</template>

<script>
import SimpleTable from '@/components/molecules/simple-table.vue'
import { EventBus } from '@/event-bus.js'
import { formatSummaryTable } from '@/utils/format-summary-tables.js'
import { GET_EVENT_BY_ID } from '@/graphql/get-event-by-id.js'

export default {
  name: 'DrawerSlider',
  components: { SimpleTable },
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
      getEventById: null,
      encounterFields: {
        ind_id: 'NDOW ID',
        age_class: 'Age',
        sex: 'Sex',
        n: 'N',
        life_status: 'Status'
      },
      biometricsFields: {
        ind_id: 'NDOW ID',
        measurement: 'Measurement',
        value: 'Value',
        units: 'Units'
      },
      marksFields: {
        ind_id: 'NDOW ID',
        mark_id: 'Mark ID',
        mark_color: 'Color',
        mark_location: 'Location',
        mark_type: 'Type'
      },
      samplesFields: {
        ind_id: 'NDOW ID',
        sample: 'Sample'
      },
      medsFields: {
        ind_id: 'NDOW ID',
        medication: 'Medication',
        med_dose: 'Dose',
        med_unit: 'Unit',
        med_method: 'Method'
      },
      vitalsFields: {
        ind_id: 'NDOW ID',
        temperature: 'Temp',
        heart_rate: 'Heart Rate',
        respiratory_rate: 'Resp Rate'
      }
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
      return formatSummaryTable(this.getEventById.animal_encounters, 'marks')
    },

    biometricsTable () {
      return formatSummaryTable(this.getEventById.animal_encounters, 'biometrics')
    },

    samplesTable () {
      return formatSummaryTable(this.getEventById.animal_encounters, 'samples')
    },

    medsTable () {
      return formatSummaryTable(this.getEventById.animal_encounters, 'medications')
    },

    vitalsTable () {
      return formatSummaryTable(this.getEventById.animal_encounters, 'vitals')
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
  background: #f7f6f8;
}

tbody tr:hover {
  background: #edebef;
}
</style>
