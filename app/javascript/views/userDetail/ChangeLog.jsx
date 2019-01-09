import React from 'react'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'

const columnConfig = [
  {
    Header: 'Date/Time',
    accessor: 'time_stamp',
    minWidth: 75,
  },
  {
    Header: 'Type',
    accessor: 'type',
    minWidth: 70,
  },
  {
    Header: 'Made By',
    accessor: 'admin_name',
    minWidth: 70,
  },
  {
    Header: 'Notes & Details',
    accessor: 'notes',
    minWidth: 50,
  },
]

const data = [
  { time_stamp: 'Thu Mar 03 2018 14:22:43', type: 'Permission Changes', admin_name: 'H' },
  { time_stamp: 'Thu Mar 03 2018 12:22:43', type: 'User Creation', admin_name: 'H' },
  {
    time_stamp: 'Wed Feb 03 2017 14:22:43',
    type: 'Account Status Changes',
    admin_name: 'A',
  },
  {
    time_stamp: 'Mon Jan 10 2018 14:22:43',
    type: 'User Role Changes',
    admin_name: 'B',
  },
  {
    time_stamp: 'Thu Jan 03 2019 14:22:43',
    type: 'Registration Completion',
    admin_name: 'A',
  },
  {
    time_stamp: 'Tue Nov 05 2017 14:22:43',
    type: 'Registration Resends',
    admin_name: 'C',
  },
  {
    time_stamp: 'Fri Dec 23 2018 09:22:43',
    type: ' Email Address Updates',
    admin_name: 'K',
  },
]
const ChangeLog = () => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Change Log ({data.length})</CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        <DataGrid
          data={data}
          columns={columnConfig}
          sortable={true}
          className="client-grid"
          minRows={3}
          noDataText={'No records found'}
          showPaginationBottom={false}
        />
      </CardBody>
    </Card>
  </Rolodex>
)

ChangeLog.propTypes = {}

export default ChangeLog
