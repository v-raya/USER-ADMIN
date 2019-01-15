import React from 'react'
import { Rolodex, Card, CardBody, CardHeader, CardTitle, DataGrid } from '@cwds/components'
import ModalComponent from './Modal'
import ShowField from '../../common/ShowField'

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

const modalBody = data => {
  return (
    <div>
      Details
      <hr />
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <ShowField label="Changed From">{data.changed_from}</ShowField>
          </div>
          <div className="col-md-6">
            <ShowField label="Changed To">{data.changed_to}</ShowField>
          </div>
        </div>
      </div>
      Notes
      <hr />
    </div>
  )
}

const ChangeLog = () => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Change Log ({data.length})</CardTitle>
      </CardHeader>
      <CardBody className="pt-0">
        <DataGrid
          data={data}
          columns={[
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
              id: 'details',
              Header: 'Notes & Details',
              accessor: 'notes',
              // eslint-disable-next-line react/display-name
              Cell: () => <ModalComponent modalBody={modalBody(data)} />,
              minWidth: 50,
            },
          ]}
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
