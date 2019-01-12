import React from 'react'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'

import { checkDate } from '../../_utils/formatters'
const columnConfig = [
  {
    Header: 'Date/Time',
    accessor: 'time_stamp',
    minWidth: 75,
    sortMethod: (a, b) => {
      return a > b ? 1 : -1
    },
    Cell: row => {
      return `${checkDate(row.original.time_stamp)}`
    },
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
  {
    time_stamp: '2018-03-03 14:22:43',
    type: 'Permission Changes',
    admin_name: 'H',
  },
  { time_stamp: '2018-03-03 12:22:43', type: 'User Creation', admin_name: 'H' },
  {
    time_stamp: '2017-02-03 14:22:43',
    type: 'Account Status Changes',
    admin_name: 'A',
  },
  {
    time_stamp: '2018-01-10 14:22:43',
    type: 'User Role Changes',
    admin_name: 'B',
  },
  {
    time_stamp: '2019-01-03 14:22:43',
    type: 'Registration Completion',
    admin_name: 'A',
  },
  {
    time_stamp: '2017-11-05 14:22:43',
    type: 'Registration Resends',
    admin_name: 'C',
  },
  {
    time_stamp: '2018-12-23 09:22:43',
    type: 'Email Address Updates',
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
          defaultSorted={[
            {
              id: 'time_stamp',
              desc: true,
            },
          ]}
        />
      </CardBody>
    </Card>
  </Rolodex>
)

ChangeLog.propTypes = {}

export default ChangeLog
