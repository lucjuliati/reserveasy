import React, { useState } from 'react'
import { Card, Content, Cuisine, Image, ImageContainer, Name, Rating, RatingValue, Stars } from './styles'
import RestaurantModal from './RestaurantModal'


function RestaurantCard({ restaurant }) {
  const [modal, setModal] = useState(false)
  const stars = "★".repeat(Math.floor(restaurant.rating)) + "☆".repeat(5 - Math.floor(restaurant.rating))

  const toggleModal = () => setModal(!modal)

  return (
    <>
      {modal ? <RestaurantModal restaurant={restaurant} onClose={toggleModal} /> : null}

      <Card
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={toggleModal}
        transition={{ duration: 0.3 }}>
        <ImageContainer>
          <Image src={restaurant.image} alt={restaurant.name} />
        </ImageContainer>
        <Content>
          <Name>{restaurant.name}</Name>
          <Cuisine>{restaurant.cuisine} Cuisine</Cuisine>
          <Rating>
            <Stars>{stars}</Stars>
            <RatingValue>{restaurant.rating.toFixed(1)}</RatingValue>
          </Rating>
        </Content>
      </Card>
    </>
  )
}

export default RestaurantCard
