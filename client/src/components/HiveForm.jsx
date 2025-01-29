import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { patchJSONToDb, postJSONToDb } from '../helper';

const HiveFormContainer = styled.div`
  border: 1px solid black;
  background: var(--gray);
  padding: 20px;
  width: 80%;
  margin: auto;
  .form-input {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input, select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    input:hover, select:hover {
      background: var(--yellow);
    }
    .error {
      color: red;
      font-size: 0.8em;
    }
  }
  button {
    padding: 10px 20px;
    background-color: var(--green);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: var(--dark-green);
    }
  }
`;

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
        user_id: user.id,
      };

      submitToDB(body);
    }
  });

  return (
    <HiveFormContainer>
      {!isSubmitted ? (
        <form onSubmit={formik.handleSubmit}>
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
              <div className="error">{formik.errors.dateAdded}</div>
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
              <div className="error">{formik.errors.material}</div>
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
              <div className="error">{formik.errors.locationLat}</div>
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
              <div className="error">{formik.errors.locationLong}</div>
            )}
          </div>

          <button type="submit">Add Hive</button>
        </form>
      ) : (
        <div>
          <h3>Hive successfully added!</h3>
        </div>
      )}
    </HiveFormContainer>
  );
};

export default HiveForm;