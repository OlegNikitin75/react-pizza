import React, { useEffect, useRef } from "react";
import Categories from "../Categories";
import Sort, { list } from "../Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzas } from "../../redux/slices/pizzasSlice";

const Home = () => {
  const { items, status } = useSelector(selectPizzas);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    // @ts-ignore
    (state) => state.filterSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const orderValue = sort.sortProperty.includes("-") ? "desc" : "asc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        orderValue,
        category,
        search,
        currentPage,
      })
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      console.log(isMounted);
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
    if (window.location.hash) {
      const params = qs.parse(window.location.hash.substring(3));
      const sort = list.find(
        (obj: any) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzasItems = items.map((pizza: any, index: number) => (
    <PizzaBlock key={`pizza ${index}`} {...pizza} />
  ));
  // Фильтрация при помощи JS (подходит для статики, если ограничен массив элементов)
  // const pizzasItems = pizzas.filter(pizza => {
  //   return pizza.name.toLowerCase().includes(searchValue.toLowerCase());
  // }).map((pizza, index) => <PizzaBlock key={`pizza ${index}`}{...pizza}/>)

  // Фильтрация при помощи backend в redux.

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryIndex={categoryId}
          setCategoryIndex={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzasItems}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
