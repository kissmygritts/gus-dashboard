import gql from 'graphql-tag'

export const OBSERVATION_FEED_QUERY = gql`
  query ($limit: OffsetPaginationInput, $filter: ObservationFeedFilterInput) {
    observationFeed (
      limit: $limit
      filter: $filter
    ) {
      event_uuid
      activity_name
      common_name
      species_name
      species_group
      event_start_timestamp
      x
      y
      wildlife_encounters {
        ind_id
        life_status
        age_class
        sex
        n
      }
    }
  }
`