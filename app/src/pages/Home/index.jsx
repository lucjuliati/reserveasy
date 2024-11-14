import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import RestaurantCard from '../../components/RestaurantCard'
import {
  FilterButton, HomeContainer, LoadMoreButton, RestaurantGrid, FilterContainer,
  SearchButton, SearchContainer, SearchInput, SearchSection, Section, SectionContent,
  SectionTitle
} from './styles'
import Footer from '../../components/Footer'
import { FaSearch } from 'react-icons/fa'
import api from '../../utils/api'

function Home() {
  const [restaurants, setRestaurants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchRestaurants()
  }, [page])

  const fetchRestaurants = async () => {

    api.get('/restaurants').then(res => {
      console.log(res)
      setRestaurants(prev => [...prev, ...res.data])
      setHasMore(res.data.length === 10)
    }).catch(console.error)
  }

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeFilter === 'All' || restaurant.cuisine === activeFilter)
  )

  const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine))]

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <Header />
      <HeroSection />
      <SearchSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchContainer>
        <FilterContainer>
          {cuisines.map(cuisine => (
            <FilterButton
              key={cuisine}
              active={(activeFilter === cuisine) ? "true" : "false"}
              onClick={() => setActiveFilter(cuisine)}>
              {cuisine}
            </FilterButton>
          ))}
        </FilterContainer>
      </SearchSection>
      <Section id="featured-restaurants">
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            Featured Restaurants
          </SectionTitle>
          <RestaurantGrid>
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 10) }}>
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </RestaurantGrid>
          {hasMore && (
            <LoadMoreButton
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Load More
            </LoadMoreButton>
          )}
        </SectionContent>
      </Section>
      <Footer />
    </HomeContainer>
  )
}

export default Home