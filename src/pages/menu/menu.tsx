import CardList from "../../components/cards/cards";
import Header, { cart_Data } from "../../components/header/header";
import TabMenuList from "../../components/tab-menu-list/tab-menu-list";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Cart from "../cart/cart";
import PageNotFound from "../page-not-found/page-not-found";
import OrderPlaced from "../order-placed/order-placed";
import Status from "../status_page/status_page";

const MenuList = () => {

  const sessionData = sessionStorage.getItem('cartData');
  const parsedData = sessionData ? JSON.parse(sessionData) : []; // Fallback to empty array

  cart_Data(parsedData)
  
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
      tableNo: 1,
      menulist:[
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
    },
  ]
  return (
    <div>
      <div className="sticky top-0 bg-white z-50">
        {location.pathname !== "/404" &&<Header/>}
        {location.pathname === "/" && <TabMenuList data={menuList[0].menulist} />}
      </div>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<CardList menuList={menuList[0].menulist} />} />
            <Route path="/cart" element={<Cart menuList={menuList[0].menulist} />} />
            <Route path="/ordered" element={<OrderPlaced />}/>
            <Route path="/status" element={<Status />}/>
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