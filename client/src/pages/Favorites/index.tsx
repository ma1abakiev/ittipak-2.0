import { useEffect, useState } from 'react'
import { CardType } from '../../features/NewsCards/components/NewsCard/type'
import $api from '../../App/http/auth'
import NewsCard from '../../features/NewsCards/components/NewsCard'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'

const FavoritesPage = () => {
  const [favoriteCards, setFavoriteCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get(
          'http://localhost:8000/api/user/favorite/'
        )
        setFavoriteCards(response.data)
      } catch (error) {
        console.error('Ошибка при загрузке избранных карт:', error)
      }
    }

    fetchData()
    console.log('OK')
  }, [])
  return (
    <>
      <Container>
        <Grid mt={5} container spacing={2} gap={3} justifyContent={'center'}>
          {favoriteCards.map((item: CardType) => {
            return (
              <Grid item xs={5}>
                <NewsCard key={item.id} {...item}></NewsCard>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </>
  )
}

export default FavoritesPage
