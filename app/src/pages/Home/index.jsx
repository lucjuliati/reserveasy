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
    }).catch(console.error)

    const newRestaurants = [{
      id: 1,
      name: "Gourmet Bistro",
      cuisine: "French",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }, {
      id: 2,
      name: "Sushi Haven",
      cuisine: "Japanese",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }, {
      id: 3,
      name: "Pasta Paradise",
      cuisine: "Italian",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }, {
      id: 4,
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }, {
      id: 5,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }, {
      id: 6,
      name: "Dim Sum Delight",
      cuisine: "Chinese",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }]

    setRestaurants(prev => [...prev, ...newRestaurants])
    setHasMore(newRestaurants.length === 10)
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
              active={activeFilter === cuisine}
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