import { useRef, useEffect, useState, useContext } from 'react';
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

const Login = () => {
      const [staffId, setStaffId] = useState('')
      const [password, setPassword] = useState('')

      async function loginUser(event) {
            // event.preventDefault()
            // const userCredential = {
            //       staffId: staffId.toUpperCase(),
            //       password: password,
            // }
            // const response = await
            //       axios
            //             .post(LOGIN_URL,
            //                   userCredential,
            //                   {
            //                         headers: { 'Content-Type': 'application/json' }
            //                   },
            //                   body: JSON.stringify({
            //                         staffId,
            //                         password
            //                   })
            //             );

            // const response = await fetch('/signin', {
            //       method: 'POST',
            //       headers: {
            //             'Content-Type': 'application/json',
            //       },
            //       body: JSON.stringify({
            //             staffId,
            //             password
            //       })
            // })

            // const data = await response.json()

            // console.log(data)
      }

      return (
            <>
                  <div className="c-app c-default-layout flex-row align-items-center">
                        <CContainer>
                              <CRow className="justify-content-center">
                                    <CCol md="8">
                                          <CCardGroup>
                                                <CCard className="p-4">
                                                      <CCardBody>
                                                            <form onSubmit={loginUser}>

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

                                                                        {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                                                                        {errMsg}
                                                                  </p> */}

                                                                  </div>
                                                                  <CInputGroup className="mb-4">
                                                                        <CInputGroupPrepend>
                                                                              <CInputGroupText>
                                                                                    <CIcon name="cil-user" />
                                                                              </CInputGroupText>
                                                                        </CInputGroupPrepend>
                                                                        <input
                                                                              className='form-control'
                                                                              type="text"
                                                                              autoComplete='off'
                                                                              // ref={userRef}
                                                                              placeholder="StaffId"
                                                                              onChange={(e) => setStaffId(e.target.value)}
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

            </>
      )
}

export default Login