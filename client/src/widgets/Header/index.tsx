import s from './index.module.css'
import searchIcon from './img/search.svg'
import userIcon from './img/user.svg'
import menuIcon from './img/menu.svg'

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className={s.content}>
            <div className={s.logo}>ITTIPAK</div>
            <span className={s.title}>УЙГУРСКИЙ НОВОСТНОЙ ПОРТАЛ</span>
            <div className={s.icons}>
              <img src={searchIcon} alt="" className={s.icon} />
              <img src={userIcon} alt="" className={s.icon} />
              <img src={menuIcon} alt="" className={s.icon} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
