import React, { useEffect, userEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "./Components/Form";
import "./App.css";

export default function App() {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPet, setEditPet] = useState({});
  const [addOrEditAction, setAddOrEditAction] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const allPets = await fetch("http://student-6.sutdacademytools.net:3001/pets/list");
      const res = await allPets.json();
      const jsonResult = Object.values(res);
      setPets(jsonResult);
    };
    fetchData();
  }, []);

  const showEditModal = (pet) => {
    setShowModal(true);
    setEditPet(pet);
    setAddOrEditAction("Edit");
    console.log("HIII " + editPet.name);
  };

  const showAddModal = () => {
    setShowModal(true);
    setEditPet({});
    setAddOrEditAction("Add");
  }

  const closeModal = () => {
    setShowModal(false);
    setEditPet({});
    setAddOrEditAction("");
  };
  var cardStyle = {
    height: "400px",
    backgroundColor: "#fff7fd",
  };
  return (
    <div className="App" style={{}}>
      <br />
      <h2>Adopt me home today!</h2>
      <Button onClick={()=>showAddModal()}>ADD </Button>

      <Grid container spacing={5} style={{ padding: "70px" }}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={4}>
            <div className="pet_item">
              <Card style={cardStyle}>
                <img className="pet_image" src={pet.image} />
                <h3>Name: {pet.name}</h3>
                <h4>Age: {pet.age} {pet.ageUnit} </h4>
                <h4>Category: {pet.category}</h4>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => showEditModal(pet)}
                >
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
        <Modal
          openModal={showModal}
          addOrEdit={addOrEditAction}
          handleEditClose={closeModal}
          editedRecord = {editPet}
        />
      </Grid>
    </div>
  );
}
