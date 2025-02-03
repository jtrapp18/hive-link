import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { UserContext } from "../context/userProvider";
import { patchJSONToDb, postJSONToDb } from "../helper";
import Error from "../styles/Error";
import { StyledForm, StyledSubmit, Button } from "../MiscStyling";

const HoneyForm = ({ initObj }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!initObj);
  const { id: hiveId } = useParams(); // Get hive ID from URL

  const initialValues = initObj
    ? {
        dateReset: initObj.dateReset || "",
        datePulled: initObj.datePulled || "",
        weight: initObj.weight || "",
      }
    : {
        dateReset: "",
        datePulled: "",
        weight: "",
      };

  const submitToDB = initObj
    ? (body) =>
        patchJSONToDb("honey_pulls", initObj.id, body)
          .then(() => setIsEditing(false))
          .catch((err) => console.error(err))
    : (body) =>
        postJSONToDb("honey_pulls", body)
          .then(() => setIsEditing(false))
          .catch((err) => console.error(err));

  // Validation schema matching backend
  const validationSchema = Yup.object({
    dateReset: Yup.date()
      .required("Date reset is required")
      .typeError("Invalid date format"),
    datePulled: Yup.date()
      .nullable()
      .typeError("Invalid date format"),
    weight: Yup.number()
      .nullable()
      .min(-10, "Weight cannot be below 0")
      .max(50, "Weight cannot exceed 200")
      .typeError("Weight must be a number"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        hiveId: hiveId,
        userId: user.id,
      };

      submitToDB(body);
    },
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Update Honey Pull" : "Add New Honey Pull"}</h3>

          <div className="form-input">
            <label htmlFor="dateReset">Start Date</label>
            <input
              type="date"
              id="dateReset"
              name="dateReset"
              value={formik.values.dateReset}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.datePulled && formik.errors.datePulled && (
              <Error>{formik.errors.datePulled}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="datePulled">Date Pulled</label>
            <input
              type="date"
              id="datePulled"
              name="datePulled"
              value={formik.values.datePulled}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.datePulled && formik.errors.datePulled && (
              <Error>{formik.errors.datePulled}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="weight">Weight (lbs)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.weight && formik.errors.weight && (
              <Error>{formik.errors.weight}</Error>
            )}
          </div>

          <Button type="submit">{initObj ? "Update" : "Add"}</Button>
        </StyledForm>
      ) : (
        <StyledSubmit>
          <h1>Honey Pull Details</h1>
          <div>
            <label>Start Date: </label>
            <p>{formik.values.dateReset}</p>
          </div>
          <div>
            <label>Date Pulled: </label>
            <p>{formik.values.datePulled}</p>
          </div>
          <div>
            <label>Weight: </label>
            <p>{formik.values.weight || "N/A"}</p>
          </div>
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </StyledSubmit>
      )}
    </div>
  );
};

export default HoneyForm;