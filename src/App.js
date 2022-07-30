import React from 'react';
import './App.css';
import { AppLogger } from './applications/applicationsLogger/AppLogger'

const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider>
      <AppLogger />
    </ThemeContext.Provider>
  );
}

export default App;
