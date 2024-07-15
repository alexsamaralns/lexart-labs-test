import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CSpinner } from '@coreui/react'
import '../../scss/style.scss'
import '../../scss/app.css'
import 'animate.css'

const Loading = () => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={true}
        onClose={() => {}}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Processing</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
              textAlign: 'center',
            }}
          >
            <CSpinner color="dark" />
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Loading
