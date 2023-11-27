import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black' }}>
      <div className="container">
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{ textAlign: 'center', mr: '45px', fontWeight: 900 }}
            variant="h2"
            component="h2"
          >
            ITTIPAK
          </Typography>
          <nav
            style={{
              marginTop: '50px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <a style={{ color: 'white', cursor: 'pointer' }}>Мой профиль</a>
            <a style={{ color: 'white', cursor: 'pointer' }}>Главная</a>
            <a style={{ color: 'white', cursor: 'pointer' }}>
              Избранные новости
            </a>
          </nav>
        </Box>
      </div>
    </footer>
  )
}

export default Footer
