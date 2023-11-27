import React from 'react'
import Pagination from '@mui/material/Pagination'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import NewsCard from './components/NewsCard'

// Определение типа для объекта карточки
export interface CardType {
  id: number
  date: string
  title: string
  text: string
  img: string
}

// Определение типа для пропсов компонента Cards
export interface Props {
  data: CardType[]
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const NewsCards: React.FC<Props> = ({ data, page, setPage }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }

  const maxData = [...data]

  return (
    <section>
      {maxData.map((card) => (
        <Link key={card.id} to={`/news/${card.id}`}>
          <NewsCard {...card} />
        </Link>
      ))}
      <Box sx={{ mt: '20px' }}>
        <Pagination
          defaultPage={page}
          page={page}
          count={Math.ceil(data.length / 10)}
          color="primary"
          onChange={handleChange}
        />
      </Box>
    </section>
  )
}

export default NewsCards
