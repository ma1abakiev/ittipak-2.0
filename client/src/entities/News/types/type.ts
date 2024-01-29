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
  total_likes: number
  likes: string[]
  file: string
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
