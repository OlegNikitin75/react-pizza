import React, {useState} from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [categoryIndex, setCategoryIndex] = useState(0);
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
                key={`Category ${index}`}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;

