import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../styles/theme'

export const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: ${theme.colors.primary};
  backdrop-filter: blur(10px);
  transition: box-shadow 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled(Link)`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  font-weight: 900;
  color: ${theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    width: 40px;
    height: 40px;
  }
  
  &:hover {
    color: ${theme.colors.secondary};
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

export const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
`

export const NavLink = styled(Link)`
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  color: ${theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.secondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: ${theme.colors.secondary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

export const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const AuthLink = styled(Link)`
  font-family: ${theme.fonts.body};
  font-size: 0.95rem;
  color: ${theme.colors.white};
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export const MobileMenuIcon = styled.button`
  display: none;
  color: ${theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${theme.colors.primary};
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 999;
`

export const MobileNavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const MobileAuthLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`

export const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  background-size: cover;
  background-position: center;
  z-index: 9999;
  overflow: hidden;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const plateAppear = keyframes`
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`

export const Plate = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: ${plateAppear} 1s ease-out forwards;
`

export const foodAppear = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`

export const Food = styled.div`
  width: 140px;
  height: 140px;
  background-color: ${theme.colors.primary};
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  animation: ${foodAppear} 0.5s ease-out 0.7s forwards;
  opacity: 0;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background-color: ${theme.colors.accent};
    border-radius: 50%;
  }

  &::after {
    content: '🍽️';
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const steamAnimation = keyframes`
  0% { transform: translateY(0) scaleX(1); opacity: 0.8; }
  50% { transform: translateY(-20px) scaleX(1.2); opacity: 0.5; }
  100% { transform: translateY(-40px) scaleX(1); opacity: 0; }
`

export const Steam = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0;
    animation: ${steamAnimation} 2s infinite;
  }

  &::before {
    left: 0;
    animation-delay: 0.3s;
  }

  &::after {
    right: 0;
    animation-delay: 0.6s;
  }
`

export const LoadingText = styled(motion.div)`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.white};
  margin-top: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const HeroContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1350px;
  width: 100%;
  height: 80vh;
`

export const GridItem = styled(motion.div)`
  background-color: ${props => props.bgColor || theme.colors.white};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1.5rem;
  position: relative;
  cursor: pointer;
`

export const LongItem = styled(GridItem)`
  grid-column: span 2;
  grid-row: span 2;
`

export const ShortItem = styled(GridItem)`
  grid-row: span 2;
`

export const ItemImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${GridItem}:hover & {
    transform: scale(1.05);
  }
`

export const ItemContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${theme.colors.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

export const ItemTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.heading};
`

export const ItemDescription = styled.p`
  font-size: 1rem;
  font-family: ${theme.fonts.main};
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;

  ${GridItem}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
`

export const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 1rem;
  text-align: center;
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.primary};
  letter-spacing: -1px;
`

export const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  font-family: ${theme.fonts.main};
  color: ${theme.colors.secondary};
  max-width: 800px;
`

export const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`

export const Card = styled(motion.div)`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.large};
    transform: translateY(-5px);
  }
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

export const Content = styled.div`
  padding: 1.5rem;
`

export const Name = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text};
`

export const Cuisine = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.textLight};
  margin-bottom: 0.5rem;
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
`

export const Stars = styled.span`
  color: ${theme.colors.primary};
  font-size: 1.2rem;
  margin-right: 0.5rem;
`

export const RatingValue = styled.span`
  font-weight: bold;
  color: ${theme.colors.text};
`