import React, {useEffect, useState} from 'react';
import Categories from "../Categories";
import Sort from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortType, setSortType] = useState({name: 'популярности 🠕', sortProperty: 'rating'});
  useEffect(() => {
      setIsLoading(true);
      const sortBy = sortType.sortProperty.replace('-', '');
      const orderValue = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
      const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';

      fetch(`https://628faa07dc4785236544b57d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${orderValue}`,)


        .then(res => res.json())
        .then(data => {
          setPizzas(data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0)
    },
    [categoryIndex, sortType]);
  console.log(pizzas)
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryIndex={categoryIndex}
          setCategoryIndex={setCategoryIndex}
        />
        <Sort
          sortType={sortType}
          setSortType={setSortType}
        />

      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">

        {
          isLoading
            ? [...new Array(6)].map((_, index) =>
              <Skeleton key={index}/>)
            : pizzas.map((pizza, index) =>
              <PizzaBlock
                key={`pizza ${index}`
                }
                {...pizza}
              />
            )
        }


      </div>
    </div>
  );
};

export default Home;
