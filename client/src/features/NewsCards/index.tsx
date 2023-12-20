import React from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import NewsCard from './components/NewsCard'
import { NewsCardProps } from './components/NewsCard/type'

const NewsCards: React.FC<NewsCardProps> = ({ data, page, setPage }) => {
  const postsPerPage = 10
  const totalPages = Math.ceil(data.count / postsPerPage)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }

  return (
    <section>
      {data.results
        .slice((page - 1) * postsPerPage, page * postsPerPage)
        .map((card) => (
          <React.Fragment key={card.id}>
            <NewsCard {...card} />
            {card.id % 10 !== 0 ? (
              <hr style={{ maxWidth: '845px', margin: '16px 0' }} />
            ) : null}
          </React.Fragment>
        ))}
      <Box sx={{ mt: '20px' }}>
        {totalPages > 1 && (
          <Pagination
            defaultPage={page}
            page={page}
            count={totalPages}
            color="primary"
            onChange={handleChange}
          />
        )}
      </Box>
    </section>
  )
}

export default NewsCards
