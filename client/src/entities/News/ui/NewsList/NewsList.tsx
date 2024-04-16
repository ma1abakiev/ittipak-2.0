import React from 'react'
import Pagination from '@mui/material/Pagination'
import { Box, Grid } from '@mui/material'
import NewsCard from '../NewsCard/NewsCard'
import { CardType, NewsCardProps } from '../../types/type'
import { useSelector } from 'react-redux'
import { selectSearchText } from '../../../../features/Search/store/searchSlice'

const NewsList: React.FC<NewsCardProps> = ({ data, page, setPage }) => {
  const searchText = useSelector(selectSearchText)

  const postsPerPage = 10
  const totalPages = Math.ceil(data?.count / postsPerPage) || 1

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }
  const filterBySearchText = (card: CardType) => {
    if (!searchText) {
      return true
    }

    return card.title?.toLowerCase().includes(searchText.toLowerCase())
  }
  console.log(data)

  return (
    <>
      <Grid container spacing={5}>
        {data
          ?.slice((page - 1) * postsPerPage, page * postsPerPage)
          ?.filter(filterBySearchText)
          .map((card) => (
            <Grid  item xs={4} key={card.id}>
              <NewsCard  {...card} />
              <hr style={{ maxWidth: '845px', margin: '16px 0' }} />
            </Grid>
          ))}
      </Grid>
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
