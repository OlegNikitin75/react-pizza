import React from 'react';

const Categories = ({categoryIndex,setCategoryIndex}) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handleCategory = (index) => {
    setCategoryIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => (
            <li onClick={() => handleCategory(index)}
                className={categoryIndex === index ? "active" : ""}
                key={index}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;

