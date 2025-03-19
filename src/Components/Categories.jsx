const Categories = ({ categoryApi }) => {
  return (
      <div className="category-container">
          <h2 className="categ-heading">Categories</h2>
          <section className="categories">
              {["Vegetarian", "Pasta", "Starter", "Chicken", "Dessert", "Seafood"].map((category) => (
                  <button key={category} className="category" onClick={() => categoryApi(category)}>
                      {category}
                  </button>
              ))}
          </section>
      </div>
  );
};

export default Categories;
