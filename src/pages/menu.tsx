import CardList from "../components/cards/cards";
import Header from "../components/header/header";
import TabMenuList from "../components/tab-menu-list/tab-menu-list";

function MenuList() {
  return (
    <div>
      <div className="sticky top-0 bg-white z-50">
        <Header/>
        <TabMenuList/>
      </div>
      <div className="mt-6 mb-6">
        <CardList/>
      </div>
    </div>
  );
}

export default MenuList;