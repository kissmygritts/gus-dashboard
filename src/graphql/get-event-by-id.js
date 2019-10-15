import gql from 'graphql-tag'

export const GET_EVENT_BY_ID = gql`
query ($id: ID!) {
  getEventById (id: $id) {
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
      id
      animal_id
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
      marks {
        id
        mark_id
        mark_color
        mark_type
        mark_location
      }
      biometrics {
        id
        measurement
        value
        units
      }
      samples {
        id
        sample
      }
      medications {
        id
        medication
        # med_time
        med_dose
        med_unit
        med_method
      }
      vitals {
        id
        # time_recorded
        temperature
        heart_rate
        respiratory_rate
      }
    }
  }
}
`
