import CardList from "../../components/cards/cards";
import Header from "../../components/header/header";
import TabMenuList from "../../components/tab-menu-list/tab-menu-list";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from "../cart/cart";
import PageNotFound from "../page-not-found/page-not-found";


function MenuList() {

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
        <Header/>
        <TabMenuList data={menuList} />
      </div>
      <div>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<CardList menuList={menuList} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default MenuList;