import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, Grid, Button } from "@material-ui/core";

import "./formStyles.css";

function ModalForm(props) {
  const { openModal, setOpenModal, addOrEdit, editedRecord, handleEditClose } =
    props;

  const initialFValues = {
    name: "..",
    ageRequired: "",
    age: "month",
    animalType: "Dog",
  };
  useEffect(() => {
    if (editedRecord.length > 0)
      setValues({
        ...editedRecord,
      });
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValues,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch("name")); // you can watch individual input by pass the name of the input

  const petName = editedRecord.name;
  console.log("PET NAME IS ", petName);

  return (
    <Dialog
      title="Dialog With Custom Width"
      //   modal={true}
      open={openModal}
      // open={this.state.open}
    >
      <DialogTitle>Tets</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <input
              placeholder="Pet's Name"
              defaultValue={"hihi"}
              {...register("name", { required: true })}
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
              {...register("ageRequired", { required: true })}
            />
            {errors.ageRequired && (
              <p className="errorText">* Please enter pet's age</p>
            )}
          </Grid>
          <Grid item xs={8}>
            <select {...register("age")} className="selectDropDown">
              <option value="month">month(s) old</option>
              <option value="year">year(s) old</option>
            </select>
          </Grid>
          <Grid item xs={4} className="category">
            Category:
          </Grid>
          <Grid item xs={8}>
            <select {...register("animalType")} className="selectDropDown">
              <option value="month">Cat</option>
              <option value="year">Dog</option>
            </select>
          </Grid>
        </Grid>
        <input type="submit" style={{ backgroundColor: "#99c2ff" }} />
        <Button onClick={handleEditClose}>Cancel</Button>
      </form>
    </Dialog>
  );
}

export default ModalForm;
