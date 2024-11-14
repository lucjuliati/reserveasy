import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import api, { ADDRESS } from '../../utils/api'
import { LoginForm, LoginContainer, Title, SignUpLink } from './styles'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login with:', email, password)

    let data = { email, password }
    
    api.post('/users/login', data).then(res => {
      console.log(res.data)
    }).catch(console.error)
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