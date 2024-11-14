import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Button, LoginLink, SignUpContainer, SignUpForm, Title } from './styles'

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sign up with:', email, password)
  }

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft size={28} color='#ffffff' />
      </button>
      <SignUpContainer>
        <SignUpForm
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
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
          <Button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Sign Up
          </Button>
          <LoginLink to="/login">Already have an account? Log in</LoginLink>
        </SignUpForm>
      </SignUpContainer>
    </>
  )
}

export default SignUp