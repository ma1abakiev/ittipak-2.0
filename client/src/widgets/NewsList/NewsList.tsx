import React from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import NewsCard from '../../entities/NewsCard/NewsCard'
import { CardType, NewsCardProps } from '../../entities/NewsCard/type'
import { useSelector } from 'react-redux'
import { selectSearchText } from '../../features/Search/store/searchSlice'

const NewsList: React.FC<NewsCardProps> = ({ data, page, setPage }) => {
  const searchText = useSelector(selectSearchText)

  const postsPerPage = 10
  const totalPages = Math.ceil(data?.count / postsPerPage) || 1

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }
  const filterBySearchText = (card: CardType) =>
    card.title?.toLowerCase().includes(searchText)
  return (
    <>
      {data?.results
        ?.slice((page - 1) * postsPerPage, page * postsPerPage)
        ?.filter(filterBySearchText)
        .map((card) => (
          <div key={card.id}>
            <NewsCard {...card} />
            {card.id % 10 !== 0 && (
              <hr style={{ maxWidth: '845px', margin: '16px 0' }} />
            )}
          </div>
        ))}
      <Box mt="20px">
        {totalPages > 1 && (
          <Pagination
            key="pagination"
            defaultPage={page}
            page={page}
            count={totalPages}
            color="primary"
            onChange={handleChange}
          />
        )}
      </Box>
    </>
  )
}

export default NewsList
