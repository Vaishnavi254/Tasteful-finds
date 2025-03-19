import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import necessary components
import App from './App';
import DetailRecipe from './Components/DetailRecipe';

// Create the root for your app
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>  {/* This is where you should define your routes */}
      <Routes>
        {/* Define your routes */}
        <Route path="/Tasteful-finds/" element={<App />} />  {/* Main route for the app */}
        <Route path="detail-recipe/:id" element={<DetailRecipe />} />  {/* Dynamic route for recipe detail */}
      </Routes>
    </Router>
  </StrictMode>
);
