import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./componets/pages/Home";
import Navbar from "./componets/Navbar";
import NotFound from "./componets/pages/NotFound";
import Cart from "./componets/pages/Cart";
import FullPizza from "./componets/pages/FullPizza";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
