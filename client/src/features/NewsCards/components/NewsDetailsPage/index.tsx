// features/news/components/NewsDetailsPage.jsx
import React, { useState, useEffect } from 'react'
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Checkbox,
  IconButton,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box } from '@mui/system'
import { CardType } from '../NewsCard/type'
import { Comment, Favorite } from '@mui/icons-material'

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [newsData, setNewsData] = useState<CardType>()

  useEffect(() => {
    const fetchNewsById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${id}`
        )
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
  return (
    <Card sx={{ maxWidth: 1200, margin: '50px auto', padding: '150px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={newsData.photo}
          sx={{
            width: 800,
            height: 'auto',
          }}
        />
      </Box>
      <CardContent>
        <Box sx={{ textAlign: 'center', pt: 10 }}>
          <Typography
            gutterBottom
            variant="h1"
            component="h2"
            sx={{ textAlign: 'center' }}
          >
            {newsData.title}
          </Typography>
        </Box>
        <div
          dangerouslySetInnerHTML={{ __html: newsData.content }}
          color="text.secondary"
        ></div>
      </CardContent>
      <CardActions sx={{ pt: 10 }}>
        <Checkbox
          icon={<Favorite />}
          checkedIcon={<Favorite color="primary" />}
        ></Checkbox>
        <IconButton>
          <Comment />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default NewsDetailsPage
