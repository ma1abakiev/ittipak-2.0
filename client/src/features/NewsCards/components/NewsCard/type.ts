export type CardType = {
  id: number
  title: string
  subtitle: string
  content: number
  text: string
  photo: string
  updated: string
  created: string
  category: number
}
export interface NewsCardProps {
  data: {
    length: number
    count: number
    results: CardType[]
  }
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}
