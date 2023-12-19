import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import News from '../pages/News'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import NewsDetailsPage from '../features/NewsCards/components/NewsDetailsPage'
import FavoritesPage from '../pages/Favorites'
import UserPage from '../pages/User'
import Layout from '../widgets/Layout/Layout'
import Home from '../pages/Home'
import { Provider } from 'react-redux'
import store from './store'

const queryClient = new QueryClient()

const App = () => {
  const [theme, colorMode] = useMode()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline></CssBaseline>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/news" element={<News />}></Route>
                  <Route path="/news/:id" element={<NewsDetailsPage />}></Route>
                  <Route path="/favorites" element={<FavoritesPage />}></Route>
                  <Route path="/user" element={<UserPage />}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App