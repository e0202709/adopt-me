import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, Grid, Button } from "@material-ui/core";

import "./formStyles.css";
import { useReducer } from "react";
import axios from "axios";

function ModalForm(props) {
  const { openModal, setOpenModal, addOrEdit, editedRecord, handleEditClose } =
    props;

  useEffect(() => {
    if (editedRecord)
      setValue("record", {
        ...editedRecord,
      });
  }, [editedRecord]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleTest();
  };

  const modalTitle = addOrEdit === "Add" ? "Add new pet" : "Edit pet";

  const handleTest = () => {
    handleEditClose();
    console.log("get values ", JSON.stringify(getValues()));
    if (addOrEdit === "Add") {
      let test = axios
        .post(`http://student-6.sutdacademytools.net:3001/pets/addpet`, getValues("record"))
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
          if (response.status === 200) {
            console.log(test);
          }
        })
        .catch((err) => console.error(err));
    } else {
      axios.put(
        `http://student-6.sutdacademytools.net:3001/pets/${editedRecord.id}`,
        getValues("record")
      );
    }
  };

  return (
    <Dialog title="Dialog With Custom Width" open={openModal}>
      <DialogTitle>{modalTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <input
              placeholder="Pet's Name"
              {...register("record.name", { required: true })}
            />
            {errors.name && (
              <p className="errorText">* Please enter pet's name</p>
            )}
          </Grid>
          <Grid item xs={4}>
            <input
              className="inputAge"
              type="number"
              placeholder="Age"
              {...register("record.age", { required: true })}
            />
            {errors.ageRequired && (
              <p className="errorText">* Please enter pet's age</p>
            )}
          </Grid>
          <Grid item xs={8}>
            <select {...register("record.ageUnit")} className="selectDropDown">
              <option value="month">month(s) old</option>
              <option value="year">year(s) old</option>
            </select>
          </Grid>
          <Grid item xs={4} className="category">
            Category:
          </Grid>
          <Grid item xs={8}>
            <select
              {...register("record.animalType")}
              className="selectDropDown"
            >
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
          </Grid>
        </Grid>
        <input type="submit" style={{ backgroundColor: "#99c2ff" }} />
        <Button>Cancel</Button>
      </form>
    </Dialog>
  );
}

export default ModalForm;
