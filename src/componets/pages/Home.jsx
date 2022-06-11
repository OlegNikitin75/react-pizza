import React, {useContext, useEffect, useRef, useState} from 'react';
import Categories from "../Categories";
import Sort, {list} from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import {SearchContext} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs';
import {useNavigate} from "react-router-dom";

const Home = () => {
  const {categoryId, sort, currentPage} = useSelector(state => state.filterSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if (isMounted.current) {
      console.log(isMounted)
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort,
      }));
      isSearch.current = true;
    }

  }, [dispatch]);


  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      setIsLoading(true);

      const sortBy = sort.sortProperty.replace('-', '');
      const orderValue = sort.sortProperty.includes('-') ? 'desc' : 'asc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      axios.get(`https://628faa07dc4785236544b57d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderValue}${search}`,)
        .then(res => {
          setPizzas(res.data);
          setIsLoading(false)
        });
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);




    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizzasItems = pizzas.map((pizza, index) => <PizzaBlock key={`pizza ${index}`}{...pizza}/>);
    // Фильтрация при помощи JS (подходит для статики, если ограничен массив элементов)
    // const pizzasItems = pizzas.filter(pizza => {
    //   return pizza.name.toLowerCase().includes(searchValue.toLowerCase());
    // }).map((pizza, index) => <PizzaBlock key={`pizza ${index}`}{...pizza}/>)

    // Фильтрация при помощи backend


    return (
      <div className="container">
        <div className="content__top">
          <Categories
            categoryIndex={categoryId}
            setCategoryIndex={onChangeCategory}
          />
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            isLoading ? skeleton : pizzasItems
          }
        </div>
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangePage}/>
      </div>
    );
  };

  export default Home;
