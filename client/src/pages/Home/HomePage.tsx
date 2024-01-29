import { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Grid } from '@mui/material'
import Filter from '../../features/Filter/Filter'
import NewsList from '../../entities/News/ui/NewsList/NewsList'
import { Container } from '@mui/system'

async function fetchCards(skip: number = 0) {
  const { data } = await axios.get(
    `http://localhost:8000/api/post/?skip=${skip}limit=10`
  )
  return data
}

const Home = () => {
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
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Filter></Filter>
        </Grid>
        <Grid item xs={10}>
          <NewsList
            setPage={setPage}
            page={page}
            data={data.results}
          ></NewsList>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
