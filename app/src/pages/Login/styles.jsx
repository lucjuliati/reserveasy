import styled from "styled-components"
import { theme } from '../../styles/theme'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${theme.colors.background};
`

export const LoginForm = styled(motion.div)`
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

export const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${theme.colors.primary};
`

export const SignUpLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: ${theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`