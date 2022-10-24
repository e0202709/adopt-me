import React, { useEffect, userEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allPets = await fetch("http://localhost:3001/pets");
      setPets(allPets);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h2>Pets for adoption:</h2>
      </header>
    </div>
  );
}

export default App;
