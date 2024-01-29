import { useState } from 'react'
import $api from '../../shared/http/auth'
import { Container } from '@mui/system'
import NewsList from '../../entities/News/ui/NewsList/NewsList'
import { useQuery } from 'react-query'
import { Grid, Typography } from '@mui/material'
import Filter from '../../features/Filter/Filter'

async function fetchCards(skip: number = 0) {
  const { data } = await $api.get(
    `http://localhost:8000/api/user/favorite?skip=${skip}limit=10`
  )
  return data
}

const FavoritesPage = () => {
  const [page, setPage] = useState(1)
  const { data, isError, isLoading } = useQuery(
    ['cards', page],
    () => fetchCards(page),
    {
      keepPreviousData: true,
    }
  )

  if (isLoading) {
    return <h3>Идёт загрузка</h3>
  }
  if (isError) {
    return <h3>Error</h3>
  }
  if (!data) {
    return <h3>Нету данных</h3>
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Typography
          sx={{ textAlign: 'center', mb: 4 }}
          variant="h2"
          component={'h2'}
        >
          Избранные
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Filter></Filter>
          </Grid>
          <Grid item xs={10}>
            <NewsList
              setPage={setPage}
              page={page}
              data={data.favorite_posts}
            ></NewsList>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default FavoritesPage
