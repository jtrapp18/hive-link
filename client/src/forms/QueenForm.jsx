import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { patchJSONToDb, postJSONToDb } from '../helper';
import Error from "../styles/Error";
import { StyledForm, Button } from "../MiscStyling"

const QueenForm = ({ initObj }) => {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { id: hiveId } = useParams(); // Get the ID from the URL

  console.log('queenobj', initObj)

  const initialValues = initObj
    ? {
        status: initObj.status || "",
        origin: initObj.origin || "",
        species: initObj.species || "",
        dateIntroduced: initObj.dateIntroduced || "",
        replacementCause: initObj.replacementCause || "",
      }
    : {
        status: "",
        origin: "",
        species: "",
        dateIntroduced: "",
        replacementCause: "",
      };

  const submitToDB = initObj
    ? (body) =>
        patchJSONToDb("queens", initObj.id, body)
          .then(() => setIsSubmitted(true))
          .catch((err) => console.error(err))
    : (body) =>
        postJSONToDb("queens", body)
          .then(() => setIsSubmitted(true))
          .catch((err) => console.error(err));

  // Validation schema matching backend
  const validationSchema = Yup.object({
    status: Yup.string()
      .oneOf(["marked", "unmarked", "clipped"], "Status must be Marked, Unmarked, or Clipped")
      .required("Status is required"),
    origin: Yup.string()
      .oneOf(["swarm cells", "purchased", "original"], "Origin must be Swarm Cells, Purchased, or Original")
      .required("Origin is required"),
    species: Yup.string()
      .oneOf(["Italian", "Carniolan", "Buckfast", "Caucasian", "Russian", "Cordovan", "Other"], 
        "Species must be one of the predefined options")
      .required("Species is required"),
    dateIntroduced: Yup.date()
      .required("Date introduced is required")
      .typeError("Invalid date format"),
    replacementCause: Yup.string()
      .oneOf(["supersedure", "swarm", "n/a"], "Replacement cause must be Supersedure, Swarm, or N/A")
      .nullable(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        hiveId: hiveId, // Linking the queen to a hive
        userId: user.id,
      };

      submitToDB(body);
    },
  });

  return (
    <div>
      {!isSubmitted ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <div className="form-input">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select status" />
              <option value="marked" label="Marked" />
              <option value="unmarked" label="Unmarked" />
              <option value="clipped" label="Clipped" />
            </select>
            {formik.touched.status && formik.errors.status && (
              <Error>{formik.errors.status}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="origin">Origin</label>
            <select
              id="origin"
              name="origin"
              value={formik.values.origin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select origin" />
              <option value="swarm cells" label="Swarm Cells" />
              <option value="purchased" label="Purchased" />
              <option value="original" label="Original" />
            </select>
            {formik.touched.origin && formik.errors.origin && (
              <Error>{formik.errors.origin}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="species">Species</label>
            <select
              id="species"
              name="species"
              value={formik.values.species}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select species" />
              <option value="Italian" label="Italian" />
              <option value="Carniolan" label="Carniolan" />
              <option value="Buckfast" label="Buckfast" />
              <option value="Caucasian" label="Caucasian" />
              <option value="Russian" label="Russian" />
              <option value="Cordovan" label="Cordovan" />
              <option value="Other" label="Other" />
            </select>
            {formik.touched.species && formik.errors.species && (
              <Error>{formik.errors.species}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="dateIntroduced">Date Introduced</label>
            <input
              type="date"
              id="dateIntroduced"
              name="dateIntroduced"
              value={formik.values.dateIntroduced}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateIntroduced && formik.errors.dateIntroduced && (
              <Error>{formik.errors.dateIntroduced}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="replacementCause">Replacement Cause</label>
            <select
              id="replacementCause"
              name="replacementCause"
              value={formik.values.replacementCause}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select cause" />
              <option value="supersedure" label="Supersedure" />
              <option value="swarm" label="Swarm" />
              <option value="n/a" label="N/A" />
            </select>
            {formik.touched.replacementCause && formik.errors.replacementCause && (
              <Error>{formik.errors.replacementCause}</Error>
            )}
          </div>

          <Button type="submit">{initObj ? "Update Queen" : "Add Queen"}</Button>
        </StyledForm>
      ) : (
        <div>
          <h3>{initObj ? "Queen successfully updated!" : "Queen successfully added!"}</h3>
        </div>
      )}
    </div>
  );
};

export default QueenForm;
