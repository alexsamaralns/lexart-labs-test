import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CProgress } from '@coreui/react'

const ModalProgress = ({ progress }) => {
  console.log('progress: ', progress)
  return (
    <>
      <CModal
        backdrop="static"
        visible={true}
        onClose={() => {}}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Deleting products</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="progress-bar-container">
            <CProgress value={progress}>{`${progress}%`}</CProgress>
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default ModalProgress
