import { Outlet } from 'react-router-dom';
import Nav from './Nav';


const Layout = () => {
  return (
    <>
      <Nav></Nav>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;