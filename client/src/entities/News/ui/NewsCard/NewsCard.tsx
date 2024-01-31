import { useEffect, useState } from 'react'
import $api from '../../../../shared/http/auth'
import { CardType } from '../../types/type'
import { Link } from 'react-router-dom'
import { red } from '@mui/material/colors'
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Checkbox,
  Typography,
} from '@mui/material'
import {
  Favorite,
  Share,
  MoreVert,
  Comment,
  BookmarkAdd,
  BookmarkRemove,
} from '@mui/icons-material'

export default function NewsCard({
  title,
  photo,
  subtitle,
  created,
  id,
  total_likes,
  likes,
  file,
}: CardType) {
  const [favoriteData, setFavoriteData] = useState([])
  // const [user, setUser] = useState()

  const fetchData = async () => {
    try {
      const response = await $api.get('http://localhost:8000/api/user/favorite')
      const idsArray = response.data.favorite_posts.map((card) => card.id)
      setFavoriteData(idsArray)
    } catch (error) {
      console.log(error)
    }
  }
  // const fetchUser = async () => {
  //   try {
  //     const response = await $api.get('http://localhost:8000/api/user/')
  //     setUser(response)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }
  const toggleFavorite = async () => {
    try {
      await $api.post('http://localhost:8000/api/user/favorite/', {
        post_id: id,
      })

      // После успешного обновления отправляем новый запрос для получения актуальных данных
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const addLike = () => {
    $api.get(`http://localhost:8000/api/post/like/${id}`)
  }

  useEffect(() => {
    fetchData()
    // fetchUser()
  }, [])
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={title}
        subheader={created}
      />
      <Link to={`/news/${id}`}>
        <CardMedia
          src={photo}
          component="img"
          height="250"
          image={photo}
          alt="Uyghur"
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
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
            <Typography>{total_likes}</Typography>
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
  )
}
