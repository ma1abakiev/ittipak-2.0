import React from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import NewsCard from './components/NewsCard'
import { NewsCardProps } from './components/NewsCard/type'

const NewsCards: React.FC<NewsCardProps> = ({ data, page, setPage }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }

  return (
    <section>
      {data.results.map((card) => (
        <Link key={card.id} to={`/news/${card.id}`}>
          <NewsCard {...card} />
          {card.id % 10 != 0 ? (
            <hr style={{ maxWidth: '845px', margin: '16px 0' }} />
          ) : null}
        </Link>
      ))}
      <Box sx={{ mt: '20px' }}>
        {data.length && (
          <Pagination
            defaultPage={page}
            page={page}
            count={data.count}
            color="primary"
            onChange={handleChange}
          />
        )}
      </Box>
    </section>
  )
}

export default NewsCards
