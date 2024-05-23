import React from 'react';
import { CategoryInfo } from './Categoryinfo';
import CategoryCard from './CategoryCard';
import classes from "./category.module.css"

function Category() {
  return (
    <section className={classes.category_container}>
      {CategoryInfo.map((infos) => (
        <CategoryCard data={infos} key={infos.id} />
      ))}
    </section>
  );
}

export default Category;
