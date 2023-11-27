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

export default function NewsCard({ date, title, text, img }: CardType) {
  return (
    <Card sx={{ maxWidth: 845 }}>
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
        subheader={date}
      />
      <CardMedia component="img" height="250" image={img} alt="Uyghur" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
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
          icon={<BookmarkAdd />}
          checkedIcon={<BookmarkRemove />}
        ></Checkbox>
      </CardActions>
    </Card>
  )
}
