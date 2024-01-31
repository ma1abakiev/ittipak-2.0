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
  Share,
} from '@mui/icons-material'
import $api from '../../shared/http/auth'

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState()
  const [favoriteData, setFavoriteData] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/post/${id}`)
      setData(response.data)
    } catch (e) {
      console.error(e)
    }
  }
  const fetchFavoriteData = async () => {
    try {
      const response = await $api.get('http://localhost:8000/api/user/favorite')
      const idsArray = response.data.favorite_posts.map((card) => card.id)
      setFavoriteData(idsArray)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchFavoriteData()
    fetchData()
  }, [])
  const addLike = () => {
    $api.get(`http://localhost:8000/api/post/like/${id}`)
  }
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
  console.log(favoriteData)
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
        <CardActions
          disableSpacing
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Checkbox
                onClick={addLike}
                // checked={likes.includes()}
                icon={<Favorite />}
                checkedIcon={<Favorite color="primary" />}
              ></Checkbox>
              <Typography>{data.total_likes}</Typography>
            </Box>
            <IconButton>
              <Comment />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </Box>
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
