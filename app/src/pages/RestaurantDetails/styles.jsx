import styled from 'styled-components'
import { motion } from 'framer-motion'

export const DetailContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
  }
`

export const ReservationSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`