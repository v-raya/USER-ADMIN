import React from 'react'
import { Rolodex, Card, CardBody, CardHeader, CardTitle } from '@cwds/components'

const CWSPermissions = () => (
  <Rolodex>
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.75rem', fontWeight: 400 }}>Permissions from CWS-CMS</CardTitle>
      </CardHeader>
      <CardBody />
    </Card>
  </Rolodex>
)

CWSPermissions.propTypes = {}

export default CWSPermissions
