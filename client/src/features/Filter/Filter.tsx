import { Box, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

const Filter = () => {
  return (
    <>
      <Box>
        <Typography component={'h3'} variant="h3">
          Категории
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mt: '50px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox defaultChecked />
            <Typography>Новые</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox defaultChecked />
            <Typography>Старые</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox defaultChecked />
            <Typography>Популярные</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Filter
