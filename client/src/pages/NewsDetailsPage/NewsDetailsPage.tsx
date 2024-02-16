import React from 'react'
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Checkbox,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { Box, Container } from '@mui/system'
import {
  BookmarkAdd,
  BookmarkRemove,
  Comment,
  Favorite,
  Share,
} from '@mui/icons-material'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import $api from '../../shared/http/auth'

const fetchData = async (id) => {
  const response = await axios.get(`http://localhost:8000/api/post/${id}`)
  return response.data
}

const fetchFavoriteData = async () => {
  const response = await $api.get('http://localhost:8000/api/user/favorite')
  const idsArray = response.data.favorite_posts.map((card) => card.id)
  return idsArray
}

const addLike = async (id) => {
  await $api.get(`http://localhost:8000/api/post/like/${id}`)
}

const toggleFavorite = async (id) => {
  await $api.post('http://localhost:8000/api/user/favorite/', {
    post_id: id,
  })
}

const fetchUserData = async () => {
  const response = await $api.get(`http://localhost:8000/api/user`)
  return response.data
}

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: newsData,
    isLoading: newsLoading,
    refetch: newsRefetch,
  } = useQuery(['news', id], () => fetchData(id))
  const {
    data: favoriteData,
    isLoading: favoriteLoading,
    refetch: refetchFavorite,
  } = useQuery('favoriteData', fetchFavoriteData)

  const { data: userData, refetch: userRefetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserData(),
  })

  const likeMutation = useMutation(() => addLike(id), {
    onSuccess: () => {
      newsRefetch()
      userRefetch()
    },
  })

  const favoriteMutation = useMutation(() => toggleFavorite(id), {
    onSuccess: () => {
      refetchFavorite()
    },
  })

  if (newsLoading || favoriteLoading) {
    return <div>Загрузка</div>
  }
  console.log(newsData)
  console.log(userData)

  return (
    <Container maxWidth="sm">
      <Card>
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
                onClick={() => likeMutation.mutate()}
                checked={newsData.likes.includes(userData.username)}
                icon={<Favorite />}
                checkedIcon={<Favorite color="primary" />}
              ></Checkbox>
              <Typography>{newsData.total_likes}</Typography>
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
            checked={favoriteData.includes(Number(id))}
            onChange={() => favoriteMutation.mutate()}
          />
        </CardActions>
      </Card>
    </Container>
  )
}

export default NewsDetailsPage
