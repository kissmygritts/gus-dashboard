import gql from 'graphql-tag'

export const OBSERVATION_FEED_QUERY = gql`
  query (
    $limit: OffsetPaginationInput
    $filter: ObservationFeedFilterInput
  ) {
    getObservationFeed (
      limit: $limit
      filter: $filter
    ) {
      id
      event_start_timestamp
      x
      y
      encounters_observation_feed {
        common_name
        species_name
        ind_id
        life_status
        age_class
        sex
        n
      }
    }
  }
`
