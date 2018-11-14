/* eslint camelcase: 0 */
export const officesList = state => {
  const list = state.fetchOffices ? state.fetchOffices.offices : null
  const officeList = list
    ? list.map(({ office_id, office_name }) => ({
        value: office_id,
        label: office_name,
      }))
    : []
  return officeList
}

export const translateOfficeName = (state, office_id) => {
  const officeList = officesList(state)
  if (!office_id) return ''
  const recordFound = officeList.find(record => {
    return record.value === office_id
  })
  return recordFound ? recordFound.label : office_id
}
