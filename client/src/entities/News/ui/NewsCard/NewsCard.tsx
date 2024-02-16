import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
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

const fetchFavoriteData = async () => {
  const response = await $api.get('http://localhost:8000/api/user/favorite')
  return response.data.favorite_posts.map((card: any) => card.id)
}

const addLikeMutation = async (postId: number) => {
  await $api.get(`http://localhost:8000/api/post/like/${postId}`)
}

const toggleFavoriteMutation = async (postId: number) => {
  await $api.post('http://localhost:8000/api/user/favorite/', {
    post_id: postId,
  })
}

const fetchUserData = async () => {
  const response = await $api.get(`http://localhost:8000/api/user`)
  return response.data
}

export default function NewsCard({
  title,
  photo,
  subtitle,
  created,
  id,
  total_likes,
  likes,
}: CardType) {
  const queryClient = useQueryClient()

  const { data: favoriteData, refetch: refetchFavoriteData } = useQuery(
    'favoriteData',
    fetchFavoriteData,
    {
      enabled: false, // Отключаем автоматическую загрузку данных при монтировании компонента
      refetchOnMount: false, // Также отключаем автоматическую перезагрузку данных при монтировании
    }
  )
  const { data: userData, refetch: userRefetch } = useQuery(
    'userData',
    fetchUserData
  )

  const addLikeMutationInstance = useMutation(
    (postId: number) => addLikeMutation(postId),
    {
      onSuccess: async () => {
        await userRefetch()
        await refetchFavoriteData()
        // userRefetch()
        // refetchFavoriteData()
        // queryClient.invalidateQueries('favoriteData')
        // // Добавляем следующую строку для вызова refetch для favoriteData
        // queryClient.refetchQueries('favoriteData')
      },
    }
  )

  const toggleFavoriteMutationInstance = useMutation(
    (postId: number) => toggleFavoriteMutation(postId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('favoriteData')
      },
    }
  )

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
              onClick={() => addLikeMutationInstance.mutate(id)}
              icon={<Favorite />}
              checkedIcon={<Favorite color="primary" />}
              checked={
                userData && userData.username
                  ? likes.includes(userData.username)
                  : false
              }
            />
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
          checked={favoriteData?.includes(id)}
          onChange={() => toggleFavoriteMutationInstance.mutate(id)}
        />
      </CardActions>
    </Card>
  )
}
