import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DetailRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                if (data.meals) {
                    setRecipe(data.meals[0]);
                }
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) {
        return <div className="loading">Loading...</div>;
    }

    // Clean and split instructions properly
    const instructions = recipe.strInstructions
        .replace(/\r\n|\r|\n/g, '\n')  // Normalize all line breaks to a single type
        .split('\n')                  // Split by the normalized line break
        .filter(step => step.trim() !== ''); // Remove empty steps

    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <Link to="/Tasteful-finds/" className="back-button">⬅️</Link>
                <div className="recipe-hero">
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-hero-img" />
                    <div className="recipe-info">
                        <h2>{recipe.strMeal}</h2>
                        <p><strong>Category:</strong> {recipe.strCategory}</p>
                        <p><strong>Cuisine:</strong> {recipe.strArea}</p>
                    </div>
                </div>
            </div>

            <div className="recipe-content">
                <article>
                    <h4>Instructions</h4>
                    {instructions.map((step, index) => (
                        <div key={index} className="single-instruction">
                            <header>
                                <p>Step {index + 1}</p>
                            </header>
                            <p>{step}</p>
                        </div>
                    ))}
                </article>

                <article className="second-column">
                    <h4>Ingredients</h4>
                    <ul className="recipe-ingredients">
                        {Array.from({ length: 20 }, (_, i) => i + 1)
                            .map(i => recipe[`strIngredient${i}`] && recipe[`strMeasure${i}`] ? (
                                <li key={i} className="single-ingredient">
                                    <span className="ingredient-quantity">{recipe[`strMeasure${i}`]}</span> {recipe[`strIngredient${i}`]}
                                </li>
                            ) : null)}
                    </ul>
                </article>
            </div>

            <div className="recipe-video-container">
                <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-video">📺 Watch Recipe Video</a>
            </div>
        </div>
    );
};

export default DetailRecipe;
