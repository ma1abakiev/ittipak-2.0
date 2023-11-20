import s from './index.module.css'
const Filter = () => {
  return (
    <div>
      <h4 className={s.title}>Фильтрация</h4>
      <div className={s.checkboxs}>
        <div className={s.item}>
          <input type="checkbox" className={s.checkbox} />
          <span className={s.text}>Спорт</span>
        </div>
        <div className={s.item}>
          <input type="checkbox" className={s.checkbox} />
          <span className={s.text}>Политика</span>
        </div>
        <div className={s.item}>
          <input type="checkbox" className={s.checkbox} />
          <span className={s.text}>Звезды</span>
        </div>
        <div className={s.item}>
          <input type="checkbox" className={s.checkbox} />
          <span className={s.text}>Искусство</span>
        </div>
        <div className={s.item}>
          <input type="checkbox" className={s.checkbox} />
          <span className={s.text}>Мода</span>
        </div>
      </div>
      <button className={s.btn}>Применить</button>
    </div>
  )
}

export default Filter
