import { useNavigate } from 'react-router-dom';

const RecommandedRecipes = ({ recommanded }) => {
    const navigate = useNavigate(); // Get the navigate function

    const handleClick = (id) => {
        // Redirect to the detailed recipe page
        navigate(`/detail-recipe/${id}`);
    };

    return (
        <section className="recommended-recipes">
            <h2>Recommended Recipes</h2>
            <div className="recipe-list">
                {recommanded && recommanded.length > 0 ? (
                    recommanded.map((recipe) => (
                        <div className="recipe-card" key={recipe.idMeal}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <p>{recipe.strMeal}</p>
                            <button onClick={() => handleClick(recipe.idMeal)}>Recipe</button> {/* Click to navigate */}
                        </div>
                    ))
                ) : (
                    <p>Loading recommended recipes...</p>
                )}
            </div>
        </section>
    );
};

export default RecommandedRecipes;
