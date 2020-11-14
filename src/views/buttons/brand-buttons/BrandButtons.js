import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { Col, Button,InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Row } from 'antd';


const BrandButtons = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>

            <div>
              <Row>
                <Col span={12}>
            <h5>Attendance Report PDF </h5>
                </Col>
                <Col span={12}>
      <Button color="primary" style={{float:"right", marginBottom: '2%'}}>Generate PDF </Button>
                </Col>
              </Row>

            </div>
          </CCardHeader>
          <CCardBody>
            <h6>Size Small
              <small> Add this class <code>.btn-sm</code></small>
            </h6>
            
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default BrandButtons
