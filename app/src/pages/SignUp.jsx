import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { useNavigate } from 'react-router-dom'

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`

const SignUpForm = styled(motion.form)`
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

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

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