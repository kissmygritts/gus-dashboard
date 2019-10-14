<template>
  <table class="mb-4 text-sm">

    <thead>
      <tr>
        <th v-for="(field, index) in fields"
            :key="index"
        >
          {{ field }}
        </th>
      </tr>
    </thead>

    <!-- if there is data render this body -->
    <tbody class="text-gray-800"
           v-if="hasData"
    >
      <tr v-for="(row, index) in data"
          :key="index"
      >
        <td v-for="(field, index) in tableFields"
            :key="index"
        >
          {{ row[field] }}
        </td>
      </tr>
    </tbody>

    <!-- if there isn't data, render this body -->
    <tbody class="text-gray-800"
           v-else
    >
      <tr>
        <td class="no-data"
            :colspan="numberOfColumns">No data ¯\_(ツ)_/¯</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'SimpleTable',

  props: {
    data: {
      type: Array,
      required: true
    },
    fields: {
      type: [Object, Array],
      required: false
    }
  },

  computed: {
    hasData () {
      return this.data.length > 0
    },

    numberOfColumns () {
      if (Array.isArray(this.fields)) {
        return this.fields.length
      } else {
        return Object.keys(this.fields).length
      }
    },

    fieldNames () {
      if (Array.isArray(this.fields)) {
        return this.fields
      } else {
        return Object.values(this.fields)
      }
    },

    tableFields () {
      if (Array.isArray(this.fields)) {
        return this.fields
      } else {
        return Object.keys(this.fields)
      }
    }
  }
}
</script>

<style scoped>
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

td.no-data {
  text-align: center;
}

tbody tr:nth-child(even) {
  background: #f7f6f8;
}

tbody tr:hover {
  background: #edebef;
}
</style>
