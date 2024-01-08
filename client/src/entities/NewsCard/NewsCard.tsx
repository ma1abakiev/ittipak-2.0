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
import { red } from '@mui/material/colors'
import { CardType } from './type'
import { Link } from 'react-router-dom'
import $api from '../../shared/http/auth'

export default function NewsCard({
  title,
  photo,
  subtitle,
  created,
  id,
}: CardType) {
  const toggleFavorite = () => {
    $api.post('http://localhost:8000/api/user/favorite/toggle/', {
      post_id: id,
    })
  }

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
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Checkbox
            icon={<Favorite />}
            checkedIcon={<Favorite color="primary" />}
          ></Checkbox>
          <IconButton>
            <Comment />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </Box>
        <Checkbox
          // checked={}
          onClick={toggleFavorite}
          icon={<BookmarkAdd />}
          checkedIcon={<BookmarkRemove />}
        ></Checkbox>
      </CardActions>
    </Card>
  )
}
