import { useNavigate } from 'react-router-dom';

const Mealcard = ({ data }) => {
    const navigate = useNavigate(); // Get the navigate function

    const handleClick = (id) => {
        // Redirect to the detailed recipe page
        navigate(`/detail-recipe/${id}`);
    };

    return (
        <div className="meals">
            {data && data.map((curItem) => {
                return (
                    <div key={curItem.idMeal}>
                        <img src={curItem.strMealThumb} alt={curItem.strMeal} />
                        <p>{curItem.strMeal}</p>
                        <button onClick={() => handleClick(curItem.idMeal)}>Recipe</button>  {/* Click to navigate */}
                    </div>
                );
            })}
        </div>
    );
};

export default Mealcard;
