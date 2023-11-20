import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Introduction from '../pages/Introduction'
import News from '../pages/News'


const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Introduction />}></Route>
          <Route path="/news" element={<News />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
