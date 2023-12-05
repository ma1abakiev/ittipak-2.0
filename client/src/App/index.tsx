import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Introduction from '../pages/Introduction'
import News from '../pages/News'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import { ThemeProvider } from '@mui/system'
import NewsDetailsPage from '../features/NewsCards/components/NewsDetailsPage'
import Footer from '../widgets/Footer'
import FavoritesPage from '../pages/Favorites'
import UserPage from '../pages/User'

const queryClient = new QueryClient()

const App = () => {
  const [theme, colorMode] = useMode()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Introduction />}></Route>
                <Route path="/news" element={<News />}></Route>
                <Route path="/news/:id" element={<NewsDetailsPage />}></Route>
                <Route path="/favorites" element={<FavoritesPage />}></Route>
                <Route path="/user" element={<UserPage />}></Route>
              </Routes>
              <Footer></Footer>
            </BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  )
}

export default App
