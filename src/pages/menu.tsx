import CardList from "../components/cards/cards";
import Header from "../components/header/header";
import TabMenuList from "../components/tab-menu-list/tab-menu-list";

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
        <CardList menuList={menuList} />
      </div>
    </div>
  );
}

export default MenuList;