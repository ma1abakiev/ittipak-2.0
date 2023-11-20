import { useState } from 'react'
import s from './index.module.css'
import Filter from '../../features/Filter'
import Cards from '../../features/Cards'
import axios from 'axios'
import { useQuery } from 'react-query'

async function fetchCards(skip: number = 0) {
  const { data } = await axios.get(
    `http://localhost:5000/posts?skip=${skip}limit=10`
  )
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
        <div className={s.content}>
          <Filter></Filter>
          <Cards setPage={setPage} page={page} data={data}></Cards>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
