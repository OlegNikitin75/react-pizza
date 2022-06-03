import React, {useContext, useEffect, useState} from 'react';
import Categories from "../Categories";
import Sort from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import {SearchContext} from "../../App";

const Home = () => {
  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortType, setSortType] = useState({name: 'популярности 🠕', sortProperty: 'rating'});
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
      setIsLoading(true);

      const sortBy = sortType.sortProperty.replace('-', '');
      const orderValue = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
      const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      fetch(`https://628faa07dc4785236544b57d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderValue}${search}`,)
        .then(res => res.json())
        .then(data => {
          setPizzas(data);
          setIsLoading(false);
        });
      window.scrollTo(0, 0)
    },
    [categoryIndex, sortType, searchValue,currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

  // Фильтрация при помощи JS (подходит для статики, если ограничен массив элементов)
  // const pizzasItems = pizzas.filter(pizza => {
  //   return pizza.name.toLowerCase().includes(searchValue.toLowerCase());
  // }).map((pizza, index) => <PizzaBlock key={`pizza ${index}`}{...pizza}/>)

  // Фильтрация при помощи backend
  const pizzasItems = pizzas.map((pizza, index) => <PizzaBlock key={`pizza ${index}`}{...pizza}/>)

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
          isLoading ? skeleton : pizzasItems
        }
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
