import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ItemContextProvider } from './context/ItemContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <ItemContextProvider>
          <App />
        </ItemContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
