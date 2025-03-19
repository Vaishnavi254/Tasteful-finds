import { useState, useEffect } from "react";
import "./App.css";
import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ImageCom from "./Components/ImageCom";
import RecommandedRecipes from "./Components/RecommandedRecipe";
import Mealcard from "./Components/Mealcard";

function App() {
    const [data, SetData] = useState([]);  // Set initial state as an empty array
    const [search, SetSearch] = useState("");  
    const [recommanded, SetRecommanded] = useState([]);  // Initialize as an empty array
    const [category, SetCategory] = useState("Pasta");  // Default category to "Pasta"

    // Fetch meals by category
    const categoryApi = async (category) => {
        const get = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const jsonData = await get.json();
        if (jsonData.meals) {
            SetData(jsonData.meals);  // Set meals for the category
        } else {
            SetData([]);  // Set empty array if no results are found
        }
        console.log(jsonData.meals);
    };
  
    const Api = async () => {
        const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const jsonData = await get.json();
        
        console.log(jsonData.meals);  // Log the entire response object
        if (jsonData.meals) {
          SetData(jsonData.meals);  // Set meals if found
        } else {
          SetData([]);  // Set empty array if no meals are found
        }
    };
      
    // Fetch the recommended recipes using specific meal IDs
    const recommandedApi = async () => {
        const mealIds = ["52807", "52867", "52900"];  // Example: list of meal IDs you want to fetch
        try {
            const fetchPromises = mealIds.map(id => 
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json())
            );
    
            const responses = await Promise.all(fetchPromises);
    
            const meals = responses.map(response => response.meals).flat();
    
            SetRecommanded(meals);
            console.log(meals);  // Log the combined list of meals
        } catch (error) {
            console.error("Error fetching recommended recipes:", error);
            SetRecommanded([]);  // Handle any errors and set an empty array
        }
    };

    const handleCategoryChange = (event) => {
        SetCategory(event.target.value);
    };

    const handleSearchInput = (event) => {
        SetSearch(event.target.value);  // Update search state as user types
    };

    useEffect(() => {
        recommandedApi();
        categoryApi(category);
    }, []);  // Fetch data only on initial render

    return (
        <>
            <Header searchinput={handleSearchInput} searchClick={Api} />
            <ImageCom />
            <main className="container">
                <div className="content-wrapper">
                    <RecommandedRecipes recommanded={recommanded} />
                    <Categories categoryApi={categoryApi} handleCategoryChange={handleCategoryChange} />
                    <div className="meal-container">
                        <Mealcard data={data} />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
