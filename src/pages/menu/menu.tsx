import CardList from "../../components/cards/cards";
import Header from "../../components/header/header";
import TabMenuList from "../../components/tab-menu-list/tab-menu-list";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Cart from "../cart/cart";
import PageNotFound from "../page-not-found/page-not-found";

const MenuList = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {

  const location = useLocation();

  let menuList = [
    {
        id:'starters',
        title: 'Starters',
    },
    {
        id:'chinese',
        title: 'Chinese',
    },
    {
        id:'main',
        title: 'Main Course',
    },
  ]
  return (
    <div>
      <div className="sticky top-0 bg-white z-50">
        {location.pathname !== "/404" &&<Header cart_length={null}/>}
        {location.pathname === "/" && <TabMenuList data={menuList} />}
      </div>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<CardList menuList={menuList} />} />
            <Route path="/cart" element={<Cart menuList={menuList} />} />
            <Route path="/404" element={<PageNotFound />} />
            {/* Redirect all unknown paths to /404 */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MenuList;