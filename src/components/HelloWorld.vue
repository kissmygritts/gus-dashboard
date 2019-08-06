<template>
  <observation-feed :observationFeed="observationFeed" />
</template>

<script>
import ObservationFeed from '@/components/organisms/ObservationFeed.vue'
import gql from 'graphql-tag'

export default {
  name: 'HelloWorld',
  components: {
    ObservationFeed
  },
  apollo: {
    observationFeed: gql`query {
      observationFeed (
        limit:{first: 5},
        filter: {
          common_name: { like: "%sheep%" }
        }
      ) {
        activity_name
        common_name
        species_name
        species_group
        wildlife_encounters {
          ind_id
          life_status
          age_class
          sex
          n
        }
      }
    }`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
