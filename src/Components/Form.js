import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, Grid, Button } from "@material-ui/core";

import "./formStyles.css";
import axios from "axios";

function ModalForm(props) {
  const { openModal, addOrEdit, editedRecord, handleEditClose, getData } =
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
    handleSubmitForm();
  };

  const modalTitle = addOrEdit === "Add" ? "Add new pet" : "Edit pet";

  const handleSubmitForm = () => {
    handleEditClose();
    if (addOrEdit === "Add") {
      axios.post(`http://54.179.9.102:3001/pets/addpet`, getValues("record"))
        .then((response) => {
          if (response.status === 200) {
          }
          getData()
          // window.location.reload(false);
        })
        .catch((err) => console.error(err));
    } else {
      axios.put(
        `http://54.179.9.102:3001/pets/${editedRecord.id}`,
        getValues("record")
      ).then((response) => {
        if (response.status === 200) {
          getData()
          // window.location.reload(false);
        }
      })
        .catch((err) => console.error(err));
    }
  };

  const closeModalForm = () => {
    handleEditClose()
  }
  return (
    <Dialog open={openModal}>
      <DialogTitle>{modalTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12}>
            <input id="name"
              placeholder="Pet's Name"
              {...register("record.name", { required: true })}
            />
            {(!!errors.record) && (errors.record.name !== undefined) && (errors.record.name.type === "required" && (
              <p className="errorText">
                {"* Please enter pet's name"}
              </p>
            ))}
          </Grid>
          <Grid item xs={4}>
            <input
              className="inputAge"
              type="number"
              placeholder="Age"
              {...register("record.age", { required: true })}
            />
            {(!!errors.record) && (errors.record.age !== undefined) && (errors.record.age.type === "required" && (
              <p className="errorText">
                {"* Please enter pet's age"}
              </p>
            ))}
          </Grid>
          <Grid item xs={8}>
            <select {...register("record.ageUnit")} className="selectDropDown">
              <option value="month(s) old">month(s) old</option>
              <option value="year(s) old">year(s) old</option>
            </select>
          </Grid>
          <Grid item xs={4} className="category">
            Category:
          </Grid>
          <Grid item xs={8}>
            <select
              {...register("record.category")}
              className="selectDropDown"
            >
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
            </select>
          </Grid>
        </Grid>
        <input type="submit" style={{ backgroundColor: "#99c2ff" }} />
        <Button onClick={closeModalForm}>Cancel</Button>
      </form>
    </Dialog>
  );
}

export default ModalForm;
