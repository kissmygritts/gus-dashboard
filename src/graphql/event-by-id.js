import gql from 'graphql-tag'

export const EVENT_BY_ID = gql`
  query ($id: ID!) {
  eventById (id: $id) {
    id
    activity_id
    event_start_timestamp
    event_end_timestamp
    event_type
    comments
    observer
    source_app
    created_at
    updated_at
    animal_encounters {
      animal_id
      encounter_id
      species_id
      common_name
      species_name
      ind_id
      life_status
      age_class
      sex
      n
      reencounter
      relocation
    }
  }
}
`
