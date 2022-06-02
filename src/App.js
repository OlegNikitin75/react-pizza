import {Routes, Route} from "react-router-dom";
import './scss/app.scss';
import Home from "./componets/pages/Home";
import Navbar from "./componets/Navbar";
import NotFound from "./componets/pages/NotFound";
import Cart from "./componets/pages/Cart";

const App = () => {


  return (
    <div>
      <div className="wrapper">
        <Navbar/>
        <div className="content">
            <Routes>
              <Route index element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
