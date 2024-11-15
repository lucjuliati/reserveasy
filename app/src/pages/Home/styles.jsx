import styled from "styled-components"
import { theme } from '../../styles/theme'
import { motion } from 'framer-motion'

export const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`

export const Section = styled.section`
  max-width: 100%;
  padding: 6rem 2rem;
  background-color: ${theme.colors.background};
`

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export const SectionTitle = styled(motion.h2)`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: ${theme.colors.text};
`

export const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`

export const SearchSection = styled.section`
  background-color: ${theme.colors.primaryLight};
  padding: 3rem 0;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08),
    inset 0 -2px 5px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 12
`

export const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  font-size: 1.1rem;
  padding: 12px 0;
  margin: 0;
  &:focus {
    outline: none;
  }
`

export const SearchButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`

export const FilterButton = styled.button`
  background-color: ${props => props.active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.active ? theme.colors.white : theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`

export const LoadMoreButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`