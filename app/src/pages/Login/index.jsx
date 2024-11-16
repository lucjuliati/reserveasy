import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { LoginForm, LoginContainer, Title, SignUpLink } from './styles'
import session from '../../utils/session'
import api from '../../utils/api'
import Toast from '../../components/Toast'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState({ active: false, message: "" })

  const handleSubmit = () => {
    let data = { email, password }

    api.post('/users/login', data).then(res => {
      session.setData(res.data)
      setTimeout(() => navigate('/'), 100)
    }).catch((err) => {
      console.error(err)
      setToast({ active: true, message: "Incorrect e-mail or password!" })
      setTimeout(() => {
        setToast({ active: false, message: null })
      }, 4500)
    })
  }

  const guestSubmit = () => {
    api.post('/users/guests').then(res => {
      session.setData(res.data)
      setTimeout(() => navigate('/'), 100)
    }).catch(console.error)
  }

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft size={28} color="#333" />
      </button>

      {toast.active
        ?
        <Toast title="Error" message={toast.message} />
        :
        null
      }

      <LoginContainer>
        <LoginForm
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Title>Log In</Title>
          <input
            type="email"
            placeholder="Email"
            onKeyDown={(e) => e.key == "Enter" ? handleSubmit() : null}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onKeyDown={(e) => e.key == "Enter" ? handleSubmit() : null}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginFormBtn"
            onClick={handleSubmit}
            style={{ background: theme.colors.primary }}>
            Log In
          </button>
          <motion.button
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