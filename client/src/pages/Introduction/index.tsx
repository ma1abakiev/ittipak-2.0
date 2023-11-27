import Header from '../../widgets/Header'
import NewsSection from '../../widgets/NewsSection'
import { Box } from '@mui/material'
import Footer from '../../widgets/Footer'

const Introduction = () => {
  return (
    <>
      <Box
        color={'primary'}
        bgcolor={'primary'}
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <Header></Header>
        <NewsSection></NewsSection>
      </Box>
      <Footer></Footer>
    </>
  )
}

export default Introduction
