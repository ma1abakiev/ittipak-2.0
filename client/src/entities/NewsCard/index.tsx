import s from './index.module.css'
import { Card } from './type'
import shareIcon from './img/share.svg'
import heartIcon from './img/heart.svg'

const NewsCard = ({ date, title, text, img }: Card) => {
  return (
    <div className={s.card}>
      <div className={s.content}>
        <img src={img} alt="" className={s.img} />
        <div className={s.info}>
          <div className={s.top}>
            <span className={s.date}>{date}</span>
            <img src={heartIcon} alt="" className={s.heartImg} />
          </div>
          <h4 className={s.title}>{title}</h4>
          <p className={s.text}>{text}</p>
          <a href="#" className={s.link}>
            {'Читать дальше>>'}
          </a>
          <img src={shareIcon} alt="" className={s.shareImg} />
        </div>
      </div>
    </div>
  )
}

export default NewsCard
