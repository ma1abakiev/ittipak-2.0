import { useEffect, useState } from 'react'
import $api from '../../shared/http/auth'
import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import NewsCard from '../../entities/NewsCard/NewsCard'
import { CardType } from '../../entities/NewsCard/type'

const FavoritesPage = () => {
  const [favoriteCards, setFavoriteCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get('http://localhost:8000/api/user/')
        setFavoriteCards(response.data.favorite_posts)
      } catch (error) {
        console.error('Ошибка при загрузке избранных карт:', error)
      }
    }

    fetchData()
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
