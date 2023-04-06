import { useState } from 'react';
import React from 'react';
import img from './akil.jpg';
// import { Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';


function Login() {
  const base_url = 'http://localhost:9000/api/v1';

  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')

  async function submitLogin(event) {
    event.preventDefault()


    if (staffId === "ADMIN" && password === "ADMIN") {
      // localStorage.setItem('Bearer', 'Bearer ' + data.accessToken)
      alert('Login successful')
      window.location.href = '/#/dashboard'
    } else {
      try {
        const response = await fetch(
          base_url + `/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              staffId,
              password
            })
          }
        )

        const data = await response.json()

        if (data.staffId) {
          localStorage.setItem('Bearer', 'Bearer ' + data.accessToken)
          alert('Login successful')
          window.location.href = '/#/dashboard'
        } else {
          alert('Incorrect Staffid or Password')
        }
      }
      catch (err) {
        console.log(err);
        throw err;
      }
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={submitLogin} >

                    <div style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                      <div>
                        <img
                          src={img}
                          style={{ borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto', display: "block", width: '20%' }}
                          alt='Akile Logo' />
                      </div>
                      <h1 style={{ paddingLeft: '40%', paddingTop: '2%' }}>Login</h1>
                      <p className="text-muted" style={{ paddingLeft: '32%', paddingBottom: '3%' }}>
                        Sign In to your account
                      </p>

                    </div>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        className='form-control'
                        type='text'
                        autoComplete='off'
                        placeholder="StaffId"
                        onChange={(e) => setStaffId(e.target.value.toUpperCase())}
                        value={staffId}
                        required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        className='form-control'
                        type="password"
                        placeholder="Password"
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <button
                          color="primary"
                          className="px-4 btn btn-primary">
                          LOGIN
                        </button>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton
                          color="link"
                          className="px-0">
                          Forgot Password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login