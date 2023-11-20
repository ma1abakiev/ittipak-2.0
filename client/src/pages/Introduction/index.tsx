import Header from '../../widgets/Header'
import NewsSection from '../../widgets/NewsSection'
import s from './index.module.css'
import Footer from '../../widgets/Footer'

const Introduction = () => {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <Header></Header>
        <NewsSection></NewsSection>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default Introduction
