import {Routes, Route} from "react-router-dom";
import Layout from "./componets/Layout";
import './scss/app.scss';
import Categories from "./componets/Categories";
import Sort from "./componets/Sort";
import PizzaBlock from "./componets/PizzaBlock";
import pizzas from "./assets/pizzas.json";

const App = () => {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Layout/>}/>
        {/* <Route index element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        </Route> */}

      </Routes>

      <div className="wrapper">

        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>

            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                pizzas.map((pizza, index) => (
                  <PizzaBlock
                    key={`pizza ${index}`}
                    {...pizza}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
