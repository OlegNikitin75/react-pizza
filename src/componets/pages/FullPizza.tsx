import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza:FC component = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://628faa07dc4785236544b57d.mockapi.io/items/${id}`
        );
        console.log(data);
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
      }
    }
    fetchPizza();
  }, [id]);
  if (!pizza) {
    return "Загрзка...";
  }

  return (
    <div className="container">
      <div className="content">
        <div className="content__pizza">
          <h2>{pizza.name}</h2>
          <img src={pizza.imageUrl} alt={pizza.name} />
          <span className="content__pizza-price">от {pizza.price} ₽</span>
          <Link to="/" className="button button--black">
            <span>На главную</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
