import React from 'react'
import s from './index.module.css'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.content}>
          <h2 className={s.title}>ITTIPAK</h2>
          <nav className={s.nav}>
            <a href="" className={s.link}>
              Мой профиль
            </a>
            <a href="" className={s.link}>
              Главная
            </a>
            <a href="" className={s.link}>
              Избранные новости
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
