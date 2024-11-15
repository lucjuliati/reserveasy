import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { AuthLink, AuthLinks, HeaderContainer, HeaderContent, Nav, NavLinks, NavLink, Logo, MobileMenuIcon, ModalOverlay } from './styles'
import api from '../utils/api'
import session from '../utils/session'
import { ReservationsModal } from './ReservationsModal'

const headerVariants = {
  hidden: { y: -80 },
  visible: { y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  exit: { y: -80, transition: { duration: 0.3 } },
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [reservationModal, setReservationModal] = useState(false)
  const [reservations, setReservations] = useState([])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  const logout = () => {
    localStorage.clear()
    setTimeout(() => window.location.reload(), 100)
  }

  const toggleModal = () => setReservationModal(!reservationModal)

  const getReservations = () => {
    api.get('/users/reservations').then(res => {
      let reservations_ = []
      res.data?.forEach((r) => {
        reservations_.push({ ...r.restaurant, date: r.date })
      })

      setReservations(reservations_)
    }).catch(console.error)
  }

  return (
    <>
      {reservationModal
        ?
        <ReservationsModal reservations={reservations} toggle={toggleModal} />
        :
        null
      }

      <HeaderContainer
        variants={headerVariants}
        initial="visible"
        animate="visible">
        <HeaderContent>
          <Logo to="/">
            <img src="assets/logo.png" width={64} />
          </Logo>
          {session.isAuth()
            ?
            <>
              <Nav>
                <NavLinks>
                  <li>
                    <NavLink to={`/`} onClick={handleNavClick}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={() => { toggleModal(); getReservations() }}>
                      My Reservations
                    </NavLink>
                  </li>
                </NavLinks>
              </Nav>
              <button id="log-out" onClick={logout}>
                <FaSignOutAlt /> Log Out
              </button>
            </>
            :
            <AuthLinks>
              <AuthLink to="/login">
                <FaSignInAlt /> Log In
              </AuthLink>
              <AuthLink to="/signup">
                <FaUser /> Sign Up
              </AuthLink>
            </AuthLinks>
          }
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