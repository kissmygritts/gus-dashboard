const formatTableData = (data, id) => {
  return data.map(m => ({
    ind_id: id,
    ...m
  }))
}

export const formatSummaryTable = (encounters, field) => {
  if (!encounters) return null

  const arr = encounters.map(encounter =>
    formatTableData(encounter[field], encounter.ind_id))

  return [].concat.apply([], arr)
}
