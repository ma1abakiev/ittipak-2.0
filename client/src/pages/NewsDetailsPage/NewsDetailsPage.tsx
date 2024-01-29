// features/news/components/NewsDetailsPage.jsx
import React, { useEffect, useState } from 'react'
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
import { Box, Container } from '@mui/system'
import {
  BookmarkAdd,
  BookmarkRemove,
  Comment,
  Favorite,
} from '@mui/icons-material'
import $api from '../../shared/http/auth'

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [favoriteData, setFavoriteData] = useState([])
  const [data, setData] = useState()

  const fetchFavoriteData = async () => {
    try {
      const response = await $api.get('http://localhost:8000/api/user/favorite')
      const idsArray = response.data.favorite_posts.map((card) => card.id)
      setFavoriteData(idsArray)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post/${id}`)
      setData(response.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
    fetchFavoriteData()
  }, [])
  console.log(data)
  const toggleFavorite = async () => {
    try {
      await $api.post('http://localhost:8000/api/user/favorite/', {
        post_id: id,
      })
      fetchFavoriteData()
    } catch (error) {
      console.log(error)
    }
  }

  if (!data) {
    return <div>Загрузка</div>
  }
  return (
    <Container maxWidth="sm">
      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={data.photo}
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
              {data.title}
            </Typography>
          </Box>
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
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
          <Checkbox
            icon={<BookmarkAdd />}
            checkedIcon={<BookmarkRemove />}
            checked={favoriteData.includes(id)}
            onChange={toggleFavorite}
          />
        </CardActions>
      </Card>
    </Container>
  )
}

export default NewsDetailsPage
