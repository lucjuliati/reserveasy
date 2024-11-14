import React, { useEffect, useState } from 'react'
import { LoaderContainer, LoadingText, ContentWrapper, Food, Plate, Steam } from './styles'

function FancyLoader() {
  const [loadingText, setLoadingText] = useState('Preparing your culinary journey')

  useEffect(() => {
    let index = 0
    const texts = [
      'Preparing your culinary journey',
      'Simmering the flavors',
      'Garnishing the experience',
      'Plating perfection'
    ]

    const interval = setInterval(() => {
      index = (index + 1) % texts.length
      setLoadingText(texts[index])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <LoaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Overlay />
      <ContentWrapper>
        <Plate>
          <Food />
          <Steam />
        </Plate>
        <LoadingText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          {loadingText}
        </LoadingText>
      </ContentWrapper>
    </LoaderContainer>
  )
}

export default FancyLoader
