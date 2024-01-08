import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MoreIcon from '@mui/icons-material/MoreVert'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { ColorModeContext } from '../../App/theme'
import { Button, Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'
import { logout } from '../../pages/User/slices/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Search from '../../features/Search/Search'

export default function Header() {
  const { toggleColorMode } = useContext(ColorModeContext)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const handleExit = async () => {
    try {
      dispatch(logout())
      toast.success('Выход')
    } catch (e) {
      toast.error('Выйти не удалось')
    }
  }
  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link style={{ color: 'black', textDecoration: 'none' }} to={'/login'}>
          My account
        </Link>
      </MenuItem>
      <MenuItem onClick={handleExit}>Exit</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Checkbox
          size="medium"
          onClick={toggleColorMode}
          icon={<DarkModeIcon></DarkModeIcon>}
          checkedIcon={<LightModeIcon></LightModeIcon>}
        ></Checkbox>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Ittipak
          </Typography>
          <Search></Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Link to={'/home'}>
              <Button color="secondary">Home</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={'/favorites'}>
              <Button color="secondary">Favorites</Button>{' '}
            </Link>
            <Link to={'/login'}>
              <Button color="secondary">User</Button>{' '}
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Checkbox
              size="medium"
              onClick={toggleColorMode}
              icon={<DarkModeIcon></DarkModeIcon>}
              checkedIcon={<LightModeIcon></LightModeIcon>}
            ></Checkbox>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
