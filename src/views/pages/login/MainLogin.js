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
  // const base_url = 'https://akille-4cfc3.firebaseapp.com/api/v1';
  const base_url = 'http://localhost:9000/api/v1'

  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')

  async function submitLogin(event) {
    event.preventDefault()




    if (staffId === "ADMIN" && password === "ADMIN") {
      // Create a dummy token for admin
      const adminToken = "ADMIN-DUMMY-TOKEN";

      // Store it in localStorage just like a real login
      localStorage.setItem('Bearer', 'Bearer ' + adminToken);
      console.log("TOKEN STORED (ADMIN):", localStorage.getItem('Bearer'));

      alert('Login successful');
      window.location.href = '/#/dashboard';
    } else {
      try {
        const response = await fetch(
          base_url + `/auth/login`,
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
        

        if (response.ok && data.staffId) {
          localStorage.setItem('Bearer', 'Bearer ' + data.accessToken)
          alert('Login successful')
          window.location.href = '/#/dashboard'
        } else {
          alert(data.error || 'Incorrect Staffid or Password')
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

                    <div className="text-center mb-4">
                      <img
                        src={img}
                        style={{ borderRadius: '50%', margin: '0 auto 1.5rem', display: "block", width: '80px' }}
                        alt='Akile Logo' />
                      <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                      <p className="text-muted">
                        Sign In to your account
                      </p>
                    </div>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText style={{ backgroundColor: 'transparent', borderRight: 'none' }}>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        className='form-control shadow-none'
                        style={{ borderLeft: 'none' }}
                        type='text'
                        autoComplete='off'
                        placeholder="StaffId"
                        onChange={(e) => setStaffId(e.target.value.toUpperCase())}
                        value={staffId}
                        required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText style={{ backgroundColor: 'transparent', borderRight: 'none' }}>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        className='form-control shadow-none'
                        style={{ borderLeft: 'none' }}
                        type="password"
                        placeholder="Password"
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block py-2 font-weight-bold shadow-sm"
                          style={{ borderRadius: '8px' }}>
                          SIGN IN
                        </button>
                      </CCol>
                      <CCol xs="12" className="text-center mt-3">
                        <CButton
                          color="link"
                          className="px-0 text-muted small">
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