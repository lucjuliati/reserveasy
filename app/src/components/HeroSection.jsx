import React from 'react'
import {
  CTAButton, Grid, GridItem, HeroContainer, HeroOverlay, ItemContent,
  ItemDescription, ItemImage, ItemTitle, LongItem, MainTitle, ShortItem
} from './styles'

const HeroSection = () => {
  const gridItems = [{
    title: "No More 'Table for None'",
    description: `Say goodbye to awkward waits and hello to guaranteed seats.`,
    image: "assets/hero-image7.jpg",
    type: "long",
  }, {
    title: "Foodie Time Machine",
    description: `Book your table faster than you can say "I'm hangry!"`,
    image: "assets/hero-image2.png",
    type: "short",
  }, {
    title: "Date Night Hero",
    description: `Impress your date with a perfectly timed reservation. We won't tell them it was us, promise!`,
    image: "assets/hero-image4.jpg",
    type: "normal",
  }, {
    title: "Group Dining",
    description: `Organizing a group dinner? We'll handle the logistics, you handle the gossip.`,
    image: "assets/hero-image1.png",
    type: "normal",
  }, {
    title: "Food Adventures",
    description: `Discover new cuisines nearby. It's like Tinder, but for restaurants, and with a much higher success rate!`,
    image: "assets/hero-image0.jpg",
    type: "normal",
  }]

  return (
    <HeroContainer>
      <MainTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <b>Reserveasy</b>
      </MainTitle>
      <Grid
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}>
        {gridItems.map((item, index) => {
          const ItemComponent = item.type === 'long' ? LongItem : item.type === 'short' ? ShortItem : GridItem
          return (
            <ItemComponent
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}>
              <ItemImage
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(item.title.replace(/\s/g, '+'))}`
                }}
              />
              <HeroOverlay />
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.description}</ItemDescription>
              </ItemContent>
            </ItemComponent>
          )
        })}
      </Grid>
      <CTAButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}>
        Book Now
      </CTAButton>
    </HeroContainer>
  )
}

export default HeroSection
