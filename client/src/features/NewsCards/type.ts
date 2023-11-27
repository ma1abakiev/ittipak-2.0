import { Dispatch, SetStateAction } from 'react'
import { CardType } from './components/NewsCard/type'

export type Props = {
  data: CardType[]
  page: number
  setPage: Dispatch<SetStateAction<number>>
}
