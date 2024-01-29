import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'
import FavoritesPage from '../pages/Favorites/FavoritePage'
import Layout from '../pages/Layout/Layout'
import Home from '../pages/Home/HomePage'
import { Provider } from 'react-redux'
import store from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NewsDetailsPage from '../pages/NewsDetailsPage/NewsDetailsPage'
import LoginPage from '../pages/User/components/Login'
import RegistrationPage from '../pages/User/components/Registration'
import UserPage from '../pages/User/UserPage'

const queryClient = new QueryClient()

const App = () => {
  const [theme, colorMode] = useMode()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline></CssBaseline>
            <ToastContainer></ToastContainer>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/news/:id" element={<NewsDetailsPage />}></Route>
                  <Route path="/favorites" element={<FavoritesPage />}></Route>
                  <Route path="/login" element={<LoginPage />}></Route>
                  <Route
                    path="/registration"
                    element={<RegistrationPage />}
                  ></Route>
                  <Route path="/user" element={<UserPage></UserPage>}></Route>
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
