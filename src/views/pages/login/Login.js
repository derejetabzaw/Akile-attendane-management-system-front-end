import { useRef, useEffect, useState, useContext } from 'react';
import React from 'react';
import img from './akil.jpg';
import { Link } from 'react-router-dom'
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
import AuthContext from '../../../context/AuthProvider';
import axios from 'axios';

const base_url = 'http://localhost:9000/api/v1';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState(' ');
  //Tie this with the page we want: dashboard
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg(' ');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await
        axios
          .post(base_url + '/auth/login',
            JSON.stringify({ staffId: user, password: pwd }),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            });
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken })
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing StaffId or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }

  }
  return (
    <>
      {
        success ? (
          // Change the true part to redirect to dashboard
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </section>
        ) : (
          <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="8">
                  <CCardGroup>
                    <CCard className="p-4">
                      <CCardBody>
                        <form onSubmit={handleSubmit}>

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

                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                              {errMsg}
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
                              type="text"
                              autoComplete='off'
                              ref={userRef}
                              placeholder="StaffId"
                              onChange={(e) => setUser(e.target.value)}
                              value={user}
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
                              onChange={(e) => setPwd(e.target.value)}
                              value={pwd}
                              required />
                          </CInputGroup>
                          <CRow>
                            <CCol xs="6">
                              {/* <Link to="/dashboard"> */}
                              <button
                                color="primary"
                                className="px-4 btn btn-primary">
                                LOGIN
                              </button>
                              {/* </Link> */}
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
        )}

    </>

  )
}

export default Login