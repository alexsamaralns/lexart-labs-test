import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const ModalProduct = ({
  visible,
  setVisible,
  deleteProducts = () => {},
  modalDeleteMessage,
  modalButtons,
}) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticModalProduct"
      >
        <CModalHeader>
          <CModalTitle id="StaticModalProduct">Attention</CModalTitle>
        </CModalHeader>
        <CModalBody>{modalDeleteMessage}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          {modalButtons > 1 && (
            <CButton color="primary" onClick={deleteProducts}>
              Confirm
            </CButton>
          )}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalProduct
