import Header from '../../widgets/Header'
import NewsSection from '../../widgets/NewsSection'
import { Box } from '@mui/material'
// import Footer from '../../widgets/Footer'

const Introduction = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Header></Header>
        <NewsSection></NewsSection>
      </Box>
      {/* <Footer></Footer> */}
    </>
  )
}

export default Introduction
