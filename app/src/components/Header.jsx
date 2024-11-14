import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { theme } from '../styles/theme'
import { FaBars, FaTimes, FaUser, FaSignInAlt } from 'react-icons/fa'
import { AuthLink, AuthLinks, HeaderContainer, HeaderContent, Nav, NavLinks, NavLink, Logo, MobileMenuIcon } from './styles'

const headerVariants = {
  hidden: { y: -80 },
  visible: { y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  exit: { y: -80, transition: { duration: 0.3 } },
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <HeaderContainer
        variants={headerVariants}
        initial="visible"
        animate="visible">
        <HeaderContent>
          <Logo to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke={theme.colors.white} strokeWidth="5" fill="none" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill={theme.colors.white}
                fontSize="24px"
                fontFamily={theme.fonts.heading}>
                Reserveasy
              </text>
            </svg>
            Reserveasy
          </Logo>
          <Nav>
            <NavLinks>
              <li>
                <NavLink to={`/`} onClick={handleNavClick}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={`/restaurants`} onClick={handleNavClick}>
                  Restaurants
                </NavLink>
              </li>
            </NavLinks>
          </Nav>
          <AuthLinks>
            <AuthLink to="/login">
              <FaSignInAlt /> Log In
            </AuthLink>
            <AuthLink to="/signup">
              <FaUser /> Sign Up
            </AuthLink>
          </AuthLinks>
          <MobileMenuIcon
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuIcon>
        </HeaderContent>
      </HeaderContainer>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <MobileNavLinks>
              {['Home', 'Restaurants', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <NavLink to={`/${item.toLowerCase()}`} onClick={handleNavClick}>
                    {item}
                  </NavLink>
                </li>
              ))}
            </MobileNavLinks>
            <MobileAuthLinks>
              <AuthLink to="/login" onClick={handleNavClick}>
                <FaSignInAlt /> Log In
              </AuthLink>
              <AuthLink to="/signup" onClick={handleNavClick}>
                <FaUser /> Sign Up
              </AuthLink>
            </MobileAuthLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header