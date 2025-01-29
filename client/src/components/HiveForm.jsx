import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { patchJSONToDb, postJSONToDb } from '../helper';
import Error from "../styles/Error";
import {StyledForm} from '../MiscStyling'

const HiveForm = ({ hive }) => {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = hive
    ? {
        dateAdded: hive.dateAdded || "",
        material: hive.material || "",
        locationLat: hive.locationLat || "",
        locationLong: hive.locationLong || "",
      }
    : {
        dateAdded: "",
        material: "",
        locationLat: "",
        locationLong: "",
      };

      const submitToDB = hive
      ? (body) =>
          patchJSONToDb("hives", hive.id, body)
            .then(() => setIsSubmitted(true))
            .catch((err) => console.error(err))
      : (body) =>
          postJSONToDb("hives", body)
            .then(() => setIsSubmitted(true))
            .catch((err) => console.error(err));

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
    }
  });

  return (
    <div>
      {!isSubmitted ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{hive ? "Hive Details" : "Add New Hive"}</h3>
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

          <button type="submit">{hive ? "Update Hive" : "Add Hive"}</button>
        </StyledForm>
      ) : (
        <div>
          <h3>Hive successfully added!</h3>
        </div>
      )}
    </div>
  );
};

export default HiveForm;