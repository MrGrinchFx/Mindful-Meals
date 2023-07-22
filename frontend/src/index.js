import React from 'react';
import ReactDOM from 'react-dom/client';
 import './index.css';
import App from './App';
import { RecipesContextProvider } from './context/recipeContext';
import { AuthContextProvider } from './context/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <RecipesContextProvider>
      <App />
    </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

