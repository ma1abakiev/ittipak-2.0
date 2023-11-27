// features/news/components/NewsDetailsPage.jsx
import React, { useState, useEffect } from 'react'
import { Paper, Typography, Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface Params {
  id: string
}

interface NewsData {
  title: string
  content: string
  // Добавьте другие поля, если они присутствуют в ваших данных новости
}

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<Params>()
  const [newsData, setNewsData] = useState<NewsData | null>(null)

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`)
        setNewsData(response.data)
      } catch (error) {
        console.error('Error fetching news by id:', error)
      }
    }

    fetchNewsById()
  }, [id])

  if (!newsData) {
    return <div>Loading...</div>
  }

  const { title, content } = newsData

  return (
    <Container maxWidth="md">
      <Paper>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
      </Paper>
    </Container>
  )
}

export default NewsDetailsPage
