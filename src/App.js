import {Routes, Route} from "react-router-dom";
import './scss/app.scss';
import Home from "./componets/pages/Home";
import Navbar from "./componets/Navbar";
import NotFound from "./componets/pages/NotFound";
import Cart from "./componets/pages/Cart";
import {createContext, useState} from "react";

export const SearchContext = createContext(undefined);

const App = () => {

  const [searchValue, setSearchValue] = useState('');

  return (
      <div className="wrapper">
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
          <Navbar/>
          <div className="content">
            <Routes>
              <Route index element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
  );
}

export default App;
