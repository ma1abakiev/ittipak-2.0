import Header from '../../widgets/Header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  )
}

export default Layout
