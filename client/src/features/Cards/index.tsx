import React, { Dispatch, SetStateAction } from 'react'
import s from './index.module.css'
import NewsCard from '../../entities/NewsCard'
import { Card } from '../../entities/NewsCard/type'
import Pagination from '@mui/material/Pagination'

type Props = {
  data: Card[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const Cards = ({ data, page, setPage }: Props) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }
  const maxData = [...data]
  return (
    <section className={s.cards}>
      {maxData.map((card: Card) => {
        const startIndex = (page - 1) * 10 + 1
        const endIndex = page * 10
        if (card.id >= startIndex && card.id <= endIndex) {
          return (
            <React.Fragment key={card.id}>
              <NewsCard {...card} />
              {card.id % 10 != 0 ? <hr className={s.bottomLine} /> : null}
            </React.Fragment>
          )
        }

        return null
      })}
      <div className={s.pagination}>
        <Pagination
          defaultPage={page}
          page={page}
          count={data.length / 10}
          color="primary"
          onChange={handleChange}
        />
      </div>
    </section>
  )
}

export default Cards
