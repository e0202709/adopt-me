import React, { useEffect, useState } from "react";
import Modal from "./Components/Form";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Grid, Button, Card } from "@material-ui/core";

import "./App.css";
import axios from "axios";

export default function App() {
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editPet, setEditPet] = useState({});
  const [deletePet, setDeletePet] = useState({});
  const [addOrEditAction, setAddOrEditAction] = useState("");


  const fetchData = () => {
     axios.get('http://localhost:3001/pets/list')
      .then(resp => {
        const data = resp.data;
        const jsonResult = Object.entries(data);
        setPets(jsonResult);

      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = (jsonResult) => {
    setPets(jsonResult);
  }

  const showEditModal = (pet, id) => {
    setShowModal(true);
    pet.id = id;
    setEditPet(pet);
    setAddOrEditAction("Edit");
  };

  const showDeleteModal = (pet, id) => {
    setDeleteModal(true);
    pet.id = id;
    setDeletePet(pet)
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false).then(() => setDeletePet({}))
  }

  const handleDeleteModal = () => {
    const id = deletePet.id
    setDeleteModal(false);
    axios.delete(`http://localhost:3001/pets/delete/${id}`).then((response) => {
      if (response.status === 200) {
        const data = response.data;
        const jsonResult = Object.entries(data);
        setPets(jsonResult);
        setDeletePet({})
      }
    })
      .catch((err) => console.error(err));
  }

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
      <Button style={{
        backgroundColor: "#30bfea",
      }} variant="contained" onClick={() => showAddModal()}>ADD A NEW PET</Button>

      <Grid container spacing={5} style={{ padding: "70px" }}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={4}>
            <div className="pet_item">
              <Card style={cardStyle}>
                <img className="pet_image" src={pet[1].image} />
                <h3>Name: {pet[1].name}</h3>
                <h4>Age: {pet[1].age} {pet[1].ageUnit} </h4>
                <h4>Category: {pet[1].category}</h4>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => showEditModal(pet[1], pet[0])}
                >
                  Edit
                </Button>{" "}
                &nbsp;
                <Button variant="contained" color="secondary" onClick={() => showDeleteModal(pet[1], pet[0])}>
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
          editedRecord={editPet}
          setNewData = {updateData}
        />
      </Grid>
      <Dialog
        open={deleteModal}
        onClose={handleCloseDeleteModal}
      >
        <DialogTitle>{`Delete ${deletePet.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete {deletePet.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModal}>Yes</Button>
          <Button onClick={handleCloseDeleteModal}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
