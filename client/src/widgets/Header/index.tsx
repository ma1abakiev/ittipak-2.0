import { useContext } from 'react'
import { Box, Typography, Checkbox, IconButton } from '@mui/material'
import { ModeNight, WbSunny, AccountCircle, Search } from '@mui/icons-material'
import { ColorModeContext } from '../../App/theme'

const Header = () => {
  const { toggleColorMode } = useContext(ColorModeContext)
  return (
    <>
      <header>
        <div className="container">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 120,
            }}
          >
            <Typography
              variant="h2"
              component={'h2'}
              sx={{ fontSize: 30, fontWeight: 900 }}
            >
              ITTIPAK
            </Typography>
            <Typography
              variant="h1"
              component={'h1'}
              sx={{ fontSize: 30, fontWeight: 900 }}
            >
              УЙГУРСКИЙ НОВОСТНОЙ ПОРТАЛ
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '25px',
                alignItems: 'center',
              }}
            >
              <Checkbox
                onClick={toggleColorMode}
                icon={<ModeNight fontSize="large" color="primary"></ModeNight>}
                checkedIcon={<WbSunny fontSize="large"></WbSunny>}
              ></Checkbox>
              <IconButton color="secondary">
                <AccountCircle
                  sx={{ cursor: 'pointer' }}
                  fontSize="large"
                ></AccountCircle>
              </IconButton>
              <IconButton color="secondary">
                <Search sx={{ cursor: 'pointer' }} fontSize="large"></Search>
              </IconButton>
            </Box>
          </Box>
        </div>
      </header>
    </>
  )
}

export default Header
