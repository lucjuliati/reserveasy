import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ADDRESS } from '../utils/api'
import axios from 'axios'

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`

const LoginForm = styled(motion.form)`
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${theme.colors.primary};
`

const SignUpLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login with:', email, password)
  }

  useEffect(() => {
    axios.get(ADDRESS + '/users/tests').then(res => {
      console.log(res)
    })
  }, [])

  const guestSubmit = () => {
    axios.post(ADDRESS + '/users/guests').then(res => {
      console.log(res.data)
    }).catch(console.error)
  }

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft size={28} color='#ffffff' />
      </button>
      <LoginContainer>
        <LoginForm
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}>
          <Title>Log In</Title>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="loginFormBtn"
            style={{ background: theme.colors.primary }}>
            Log In
          </button>
          <motion.button
            type="submit"
            onClick={guestSubmit}
            className="loginFormBtn"
            style={{ background: 'royalblue' }}>
            Log In as a guest
          </motion.button>
          <SignUpLink to="/signup">Don't have an account? Sign up</SignUpLink>
        </LoginForm>
      </LoginContainer>
    </>
  )
}

export default Login