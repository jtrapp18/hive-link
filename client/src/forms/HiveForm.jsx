import React, { useContext, useState } from "react";
import { UserContext } from '../context/userProvider';
import {useOutletContext} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { patchJSONToDb, postJSONToDb } from '../helper';
import Error from "../styles/Error";
import { StyledForm, StyledSubmit, Button } from '../MiscStyling'
import useCrudStateDB from '../hooks/useCrudStateDB';

const HiveForm = ({ initObj }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!initObj);
  const { setHives } = useOutletContext();
  const {addItem, updateItem} = useCrudStateDB(setHives, "hives");

  const initialValues = initObj
    ? {
        dateAdded: initObj.dateAdded || "",
        material: initObj.material || "",
        locationLat: initObj.locationLat || "",
        locationLong: initObj.locationLong || "",
      }
    : {
        dateAdded: "",
        material: "",
        locationLat: "",
        locationLong: "",
      };

      const submitToDB = initObj
      ? (body) =>
        updateItem(initObj.id, body)
      : (body) =>
        addItem(body)

  // Validation schema
  const validationSchema = Yup.object({
    dateAdded: Yup.date()
      .required("Date is required")
      .typeError("Invalid date format"),
    material: Yup.string()
      .oneOf(["Wood", "Polystyrene", "Other"], "Material must be Wood, Polystyrene, or Other")
      .required("Material is required"),
    locationLat: Yup.number()
      .required("Latitude is required")
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    locationLong: Yup.number()
      .required("Longitude is required")
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        userId: user.id,
      };

      submitToDB(body);
      setIsEditing(false);
    }
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Hive Details" : "Add New Hive"}</h3>
          <br />
          <div className="form-input">
            <label htmlFor="dateAdded">Date Added</label>
            <input
              type="date"
              id="dateAdded"
              name="dateAdded"
              value={formik.values.dateAdded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateAdded && formik.errors.dateAdded && (
              <Error>{formik.errors.dateAdded}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="material">Material</label>
            <select
              id="material"
              name="material"
              value={formik.values.material}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select material" />
              <option value="Wood" label="Wood" />
              <option value="Polystyrene" label="Polystyrene" />
              <option value="Other" label="Other" />
            </select>
            {formik.touched.material && formik.errors.material && (
              <Error>{formik.errors.material}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="locationLat">Latitude</label>
            <input
              type="number"
              id="locationLat"
              name="locationLat"
              value={formik.values.locationLat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.locationLat && formik.errors.locationLat && (
              <Error>{formik.errors.locationLat}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="locationLong">Longitude</label>
            <input
              type="number"
              id="locationLong"
              name="locationLong"
              value={formik.values.locationLong}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.locationLong && formik.errors.locationLong && (
              <Error>{formik.errors.locationLong}</Error>
            )}
          </div>

          <Button type="submit">{initObj ? "Update Hive" : "Add Hive"}</Button>
        </StyledForm>
      ) : (
        <StyledSubmit>
            <h1>Hive Details</h1>
            <div>
              <label>Date Added:</label>
              <p>{formik.values.dateAdded}</p>
            </div>
            <div>
              <label>Material:</label>
              <p>{formik.values.material}</p>
            </div>
            <div>
              <label>Latitude:</label>
              <p>{formik.values.locationLat}</p>
            </div>
            <div>
              <label>Longitude:</label>
              <p>{formik.values.locationLong}</p>
            </div>
            <Button 
              type="button" 
              onClick={() => setIsEditing(true)}
            >
                Edit
            </Button>
        </StyledSubmit>
      )}
    </div>
  );
};

export default HiveForm;