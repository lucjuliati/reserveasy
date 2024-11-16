import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import Toast from '../../components/Toast'
import { LoginLink, SignUpContainer, SignUpForm, Title } from './styles'
import api from '../../utils/api'
import session from '../../utils/session'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [toast, setToast] = useState({ active: false, message: "" })

  const handleSubmit = (e) => {
    e.preventDefault()

    let data = { email, name, password }

    if (!data.email || !data.name || !data.password) {
      return
    }

    api.post('/users', data).then(res => {
      session.setData(res.data)
      setTimeout(() => navigate('/'), 100)
    }).catch((err) => {
      console.error(err)
      setToast({ active: false, message: "An error occurred" })
      setTimeout(() => {
        setToast({ active: false, message: null })
      }, 4500)
    })
  }

  const guestSubmit = () => {
    api.post('/users/guests').then(res => {
      session.setData(res.data)
      setTimeout(() => navigate('/'), 100)
    }).catch((err) => {
      console.error(err)
      setToast({ active: false, message: "An error occurred" })
      setTimeout(() => {
        setToast({ active: false, message: null })
      }, 4500)
    })
  }

  return (
    <>
      {toast.active
        ?
        <Toast title="Error" message={toast.message} />
        :
        null
      }

      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft size={28} color="#333" />
      </button>
      <SignUpContainer>
        <SignUpForm
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Title>Sign Up</Title>
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="loginFormBtn"
            style={{ background: theme.colors.primary }}
            onClick={handleSubmit}>
            Sign Up
          </button>
          <motion.button
            onClick={guestSubmit}
            className="loginFormBtn"
            style={{ background: 'royalblue' }}>
            Sign Up as a guest
          </motion.button>
          <LoginLink to="/login">Already have an account? Log in</LoginLink>
        </SignUpForm>
      </SignUpContainer>
    </>
  )
}

export default SignUp