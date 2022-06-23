import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  type FullPizzaData = {
    name: string;
    imageUrl: string;
    price: number;
  };
  const [pizza, setPizza] = useState<FullPizzaData>();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://628faa07dc4785236544b57d.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);
  if (!pizza) {
    return <>"Загрзка..."</>;
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
