import { Favorite, Home, Person } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation>
            <Link to={'/home'}>
              <BottomNavigationAction label="Home" icon={<Home />} />
            </Link>
            <Link to={'/favorites'}>
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
            </Link>
            <Link to={'/user'}>
              <BottomNavigationAction label="Me" icon={<Person />} />
            </Link>
          </BottomNavigation>
        </Paper>
      </div>
    </footer>
  )
}

export default Footer
