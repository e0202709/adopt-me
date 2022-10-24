import React, { useEffect, userEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

import "./App.css";

export default function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allPets = await fetch("http://www.localhost:3001/pets/list");
      const res = await allPets.json();
      const jsonResult = Object.values(res);
      setPets(jsonResult);
    };
    fetchData();
  }, []);

  var cardStyle = {
    height: "400px",
    backgroundColor: "#fff7fd",
  };
  return (
    <div className="App" style={{}}>
      <br />
      <h2>Adopt me home today!</h2>

      <Grid container spacing={5} style={{ padding: "70px" }}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={4}>
            <div key={pet.id} className="pet_item">
              <Card style={cardStyle}>
                <img className="pet_image" src={pet.image} />
                <h3>Name: {pet.name}</h3>
                <h4>Age: {pet.age}</h4>
                <h4>Category: {pet.category}</h4>
                <Button variant="contained" color="primary">
                  Edit
                </Button>{" "}
                &nbsp;
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
