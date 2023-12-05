import { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import NewsCards from '../../features/NewsCards'
import Filter from '../../features/Filter'

async function fetchCards() {
  const { data } = await axios.get(`http://localhost:8000/api/post/1/`)
  return data
}

const NewsSection = () => {
  const [page, setPage] = useState(1)
  const { data, isError, isLoading } = useQuery(
    ['cards', page],
    () => fetchCards(),
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
    <section>
      <div className="container">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mt: '50px',
          }}
        >
          <Filter></Filter>
          <NewsCards setPage={setPage} page={page} data={data}></NewsCards>
        </Box>
      </div>
    </section>
  )
}

export default NewsSection
